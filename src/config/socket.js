import { io } from 'socket.io-client';
import storage from "../utils/storage";

let socket = null;
let isConnected = false;
let heartbeatInterval = null;
const HEARTBEAT_INTERVAL_MS = 60_000;

const orderResponseHandlers = new Set();
const orderUpdateHandlers = new Set();
const incomingOrderHandlers = new Set();
const orderCancelHandlers = new Set();

let tokenCache = null;

export const connectSocket = (token) => {
  tokenCache = token;

  if (socket && isConnected) return socket;

  socket = io('https://dev.mealex.in', {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 2000,
    transports: ['websocket'] // more stable connection
  });

  socket.on('connect', () => {
    isConnected = true;
    startHeartbeat();
  });

  socket.on('disconnect', (reason) => {
    isConnected = false;
    // heartbeat will try to reconnect automatically
  });

  socket.io.on('reconnect', (attempt) => {
    startHeartbeat(); // restart heartbeat after reconnect
  });

  socket.on('connect_error', (err) => {
  });

  // ---------------- Event Handlers ----------------

  socket.off('order_response');
  socket.on('order_response', (data) => {
    for (const h of orderResponseHandlers) h(data);
  });

  socket.off('order_update');
  socket.on('order_update', (data) => {
    for (const h of orderUpdateHandlers) h(data);
  });

  // socket.off('incoming_order');
  // socket.on('incoming_order', (res) => {
  //   if (res?.success && res.data?.orderId) {
  //     const cleanPayload = {
  //       orderId: res.data.orderId,
  //       messId: res.data.messId,
  //       messName: res.data.messName,
  //       customerId: res.data.customerId,
  //       customerName: res.data.customerName,
  //       customerPlanId: res.data.customerPlanId,
  //       customerPlanName: res.data.customerPlanName,
  //       submittedTokenIds: res.data.submittedTokenIds || [],
  //       tokenCount: res.data.tokenCount,
  //       tokenStatus: res.data.tokenStatus,
  //       totalPrice: res.data.totalPrice,
  //       orderType: res.data.orderType,
  //       deliveryAddress: res.data.deliveryAddress,
  //       status: res.data.status,
  //       orderStatus: res.data.orderStatus,
  //       orderExpiresAt: res.data.orderExpiresAt,
  //       scheduledFor: res.data.scheduledFor,
  //       createdAt: res.data.createdAt,
  //       updatedAt: res.data.updatedAt,
  //       count: res.data.count || { pending: 0, accepted: 0, rejected: 0, completed: 0 }
  //     };

  //     storage.setItem(`orderPayload_${res.data.orderId}`, JSON.stringify(cleanPayload));

  //     const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
  //     if (!existing.find(o => o.orderId === res.data.orderId)) {
  //       existing.push(cleanPayload);
  //       storage.setItem("liveOrders", JSON.stringify(existing));
  //     }

  //     for (const h of incomingOrderHandlers) h(res);
  //   }
  // });

  socket.off('incoming_order');
socket.on('incoming_order', (res) => {
  const currentMessId = storage.getItem("messId");

  if (res?.success && res.data?.orderId && res.data?.messId === currentMessId) {
    const cleanPayload = {
      orderId: res.data.orderId,
      messId: res.data.messId,
      messName: res.data.messName,
      customerId: res.data.customerId,
      customerName: res.data.customerName,
      customerPlanId: res.data.customerPlanId,
      customerPlanName: res.data.customerPlanName,
      submittedTokenIds: res.data.submittedTokenIds || [],
      tokenCount: res.data.tokenCount,
      tokenStatus: res.data.tokenStatus,
      totalPrice: res.data.totalPrice,
      orderType: res.data.orderType,
      deliveryAddress: res.data.deliveryAddress,
      status: res.data.status,
      orderStatus: res.data.orderStatus,
      orderExpiresAt: res.data.orderExpiresAt,
      scheduledFor: res.data.scheduledFor,
      createdAt: res.data.createdAt,
      updatedAt: res.data.updatedAt,
      count: res.data.count || { pending: 0, accepted: 0, rejected: 0, completed: 0 }
    };

    storage.setItem(`orderPayload_${res.data.orderId}`, JSON.stringify(cleanPayload));

    const existing = JSON.parse(storage.getItem("liveOrders") || "[]");
    if (!existing.find(o => o.orderId === res.data.orderId)) {
      existing.push(cleanPayload);
      storage.setItem("liveOrders", JSON.stringify(existing));
    }

    for (const h of incomingOrderHandlers) h(res);
  } else {
  }
});


  socket.off('order_cancel_by_customer');
  socket.on('order_cancel_by_customer', (data) => {
    for (const h of orderCancelHandlers) h(data);
  });
  return socket;
};

// ---------------- Heartbeat ----------------
function startHeartbeat(interval = HEARTBEAT_INTERVAL_MS) {
  if (heartbeatInterval) return;

  heartbeatInterval = setInterval(() => {
    if (socket && socket.connected) {
      socket.emit('heartbeat');
      console.log('heartbeat sent');
    } else if (socket) {
      socket.connect(); // attempt reconnect
    }
  }, interval);
}

function stopHeartbeat() {
  if (!heartbeatInterval) return;
  clearInterval(heartbeatInterval);
  heartbeatInterval = null;
}

// ---------------- Event Listeners ----------------
export const onOrderResponse = (cb) => {
  if (typeof cb === 'function') return orderResponseHandlers.add(cb), () => orderResponseHandlers.delete(cb);
  if (cb === null) orderResponseHandlers.clear();
};

export const onOrderUpdate = (cb) => {
  if (typeof cb === 'function') return orderUpdateHandlers.add(cb), () => orderUpdateHandlers.delete(cb);
  if (cb === null) orderUpdateHandlers.clear();
};

export const onIncomingOrder = (cb) => {
  if (typeof cb === 'function') return incomingOrderHandlers.add(cb), () => incomingOrderHandlers.delete(cb);
  if (cb === null) incomingOrderHandlers.clear();
};

export const onOrderCancelByCustomer = (cb) => {
  if (typeof cb === 'function') return orderCancelHandlers.add(cb), () => orderCancelHandlers.delete(cb);
  if (cb === null) orderCancelHandlers.clear();
};

// ---------------- Emit / Update Token ----------------
export const emit = (event, payload, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    if (!socket) return reject(new Error('Socket not initialized'));
    try {
      socket.timeout(timeout).emit(event, payload, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const updateToken = (newToken) => {
  tokenCache = newToken;
  if (!socket) return;
  socket.auth = { token: tokenCache };
  socket.disconnect();
  socket.connect();
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  stopHeartbeat();
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
  isConnected = false;
};

export const onceConnected = (callback) => {
  if (socket && isConnected) return callback(socket);
  const wait = setInterval(() => {
    if (socket && isConnected) {
      clearInterval(wait);
      callback(socket);
    }
  }, 300);
};
