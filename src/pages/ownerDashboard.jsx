
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import cubeIcon from '../assets/cube.png';
import storage from '../utils/storage';
import { apiGet } from '../services/api';
import { connectSocket, getSocket, onIncomingOrder, onOrderResponse, onOrderCancelByCustomer } from '../config/socket';

const OwnerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");  // 🔹 filter state
  const location = useLocation();
  const { ownerName = 'Owner', messName = 'Mess', logoUrl = '' } = location.state || {};

  // 🔹 summary data dynamic values
  const summaryData = [
    { key: "all", label: 'All Requests', value: orders.length, textColor: 'text-gray-600', borderColor: 'border-[#5B5B5B]', bgColor: 'bg-[#5B5B5B]' },
    { key: "accepted", label: 'Accepted Requests', value: orders.filter(o => o.orderStatus === 'accepted').length, textColor: 'text-green-600', borderColor: 'border-[#075E32]', bgColor: 'bg-[#075E32]' },
    { key: "pending", label: 'Pending Requests', value: orders.filter(o => o.orderStatus === 'pending').length, textColor: 'text-yellow-600', borderColor: 'border-yellow-400', bgColor: 'bg-[#FBBC05]' },
    { key: "rejected", label: 'Rejected Requests', value: orders.filter(o => o.orderStatus === 'rejected').length, textColor: 'text-red-600', borderColor: 'border-[#C50000]', bgColor: 'bg-[#C50000]' },
    { key: "cancelled", label: 'Cancelled Requests', value: orders.filter(o => o.orderStatus === 'cancelled').length, textColor: 'text-purple-800', borderColor: 'border-purple-800', bgColor: 'bg-purple-800' }, // 🔹 New Cancelled
  ];

  useEffect(() => {
    const token = storage.getItem('token');
    const messId = storage.getItem('messId');
    if (!token || !messId) return;

    connectSocket(token);

    apiGet(`/owner/mess/${messId}/orders`)
      .then(res => {
        if (res.success) {
          const ordersData = res.data || [];
          const mergedOrders = ordersData.map(o => {
            const rawPayload = storage.getItem(`orderPayload_${o.orderId}`);
            const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
            const merged = {
              ...existingPayload,
              ...o,
              orderStatus: o.orderStatus || existingPayload.orderStatus || 'pending',
            };
            storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(merged));
            return merged;
          });
          storage.setItem("liveOrders", JSON.stringify(mergedOrders));
          setOrders(mergedOrders);
        }
      })
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  useEffect(() => {
    onIncomingOrder(res => {
      if (res?.success && res.data?.orderId) {
        const o = res.data;
        const rawPayload = storage.getItem(`orderPayload_${o.orderId}`);
        const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
        const mergedPayload = { ...existingPayload, ...o };
        storage.setItem(`orderPayload_${o.orderId}`, JSON.stringify(mergedPayload));
        setOrders(prev => {
          const exists = prev.find(x => x.orderId === o.orderId);
          return exists ? prev.map(x => x.orderId === o.orderId ? mergedPayload : x) : [mergedPayload, ...prev];
        });
      }
    });

    onOrderResponse(res => {
      if (res?.success && res.data?.orderId && res.data?.orderStatus) {
        const rawPayload = storage.getItem(`orderPayload_${res.data.orderId}`);
        const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
        const updatedPayload = { ...existingPayload, orderStatus: res.data.orderStatus };
        storage.setItem(`orderPayload_${res.data.orderId}`, JSON.stringify(updatedPayload));
        setOrders(prev => prev.map(o => o.orderId === res.data.orderId ? updatedPayload : o));
      }
    });

    onOrderCancelByCustomer(res => {
      if (res?.success && res.data?.orderId) {
        const rawPayload = storage.getItem(`orderPayload_${res.data.orderId}`);
        const existingPayload = rawPayload ? JSON.parse(rawPayload) : {};
        const updatedPayload = { ...existingPayload, orderStatus: 'cancelled' };
        storage.setItem(`orderPayload_${res.data.orderId}`, JSON.stringify(updatedPayload));
        setOrders(prev => prev.map(o => o.orderId === res.data.orderId ? updatedPayload : o));
      }
    });
  }, []);

  // 🔹 filter orders based on active filter
  const filteredOrders = orders.filter(order => {
    if (activeFilter === "all") return true;
    return order.orderStatus === activeFilter;
  });

  const handleDecision = (orderId, decision) => {
    const socket = getSocket();
    if (!socket) return console.error('❌ Socket not connected');
    const rawPayload = storage.getItem(`orderPayload_${orderId}`);
    if (!rawPayload) return;
    let orderPayload;
    try { orderPayload = JSON.parse(rawPayload); } catch { return; }
    const finalPayload = { ...orderPayload, decision, updatedAt: new Date().toISOString() };
    storage.setItem(`orderPayload_${orderId}`, JSON.stringify(finalPayload));
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, orderStatus: decision } : o));
    socket.emit('owner_order_decision', finalPayload, response => {
      if (response?.success && response.data?.orderStatus) {
        setOrders(prev =>
          prev.map(o => o.orderId === orderId ? { ...o, orderStatus: response.data.orderStatus } : o)
        );
      } else {
        setOrders(prev =>
          prev.map(o => o.orderId === orderId ? { ...o, orderStatus: 'pending' } : o)
        );
      }
    });
  };

  return (
    <div className="flex h-screen ">
      <Navbar />
      <main className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader ownerName={ownerName} messName={messName} logoUrl={logoUrl} />

        <h2 className="text-2xl font-bold text-[#14224A] mb-4 ">
          Request Summary,</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {summaryData.map(({ key, label, value, textColor, borderColor, bgColor }) => (
            <button 
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex gap-2 p-5 bg-white border ${borderColor} rounded-lg shadow-sm w-full text-left transition 
              ${activeFilter === key ? "ring-2 ring-offset-2 ring-green-300 " : ""}`}
            >
              <div className={`w-14 h-14 p-3 rounded-lg ${bgColor} flex items-center justify-center`}>
                <img src={cubeIcon} alt={label} className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className={`text-xl font-bold ${textColor}`}>{value}</div>
                  <div className="text-sm text-gray-700 font-medium">{label}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* <div className="bg-white border border-gray-300 rounded-xl overflow-hidden mb-10">
          <div className="flex justify-between items-center px-12 py-4">
            <h3 className="text-base font-semibold text-[#33363F]">Recent Orders</h3>
          </div>
          <table className="w-full text-sm rounded-lg text-center">
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-[#0000008C] py-6">No Orders Found</td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={order.orderId || idx} className="border-t">
                    <td colSpan="5" className="px-6 py-3">
                      <div className="grid grid-cols-5 gap-2 items-center">
                        <div className="text-center">{order.customerName}</div>
                        <div className="text-center">{order.customerPlanName}</div>
                        <div className="text-center">{order.tokenCount}</div>
                        <div className="text-center">{order.orderType}</div>
                        <div className="flex justify-center gap-2">
                          {order.orderStatus === 'pending' ? (
                            <>
                              <button onClick={() => handleDecision(order.orderId, 'accepted')} className="text-green-600 font-semibold hover:underline">Accept</button>
                              <button onClick={() => handleDecision(order.orderId, 'rejected')} className="text-red-600 font-semibold hover:underline">Reject</button>
                            </>
                          ) : (
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              order.orderStatus === 'accepted' ? 'bg-green-100 text-green-700' :
                              order.orderStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                              order.orderStatus === 'cancelled' ? 'bg-purple-100 text-purple-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.orderStatus.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div> */}
        <div  className="bg-white border  rounded-xl overflow-hidden mb-8">
  <div className="flex justify-between items-center px-12 py-4">
    <h3 className="text-base font-semibold text-[#33363F]">Recent Orders</h3>
  </div>

  {/* 🔹 Scrollable container with max height */}
  <div className="max-h-[340px] overflow-y-auto"> 
    <table className="w-full text-sm rounded-lg text-center">
      <tbody>
        {filteredOrders.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center text-[#0000008C] py-6">
              No Orders Found
            </td>
          </tr>
        ) : (
          filteredOrders.map((order, idx) => (
            <tr key={order.orderId || idx} className="border-t">
              <td colSpan="1" className="px-1 py-2 sm:px-4 sm:py-2">
                <div className="grid grid-cols-5 gap-1 items-center">
                  <div className="text-center">{order.customerName}</div>
                  <div className="text-center">{order.customerPlanName}</div>
                  <div className="text-center">{order.tokenCount}</div>
                  <div className="text-center">{order.orderType}</div>
                  <div className="flex justify-center gap-2">
                    {order.orderStatus === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleDecision(order.orderId, 'accepted')}
                          className="text-green-600 font-semibold hover:underline"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecision(order.orderId, 'rejected')}
                          className="text-red-600 font-semibold hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          order.orderStatus === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : order.orderStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : order.orderStatus === 'cancelled'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.orderStatus.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

      </main>
    </div>
  );
};

export default OwnerDashboard;
