

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import storage from '../utils/storage'; // Ensure storage is imported

const MessVerificationStatus = () => {
  const { messId } = useParams();
  const navigate = useNavigate();
  const [mess, setMess] = useState(null);
  const [failedFields, setFailedFields] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {

const fetchMess = async () => {
  try {
    const res = await apiGet(`/owner/mess/id/${messId}`);
    

    const data = res?.data;

    // if (!data) throw new Error("Invalid response format from backend");

    // const data = res?.data?.data;

if (typeof data !== 'object' || data === null) {
  throw new Error("Invalid response format from backend");
}

    setMess(data);
    // setStatus(data.status?.toLowerCase() || 'unknown');
let rawStatus = data.status?.toLowerCase() || 'unknown';
if (rawStatus === 'activated') rawStatus = 'active'; // 🔥 Map to expected value
setStatus(rawStatus);

storage.setItem('messId', messId);




    setFailedFields(data.failedFields || []);
  } catch (err) {
  }
};


    fetchMess();
  }, [messId]);

  const isFieldInvalid = (field) => failedFields.includes(field);

  if (!mess) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  const renderStatusTitle = () => {
    if (status === 'active') return 'VERIFIED SUCCESSFULLY ✔';
    if (status === 'pending') return 'VERIFICATION IN PROGRESS ⏳';
    return 'VERIFICATION FAILED ❌';
  };

  const renderStatusColor = () => {
    if (status === 'active') return 'text-green-700';
    if (status === 'pending') return 'text-yellow-500';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <h2 className={`text-center text-2xl font-bold mb-6 ${renderStatusColor()}`}>
        {renderStatusTitle()}
      </h2>

   
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <input className={`input ${isFieldInvalid('messName') && 'border-red-500'}`} value={mess.messName} readOnly />
  <input className={`input ${isFieldInvalid('messType') && 'border-red-500'}`} value={mess.messType} readOnly />
  <input className={`input ${isFieldInvalid('email') && 'border-red-500'}`} value={mess.email} readOnly />
  <input className={`input ${isFieldInvalid('contactNumber') && 'border-red-500'}`} value={mess.contactNumber} readOnly />
  <input className={`input ${isFieldInvalid('alternateContact') && 'border-red-500'}`} value={mess.alternateContact || 'N/A'} readOnly />
  <input className={`input ${isFieldInvalid('address') && 'border-red-500'}`} value={mess.address} readOnly />
  <input className={`input ${isFieldInvalid('city') && 'border-red-500'}`} value={mess.city} readOnly />
  <input className={`input ${isFieldInvalid('state') && 'border-red-500'}`} value={mess.state} readOnly />
  <input className={`input ${isFieldInvalid('pincode') && 'border-red-500'}`} value={mess.pincode} readOnly />
  <input className={`input ${isFieldInvalid('activationDocType') && 'border-red-500'}`} value={mess.activationDocType} readOnly />
  <input className={`input`} value={mess.openTime} readOnly />
  <input className={`input`} value={mess.closeTime} readOnly />
  <input className={`input`} value={(mess.daysOpen || []).join(', ')} readOnly />
</div>
<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
    <a href={mess.logoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Logo</a>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">FSSAI Document</label>
    <a href={mess.fssaiDocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View FSSAI Doc</a>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">Activation Document</label>
    <a href={mess.activationDocUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Activation Doc</a>
  </div>
</div>

  

{status === 'inactive' && (
  <div className="text-center mt-6">
    <p className="text-sm text-orange-500 mb-2">Highlighted fields represent the reason for failure.</p>
    <button onClick={() => navigate('/mess-details', { state: { mess } })} className="px-6 py-2 bg-orange-500 text-white rounded-full">Re-Apply</button>
  </div>
)}
{status === 'active' && (
  <div className="text-center mt-6">
    <button onClick={() => navigate('/owner-dashboard')} className="px-6 py-2 bg-green-600 text-white rounded-full">Go to Dashboard</button>
  </div>
)}
{status === 'pending' && (
  <div className="text-center mt-6">
    <button onClick={() => navigate('/minimal-dashboard')} className="px-6 py-2 bg-gray-600 text-white rounded-full">Cancel Verification</button>
  </div>
)}
    </div>
  );
};

export default MessVerificationStatus;









