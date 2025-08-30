

// active plan card component with backend integration

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import storage from '../utils/storage';

const ActivePlanCard = ({ plan }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

const handleUseTokens = () => {
  const customerPlanId = plan.customerPlanId || plan._id;
  storage.setItem('customerPlanId', customerPlanId);
  navigate(`/customer/use-tokens`);
  setIsMenuOpen(false);
};


  return (
    <div className="relative flex items-center bg-white border rounded-xl p-4 shadow-sm">
      <img
        src={plan.imageUrl}
        alt="Plan"
        className="w-24 h-24 rounded-md object-cover mr-4"
      />
      <div className="flex-1">
        <h3 className="text-md font-semibold text-gray-800">{plan.name}</h3>
        <p className="text-sm text-gray-600">{plan.description}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          ₹ <span className="font-bold text-black">{plan.price}</span>
          <span className="border-l border-gray-300 h-4" />
          <span>{plan.durationDays} Days</span>
        <p className="text-sm text-gray-600">
                          <strong>Purchased on:</strong> {new Date(plan.purchaseDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Expires on:</strong> {new Date(plan.expiryDate).toLocaleDateString()}
                        </p>
        </div>
                                <p className="text-sm text-green-600"> {plan.status} </p>

      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-10 z-50 bg-white border rounded shadow p-2 w-32">
            <p className="text-xs text-gray-500 font-semibold px-2">Options</p>
            <button
              onClick={handleUseTokens}
              className="text-green-600 text-sm font-medium hover:underline px-2 py-1 w-full text-left"
            >
              Use Tokens
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePlanCard;



//dummy data for testing



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MoreVertical } from 'lucide-react';
// import storage from '../utils/storage';

// const ActivePlanCard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const dummyPlan = {
//     _id: 'plan123',
//     name: 'Premium Veg Plan',
//     description: 'Daily lunch and dinner for 30 days',
//     price: 2499,
//     durationDays: 30,
//     purchaseDate: new Date(),
//     expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     status: 'ACTIVE',
//     imageUrl: 'https://via.placeholder.com/150',
//   };

//   const handleUseTokens = () => {
//     const customerPlanId = dummyPlan.customerPlanId || dummyPlan._id;
//     storage.setItem('customerPlanId', customerPlanId);
//     navigate(`/customer/use-tokens`);
//     setIsMenuOpen(false);
//   };

//   return (
//     <div className="relative flex items-center bg-white border rounded-xl p-4 shadow-sm max-w-xl mx-auto mt-4">
//       <img
//         src={dummyPlan.imageUrl}
//         alt="Plan"
//         className="w-24 h-24 rounded-md object-cover mr-4"
//       />
//       <div className="flex-1">
//         <h3 className="text-md font-semibold text-gray-800">{dummyPlan.name}</h3>
//         <p className="text-sm text-gray-600">{dummyPlan.description}</p>
//         <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
//           ₹ <span className="font-bold text-black">{dummyPlan.price}</span>
//           <span className="border-l border-gray-300 h-4" />
//           <span>{dummyPlan.durationDays} Days</span>
//         </div>
//         <p className="text-sm text-gray-600 mt-1">
//           <strong>Purchased on:</strong>{' '}
//           {new Date(dummyPlan.purchaseDate).toLocaleDateString()}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>Expires on:</strong>{' '}
//           {new Date(dummyPlan.expiryDate).toLocaleDateString()}
//         </p>
//         <p className="text-sm text-green-600 font-semibold mt-1">{dummyPlan.status}</p>
//       </div>

//       <div className="relative">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <MoreVertical className="h-5 w-5 text-gray-500" />
//         </button>

//         {isMenuOpen && (
//           <div className="absolute right-0 top-10 z-50 bg-white border rounded shadow p-2 w-32">
//             <p className="text-xs text-gray-500 font-semibold px-2">Options</p>
//             <button
//               onClick={handleUseTokens}
//               className="text-green-600 text-sm font-medium hover:underline px-2 py-1 w-full text-left"
//             >
//               Use Tokens
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivePlanCard;
