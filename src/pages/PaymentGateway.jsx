// // src/components/PaymentGateway.jsx
// import React from 'react';
// import { apiPost } from '../services/api';
// import storage from '../utils/storage';
// import { toast } from 'react-hot-toast'; // ✅ notifications ke liye

// const PaymentGateway = ({ plan, messId, onSuccess }) => {
//   const handlePayment = async () => {
//     try {
//       const res = await apiPost('/customer/mess/razorpay-order', {
//         planId: plan.planId,
//         messId,
//       });

//       const { id: orderId, amount } = res.data.orderDetails;

//       const options = {
//         key: 'rzp_test_RD4LUvyj0ffvxI',
//         amount,
//         currency: 'INR',
//         name: 'MealX Mess System',
//         description: `Purchase Plan: ${plan.name}`,
//         image: {
//           src: 'https://your-url.com/logo.svg',
//           width: '100',
//           height: '40',
//         },
//         order_id: orderId,
//         handler: async function (response) {
//           const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

//           if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//             alert('⚠️ Incomplete payment response.');
//             return;
//           }

//           try {
//             const customerId = storage.getItem('customerId');

//             await apiPost('/customer/mess/payment-verify', {
//               razorpay_payment_id,
//               razorpay_order_id,
//               razorpay_signature,
//               planId: plan.planId,
//               customerId,
//             });

//             toast.success('Payment successful! Tokens issued.');
//             if (onSuccess) onSuccess(); // callback to parent
//           } catch (err) {
//             console.error('❌ Payment verification failed:', err);
//             alert('❌ Payment verification failed.');
//           }
//         },
//         prefill: {
//           name: 'Customer Name',
//           email: 'customer@example.com',
//           contact: '9876543210',
//         },
//         notes: { messId, planId: plan.planId },
//         theme: { color: '#f97316' },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (err) {
//       console.error('❌ Razorpay order creation failed:', err);
//       alert('❌ Unable to initiate payment.');
//     }
//   };

//   return (
//     <button
//       className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 rounded"
//       onClick={handlePayment}
//     >
//       Pay with UPI / Online
//     </button>
//   );
// };

// export default PaymentGateway;


// src/components/PaymentGateway.jsx
import React from 'react';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import { toast } from 'react-hot-toast';

const PaymentGateway = ({ plan, messId, onSuccess }) => {
  const handlePayment = async () => {
    try {
      const res = await apiPost('/customer/mess/razorpay-order', {
        planId: plan.planId,
        messId,
      });

      // const { id: orderId, amount } = res.data.orderDetails;
const orderDetails = res?.orderDetails;
if (!orderDetails?.id || !orderDetails?.amount) {
  toast.error("⚠️ Invalid order response from server.");
  return;
}

const { id: orderId, amount } = orderDetails;
      const options = {
        key: 'rzp_test_RD4LUvyj0ffvxI', // Live key
        amount,
        currency: 'INR',
        name: 'MealX Mess System',
        description: `Purchase Plan: ${plan.name}`,
        image: {
          src: 'https://your-url.com/logo.svg',
          width: '100',
          height: '40',
        },
        order_id: orderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            toast.error('⚠️ Incomplete payment response. Please try again.');
            return;
          }

          try {
            const customerId = storage.getItem('customerId');

            await apiPost('/customer/mess/payment-verify', {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              planId: plan.planId,
              customerId,
            });

            toast.success('🎉 Payment successful! Tokens issued.');
            if (onSuccess) onSuccess(); // callback to parent
          } catch (err) {
            toast.error('❌ Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9876543210',
        },
        notes: { messId, planId: plan.planId },
        theme: { color: '#f97316' },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || '❌ Unable to initiate payment. Please try again later.';
      toast.error(errorMessage);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 rounded"
      onClick={handlePayment}
    >
      Pay Online
    </button>
  );
};

export default PaymentGateway;
