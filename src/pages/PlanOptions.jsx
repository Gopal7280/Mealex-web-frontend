// // import React from 'react';

// // const PlanOptions = ({ planId, isActive, onAction }) => {
// //   return (
// //     <div className="absolute z-10 bg-white border shadow-md rounded-lg p-3 w-52">
// //       <p className="font-semibold text-sm mb-2 text-gray-700">Options</p>
// //       <div className="space-y-2">
// //         {!isActive && (
// //           <button
// //             onClick={() => onAction('activate', planId)}
// //             className="flex items-center text-green-600 text-sm hover:underline"
// //           >
// //             ✅ Activate Plan
// //           </button>
// //         )}
// //         {isActive && (
// //           <button
// //             onClick={() => onAction('deactivate', planId)}
// //             className="flex items-center text-orange-500 text-sm hover:underline"
// //           >
// //             ⛔ Deactivate Plan
// //           </button>
// //         )}
// //         <button
// //           onClick={() => onAction('delete', planId)}
// //           className="flex items-center text-red-600 text-sm hover:underline"
// //         >
// //           🗑 Delete Plan
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PlanOptions;

// import React from 'react';
// import { CheckCircle, Trash2, PauseCircle, PlayCircle } from 'lucide-react';

// const PlanOptions = ({ planId, isActive, onAction }) => {
//   return (
//     <div className="absolute z-10 bg-white border shadow-lg rounded-lg p-3 w-60 plan-options">
//       <div className="flex justify-between items-center mb-2">
//         <p className="font-semibold text-sm text-gray-700">Options</p>
//         <button onClick={() => onAction('close')} className="text-gray-400 text-sm">✖</button>
//       </div>
//       <div className="space-y-2">
//         <button
//           onClick={() => onAction('activate', planId)}
//           className="flex justify-between items-center w-full text-green-600 text-sm hover:underline"
//         >
//           <span className="flex items-center gap-2">
//             <PlayCircle size={16} /> Activate Plan
//           </span>
//           {!isActive && <CheckCircle size={16} />}
//         </button>

//         <button
//           onClick={() => onAction('deactivate', planId)}
//           className="flex justify-between items-center w-full text-yellow-600 text-sm hover:underline"
//         >
//           <span className="flex items-center gap-2">
//             <PauseCircle size={16} /> Deactivate Plan
//           </span>
//           {isActive && <CheckCircle size={16} />}
//         </button>

//         <button
//           onClick={() => onAction('delete', planId)}
//           className="flex items-center gap-2 text-red-600 text-sm hover:underline"
//         >
//           <Trash2 size={16} /> Delete Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlanOptions;

// import React from 'react';
// import { CheckCircle, Trash2, PauseCircle, PlayCircle } from 'lucide-react';

// const PlanOptions = ({ planId, isActive, onAction }) => {
//   return (
//     <div className="absolute z-10 bg-white border shadow-lg rounded-lg p-3 w-60 plan-options">
//       <div className="flex justify-between items-center mb-2">
//         <p className="font-semibold text-sm text-gray-700">Options</p>
//         <button onClick={() => onAction('close')} className="text-gray-400 text-sm">✖</button>
//       </div>
//       <div className="space-y-2">

//         {/* ✅ Activate Plan */}
//         <button
//           onClick={() => onAction('activate', planId)}
//           className="flex justify-between items-center w-full text-green-600 text-sm hover:underline"
//         >
//           <span className="flex items-center gap-2">
//             <PlayCircle size={16} /> Activate Plan
//           </span>
//           {!isActive && <CheckCircle size={16} className="text-green-600" />}
//         </button>

//         {/* ⛔ Deactivate Plan */}
//         <button
//           onClick={() => onAction('deactivate', planId)}
//           className="flex justify-between items-center w-full text-yellow-600 text-sm hover:underline"
//         >
//           <span className="flex items-center gap-2">
//             <PauseCircle size={16} /> Deactivate Plan
//           </span>
//           {isActive && <CheckCircle size={16} className="text-yellow-500" />}
//         </button>

//         {/* 🗑 Delete Plan */}
//         <button
//           onClick={() => onAction('delete', planId)}
//           className="flex items-center gap-2 text-red-600 text-sm hover:underline"
//         >
//           <Trash2 size={16} /> Delete Plan
//         </button>
        
//       </div>
//     </div>
//   );
// };

// export default PlanOptions;

//purana wala just

// import React, { useEffect, useState } from 'react';
// import { CheckCircle, Trash2, PauseCircle, PlayCircle } from 'lucide-react';

// const PlanOptions = ({ planId, isActive, onAction }) => {
//   const [status, setStatus] = useState(isActive); // true = active, false = inactive

//   useEffect(() => {
//     setStatus(isActive);
//   }, [isActive]);

//   const handleAction = (actionType) => {
//     if (actionType === 'activate') {
//       setStatus(true); // optimistic update
//     } else if (actionType === 'deactivate') {
//       setStatus(false);
//     }

//     onAction(actionType, planId);
//   };

//   return (
//     <div className="absolute z--1 bg-white border shadow-lg rounded-lg p-3 w-60 plan-options">
//       <div className="flex justify-between items-center mb-2">
//         <p className="font-semibold text-sm text-gray-700">Options</p>
//         <button onClick={() => onAction('close')} className="text-gray-400 text-sm">✖</button>
//       </div>

//       <div className="space-y-2">
//         {/* ✅ Activate Plan */}
//         <button
//           onClick={() => handleAction('activate')}
//           className="flex justify-between items-center w-full text-green-600 text-sm hover:underline"
//         >
//           <span className="flex items-center gap-2">
//             <PlayCircle size={16} /> Activate Plan
//           </span>
//           {status === true && <CheckCircle size={16} className="text-green-600" />}
//         </button>

//         {/* ⛔ Deactivate Plan */}
//         <button
//           onClick={() => handleAction('deactivate')}
//           className="flex justify-between items-center w-full text-yellow-600 text-sm hover:underline"
//         >
//           <span className="flex items-center gap-2">
//             <PauseCircle size={16} /> Deactivate Plan
//           </span>
//           {status === false && <CheckCircle size={16} className="text-yellow-500" />}
//         </button>

//         {/* 🗑 Delete Plan */}
//         <button
//           onClick={() => onAction('delete', planId)}
//           className="flex items-center gap-2 text-red-600 text-sm hover:underline"
//         >
//           <Trash2 size={16} /> Delete Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlanOptions;


//new Wala 
import React, { useEffect, useState } from 'react';
import { CheckCircle, Trash2, PauseCircle, PlayCircle } from 'lucide-react';

const PlanOptions = ({ planId, isActive, onAction }) => {
  const [status, setStatus] = useState(isActive);

  useEffect(() => {
    setStatus(isActive);
  }, [isActive]);

  const handleAction = (actionType) => {
    if (actionType === 'activate') setStatus(true);
    else if (actionType === 'deactivate') setStatus(false);

    onAction(actionType, planId);
  };

  return (
    <div
      className="absolute left-[-15rem] top-0 bg-white border shadow-lg rounded-lg p-3 w-60 plan-options z-10"
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-sm text-gray-700">Options</p>
        <button
          onClick={() => onAction('close')}
          className="text-gray-400 text-sm"
        >
          ✖
        </button>
      </div>

      <div className="space-y-2">
        {/* ✅ Activate Plan */}
        <button
          onClick={() => handleAction('activate')}
          className="flex justify-between cursor-pointer items-center w-full text-green-600 text-sm hover:underline"
        >
          <span className="flex items-center gap-2">
            <PlayCircle size={16} /> Activate Plan
          </span>
          {status && <CheckCircle size={16} className="text-green-600" />}
        </button>

        {/* ⛔ Deactivate Plan */}
        <button
          onClick={() => handleAction('deactivate')}
          className="flex cursor-pointer justify-between items-center w-full text-yellow-600 text-sm hover:underline"
        >
          <span className="flex items-center gap-2">
            <PauseCircle size={16} /> Deactivate Plan
          </span>
          {!status && <CheckCircle size={16} className="text-yellow-500" />}
        </button>

        {/* 🗑 Delete Plan */}
        <button
          onClick={() => onAction('delete', planId)}
          className="flex items-center cursor-pointer gap-2 text-red-600 text-sm hover:underline"
        >
          <Trash2 size={16} /> Delete Plan
        </button>
      </div>
    </div>
  );
};

export default PlanOptions;
