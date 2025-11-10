import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import Navbar2 from '../layouts/Navbar2';
import CustomerHeader from '../layouts/CustomerHeader';
import { connectSocket, getSocket } from '../config/socket';
import { toast } from 'react-hot-toast';
import { MdRestaurant, MdSubscriptions } from "react-icons/md";
import storage from '../utils/storage';

const statusColors = {
  accepted: 'bg-green-100 text-green-600',
  rejected: 'bg-red-100 text-red-600',
  cancelled: 'bg-gray-200 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-600'
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalMessSubscribed, setTotalMessSubscribed] = useState(0);
  const [totalActivePlans, setTotalActivePlans] = useState(0);
  const [expiringPlans, setExpiringPlans] = useState([]);

  useEffect(() => {
    const token = storage.getItem('token');
    if (!token) return;

    connectSocket(token);

    apiGet('/customer/profile/basic')
      .then((res) => {
        console.log(res);
        if (res.success && res.data) {
          setTotalActivePlans(res.data.activePlansCount || 0);
          setTotalMessSubscribed(res.data.mess_ids?.length || 0);
        }
      });

    apiGet('/customer/mess/orders')
      .then((res) => {
                console.log(res);
        if (res.success) setOrders(res.data || []);
      });

    apiGet('/customer/plan/expiry-soon')
      .then((res) => {
                console.log(res);
        if (res.success) setExpiringPlans(res.data || []);
      });
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleUpdate = (res) => {
      if (!res?.success || !res.data?.orderId) return;
      const updatedOrder = res.data;
      const normalizedStatus = updatedOrder?.decision?.toLowerCase() 
        || updatedOrder?.orderStatus?.toLowerCase() 
        || 'pending';
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === updatedOrder.orderId
            ? { ...o, orderStatus: normalizedStatus }
            : o
        )
      );
      if (['accepted', 'rejected', 'cancelled'].includes(normalizedStatus)) {
        toast.success(`Order ${normalizedStatus}`);
      }
    };

    socket.on('order_update', handleUpdate);
    socket.on('order_response', handleUpdate);

    return () => {
      socket.off('order_update', handleUpdate);
      socket.off('order_response', handleUpdate);
    };
  }, []);

  const handleCancelOrder = (order) => {
    const socket = getSocket();
    if (!socket) return;

    const tokensArray = Array.isArray(order.submittedTokenIds)
      ? order.submittedTokenIds
      : [];
    if (tokensArray.length === 0) return;

    const orderPayload = {
      orderId: order.orderId,
      customerPlanId: order.customerPlanId,
      customerId: order.customerId,
      orderType: order.orderType,
      submittedTokenIds: tokensArray,
    };

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === order.orderId ? { ...o, orderStatus: 'cancelled' } : o
      )
    );

    socket.emit('cancel_order', orderPayload, (response) => {
      if (response?.success) toast.success('Order cancelled');
      else toast.error('Failed to cancel order');
    });
  };

  return (
    <div className="flex h-screen">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">

        <CustomerHeader />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => navigate('/cust/my-mess')}
            className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100">
              <MdRestaurant className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-orange-500">
                {totalMessSubscribed}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Total Mess Subscribed</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/customer-activeplans')}
            className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
              <MdSubscriptions className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-500">
                {totalActivePlans}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Total Active Plans</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4">
            <h3 className="text-base font-semibold text-[#33363F]">Recent Orders</h3>
          </div>

          {orders.length === 0 ? (
            <div className="text-center text-[#0000008C] py-6">No orders placed today.</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="hidden md:grid grid-cols-7 text-sm font-medium text-gray-600 border-b border-gray-100 pb-2 px-4">
                  <div>Customer Name</div>
                  <div>Plan Name</div>
                  <div>Tokens</div>
                  <div>Type</div>
                  <div>Time</div>
                  <div>Date</div>
                  <div className="text-center">Status</div>
                </div>

                <div className="max-h-[320px] overflow-y-auto">
                  {orders.map((order, idx) => (
                    <div
                      key={order.orderId || idx}
                      className="border-t border-gray-200 px-4 py-3 text-sm md:grid md:grid-cols-7 items-center"
                    >
                      <div className="md:hidden space-y-2">
                        <p><span className="font-medium">Customer:</span> {order.customerName}</p>
                        <p><span className="font-medium">Plan:</span> {order.customerPlanName}</p>
                        <p><span className="font-medium">Tokens:</span> {order.tokenCount}</p>
                        <p><span className="font-medium">Type:</span> {order.orderType}</p>
                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          {order.orderStatus === "pending" ? (
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="ml-2 px-3 py-1 text-xs font-semibold rounded bg-red-100  text-red-600 hover:bg-red-200"
                            >
                              CANCEL ORDER
                            </button>
                          ) : (
                            <span
                              className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.orderStatus?.toLowerCase()]}`}
                            >
                              {order.orderStatus?.toUpperCase()}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="hidden md:contents">
                        <div>{order.customerName}</div>
                        <div>{order.customerPlanName}</div>
                        <div>{order.tokenCount}</div>
                        <div className="capitalize">{order.orderType}</div>
                        <div>
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div className="text-center">
                          {order.orderStatus === "pending" ? (
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="px-3 py-1 text-xs font-semibold rounded bg-red-100 cursor-pointer text-red-600 hover:bg-red-200"
                            >
                              CANCEL ORDER
                            </button>
                          ) : (
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.orderStatus?.toLowerCase()]}`}>
                              {order.orderStatus?.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

    
{/* Expiring Plans Section */}
<div className="bg-white border border-gray-200 rounded-xl mb-8 p-4 shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold text-gray-800">Expiring Plans</h3>
    {expiringPlans.length > 0 && (
      <button
        onClick={() => navigate('/customer-activeplans')}
        className="text-sm text-orange-500 hover:text-orange-600 font-medium transition"
      >
        View All →
      </button>
    )}
  </div>

  {expiringPlans.length === 0 ? (
    <div className="text-center text-gray-400 py-8 text-sm">
      No expiring plans at the moment.
    </div>
  ) : (
    <>
      {/* Desktop & Tablet Grid */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-5">
        {expiringPlans.map((plan) => (
          <div
            key={plan.customerPlanId}
            className="border rounded-2xl bg-gradient-to-b from-orange-50 to-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="relative">
              <img
                src={plan.imageUrl || '/default-plan.jpg'}
                alt={plan.name}
                className="w-full h-32 object-cover"
              />
              <span className="absolute top-2 left-2 text-xs font-semibold bg-orange-500 text-white px-2 py-1 rounded-full shadow">
                Expiring Soon
              </span>
              <span className="absolute top-2 right-2 text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {new Date(plan.expiryDate).toLocaleDateString()}
              </span>
            </div>

            <div className="p-3">
              <h4 className="text-base font-semibold text-gray-800 mb-1 truncate">
                {plan.name}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2 h-8">
                {plan.description || 'No description available.'}
              </p>
              <div className="mt-3 flex justify-between items-center text-xs font-medium">
                <span className="text-orange-500">
                  Tokens: {plan.usedTokenCount}/{plan.issuedTokenCount}
                </span>
                <span className="text-green-600 font-semibold">₹{plan.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex gap-4 py-2 min-w-max">
          {expiringPlans.map((plan) => (
            <div
              key={plan.customerPlanId}
              className="flex-shrink-0 w-64 border rounded-2xl bg-gradient-to-b from-orange-50 to-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={plan.imageUrl || '/default-plan.jpg'}
                  alt={plan.name}
                  className="w-full h-28 object-cover"
                />
                <span className="absolute top-2 left-2 text-xs font-semibold bg-orange-500 text-white px-2 py-1 rounded-full shadow">
                  Expiring Soon
                </span>
                <span className="absolute top-2 right-2 text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {new Date(plan.expiryDate).toLocaleDateString()}
                </span>
              </div>

              <div className="p-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">
                  {plan.name}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2 h-8">
                  {plan.description || 'No description available.'}
                </p>
                <div className="mt-2 flex justify-between items-center text-xs font-medium">
                  <span className="text-orange-500">
                    Tokens: {plan.usedTokenCount}/{plan.issuedTokenCount}
                  </span>
                  <span className="text-green-600 font-semibold">₹{plan.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
