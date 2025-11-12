// src/components/CashPaymentPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar2 from '../layouts/Navbar2';
import CustomerHeader from '../layouts/CustomerHeader';
import { apiPost, apiGet } from '../services/api';
import storage from '../utils/storage';
import { toast } from 'react-hot-toast';

export default function CashPaymentPage() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const customerId = storage.getItem('customerId');
  const storedMessId = storage.getItem('messId');
  const messId = storedMessId || storage.getItem('selectedMessId') || null;

  useEffect(() => {
    let isMounted = true;
    async function fetchPaymentDetails() {
      if (!messId) {
        setLoadingDetails(false);
        return;
      }
      setLoadingDetails(true);
      try {
        const res = await apiGet(`/customer/mess/${messId}/payment/details`);
        console.log(res);
        if (res?.success) {
          const data = res.data || res?.data?.data || res?.data?.[0] || null;
          if (isMounted) setPaymentDetails(Array.isArray(data) ? data[0] : data);
        } else {
          toast.error(res?.message || 'Unable to fetch payment details');
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to load payment details');
      } finally {
        if (isMounted) setLoadingDetails(false);
      }
    }
    fetchPaymentDetails();
    return () => { isMounted = false; };
  }, [messId]);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const res = await apiPost('/customer/plan/issue/request', {
        customerId,
        messId,
        planId,
      });
      console.log(res);
      if (res?.success) {
        toast.success(res.message || 'Plan Requested Successfully');
        navigate('/cust/plans-requests');
      } else {
        toast.error(res.message || 'Request failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const qrSrc =   paymentDetails?.qrCodeUrl || // add this key from backend response
  paymentDetails?.qrUrl || paymentDetails?.qr || paymentDetails?.qr_code || 'https://via.placeholder.com/200x200.png?text=QR+Code';
  const upiId = paymentDetails?.upiId || paymentDetails?.upi || paymentDetails?.upi_id || 'mealx@upi';
  const phone = paymentDetails?.phoneNumber || paymentDetails?.phone || paymentDetails?.mobile || '';

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar2 />
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <CustomerHeader />
        <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-semibold text-gray-700">Cash / UPI Payment</h2>

          <div className="border rounded-lg p-4 flex flex-col items-center gap-2 w-full">
            {loadingDetails ? (
              <div className="py-8 w-full text-center text-gray-500">Loading payment details...</div>
            ) : (
              <>
                <img src={qrSrc} alt="QR Code" className="w-48 h-48 object-contain" />
                <p className="text-gray-500 text-sm">Scan this QR to pay at the mess counter </p>
                {phone && (
  <div className="mt-3 text-center">
    <p className="text-gray-700 font-medium">
      You can also make payment using this phone number:
    </p>
    <p className="text-green-600 font-bold text-lg">{phone}</p>
    <p className="text-xs text-gray-500">(Linked with UPI)</p>
  </div>
)}

              </>
            )}
          </div>

          <div className="w-full bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-700 font-medium">UPI ID: <span className="text-orange-500 font-semibold">{upiId}</span></p>
          </div>

          <button
            className={`w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleRequest}
            disabled={loading}
          >
            {loading ? 'Sending Request...' : 'Request Plan'}
          </button>

          <button className="w-full font-bold cursor-pointer text-gray-500 hover:text-red-500 mt-2 text-sm" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import Navbar2 from '../layouts/Navbar2'
// import CustomerHeader from '../layouts/CustomerHeader'
// import { apiPost, apiGet } from '../services/api'
// import storage from '../utils/storage'
// import { toast } from 'react-hot-toast'
// import { useTranslation } from 'react-i18next'

// export default function CashPaymentPage() {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const { planId } = useParams()
//   const [loading, setLoading] = useState(false)
//   const [loadingDetails, setLoadingDetails] = useState(true)
//   const [paymentDetails, setPaymentDetails] = useState(null)
//   const customerId = storage.getItem('customerId')
//   const storedMessId = storage.getItem('messId')
//   const messId = storedMessId || storage.getItem('selectedMessId') || null

//   useEffect(() => {
//     let isMounted = true
//     async function fetchPaymentDetails() {
//       if (!messId) {
//         setLoadingDetails(false)
//         return
//       }
//       setLoadingDetails(true)
//       try {
//         const res = await apiGet(`/customer/mess/${messId}/payment/details`)
//         if (res?.success) {
//           const data = res.data || res?.data?.data || res?.data?.[0] || null
//           if (isMounted) setPaymentDetails(Array.isArray(data) ? data[0] : data)
//         } else {
//           toast.error(res?.message || t('Unable to fetch payment details'))
//         }
//       } catch (err) {
//         toast.error(err?.response?.data?.message || t('Failed to load payment details'))
//       } finally {
//         if (isMounted) setLoadingDetails(false)
//       }
//     }
//     fetchPaymentDetails()
//     return () => {
//       isMounted = false
//     }
//   }, [messId])

//   const handleRequest = async () => {
//     setLoading(true)
//     try {
//       const res = await apiPost('/customer/plan/issue/request', {
//         customerId,
//         messId,
//         planId,
//       })
//       if (res?.success) {
//         toast.success(res.message || t('Plan Requested Successfully'))
//         navigate('/cust/plans-requests')
//       } else {
//         toast.error(res.message || t('Request failed'))
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || t('somethingWentWrong'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const qrSrc =
//     paymentDetails?.qrCodeUrl ||
//     paymentDetails?.qrUrl ||
//     paymentDetails?.qr ||
//     paymentDetails?.qr_code ||
//     'https://via.placeholder.com/200x200.png?text=QR+Code'
//   const upiId =
//     paymentDetails?.upiId ||
//     paymentDetails?.upi ||
//     paymentDetails?.upi_id ||
//     'mealx@upi'
//   const phone =
//     paymentDetails?.phoneNumber ||
//     paymentDetails?.phone ||
//     paymentDetails?.mobile ||
//     ''

//   return (
//     <div className='flex h-screen bg-gray-50'>
//       <Navbar2 />
//       <div className='flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto'>
//         <CustomerHeader />
//         <div className='max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6'>
//           <h2 className='text-2xl font-semibold text-gray-700'>
//             {t('Cash / UPI Payment')}
//           </h2>

//           <div className='border rounded-lg p-4 flex flex-col items-center gap-2 w-full'>
//             {loadingDetails ? (
//               <div className='py-8 w-full text-center text-gray-500'>
//                 {t('Loading payment details...')}
//               </div>
//             ) : (
//               <>
//                 <img
//                   src={qrSrc}
//                   alt='QR Code'
//                   className='w-48 h-48 object-contain'
//                 />
//                 <p className='text-gray-500 text-sm'>
//                   {t('Scan this QR to pay at the mess counter')}
//                 </p>

//                 {phone && (
//                   <div className='mt-3 text-center'>
//                     <p className='text-gray-700 font-medium'>
//                       {t('You can also make payment using this phone number:')}
//                     </p>
//                     <p className='text-green-600 font-bold text-lg'>{phone}</p>
//                     <p className='text-xs text-gray-500'>
//                       {t('(Linked with UPI)')}
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           <div className='w-full bg-gray-100 p-4 rounded-lg text-center'>
//             <p className='text-gray-700 font-medium'>
//               {t('UPI ID:')}{' '}
//               <span className='text-orange-500 font-semibold'>{upiId}</span>
//             </p>
//           </div>

//           <button
//             className={`w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg font-medium ${
//               loading ? 'opacity-70 cursor-not-allowed' : ''
//             }`}
//             onClick={handleRequest}
//             disabled={loading}
//           >
//             {loading ? t('Sending Request...') : t('Request Plan')}
//           </button>

//           <button
//             className='w-full font-bold cursor-pointer text-gray-500 hover:text-red-500 mt-2 text-sm'
//             onClick={() => navigate(-1)}
//           >
//             ← {t('Back')}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
