

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  connectSocket,
  onOrderResponse,
  onIncomingOrder,
  getSocket,
} from '../config/socket';
import { toast } from 'react-hot-toast';
import storage from '../utils/storage';

const SocketListener = () => {
  const location = useLocation();

  useEffect(() => {
    const token = storage.getItem('token');
    const role = storage.getItem('role');

    if (!token) return;

    // Connect socket if not connected
    const socket = connectSocket(token);

    // ----------------- OWNER -----------------
    if (role === 'owner') {
      const cleanupOwner = onIncomingOrder((res) => {
        if (!res?.success || !res.data?.orderId) return;

        const o = res.data;

        // Standardized payload
        const payload = {
          orderId: o.orderId || '',
          messId: o.messId || '',
          messName: o.messName || '',
          customerId: o.customerId || '',
          customerName: o.customerName || '',
          customerPlanId: o.customerPlanId || '',
          customerPlanName: o.customerPlanName || '',
          decision: '',          
          deliveryAddress: o.deliveryAddress || '',
          orderExpiresAt: o.orderExpiresAt || '',
          orderStatus: o.orderStatus || 'pending',
          orderType: o.orderType || 'delivery',
          scheduledFor: o.scheduledFor || null,
          submittedTokenIds: o.submittedTokenIds || [],
          tokenCount: o.tokenCount || 0,
          tokenStatus: o.tokenStatus || 'locked',
          totalPrice: o.totalPrice || 0,
          createdAt: o.createdAt || new Date().toISOString(),
          updatedAt: o.updatedAt || new Date().toISOString(),
        };

        // Merge/update liveOrders
        const existing = JSON.parse(storage.getItem('liveOrders') || '[]');
        const index = existing.findIndex((x) => x.orderId === o.orderId);
        if (index > -1) existing[index] = { ...existing[index], ...payload };
        else existing.push(payload);

        storage.setItem('liveOrders', JSON.stringify(existing));
        storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(payload));

        toast.success(`📦 New order from ${o.customerName}`, { duration: 4000 });
      });

      // Ensure owner always stays connected
      const heartbeatCheck = setInterval(() => {
        if (!socket.connected) {
          socket.connect();
        }
      }, 30_000);

      return () => {
        cleanupOwner(); // remove listener
        clearInterval(heartbeatCheck);
      };
    }

    // ----------------- CUSTOMER -----------------
    if (role === 'customer') {
      const allowedRoutes = ['/customer-use-tokens', '/customer-orders'];

      const cleanupCustomer = onOrderResponse((res) => {
        if (!res?.success || !res.data) return;

        const isAllowed = allowedRoutes.includes(location.pathname);
        if (!isAllowed) return;

        const status = res.data.orderStatus;
        if (status === 'accepted') toast.success('🎉 Your order was accepted!');
        else if (status === 'rejected') toast.error('❌ Your order was rejected.');
        else toast('ℹ️ Order status updated.');
      });

      return () => cleanupCustomer(); // remove listener
    }
  }, [location.pathname]);

  return null;
};

export default SocketListener;
