
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import { UserPlus } from 'lucide-react';
import { apiGet } from '../services/api';
import storage from '../utils/storage';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const messId = storage.getItem('messId');
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const res = await apiGet(`/owner/mess/customer/${messId}`);
          console.log('Customer API Response:', res); // ✅ Log full API response here

      setCustomers(res.customers ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messId) fetchCustomers();
    
    else setIsLoading(false);
  }, [messId]);

  const handleCustomerClick = (id) => {
    storage.setItem('customerId', id);

    navigate('/owner-customer-profile', { state: { messId, customerId: id } });
  };

  const handleAdd = () => navigate('/add-customer');

  const filtered = customers
    .filter(c => 
      (statusFilter === 'All' || (statusFilter === 'Active') === c.isActive) &&
      (c.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (customers.indexOf(c) + 1).toString().includes(searchTerm))
    );

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-green-50 overflow-y-auto">
        <OwnerHeader />
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Customers</h2> */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
  Customers ({customers.length})
      </h2>

          <div className="flex gap-2 items-center">
            {['All', 'Active', 'Inactive'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded text-sm ${
                  statusFilter === s ? 'bg-orange-500 text-white' : 'border text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
            <input
              type="text"
              placeholder="Search by name or S.No"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border px-3 py-1 rounded text-sm"
            />
            <button
              onClick={handleAdd}
              className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Add Customer
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded">
          <div className="grid grid-cols-5 font-semibold border-b p-3 text-sm text-gray-600">
            <div>S.No</div><div>Profile</div><div>Name</div><div>Status</div><div>Contact</div>
          </div>

          {isLoading ? (
            <div className="text-center p-4 text-gray-500">Loading customers...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center p-4 text-orange-500">No matching customers</div>
          ) : (
            filtered.map((cust, idx) => (
              <div
                key={cust.userId}
                onClick={() => handleCustomerClick(cust.userId)}
                className="grid grid-cols-5 items-center text-sm border-b px-3 py-2 hover:bg-orange-50 cursor-pointer transition"
              >
                <div>{idx + 1}</div>
                <img
                  src={cust.profileImage || '/default-avatar.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full border"
                />
                <div>{cust.customerName || '—'}</div>
                <div className={cust.isActive ? 'text-green-600' : 'text-red-500'}>
                  {cust.isActive ? 'Active' : 'Inactive'}
                </div>
                <div>{cust.city || '—'}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
