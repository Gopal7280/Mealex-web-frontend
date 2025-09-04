import React, { useEffect, useState ,useRef} from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import OwnerHeader from './ownerHeader';
import PlanOptions from './PlanOptions';
import { apiGet, apiPost } from '../services/api';
import storage from '../utils/storage';
import planIllustration from '../assets/clipboard.png.png';

const Plans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messId = storage.getItem('messId');
  const optionsRef = useRef(null); // 🔹 reference for PlanOptions


  const [sortType, setSortType] = useState(null); 
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPriceClicked, setIsPriceClicked] = useState(false);

  const fetchPlans = async () => {
    try {
      const res = await apiGet(`/owner/mess/plan/${messId}`);
      console.log('🔍 Plans fetched:', res.data);
      const normalized = (res?.data || []).map(plan => ({
        ...plan,
        _id: plan.planId,
        isActive: plan.status === 'active' || plan.status === 'activated',
      }));
      setPlans(normalized);
    } catch (error) {
      console.error('❌ Failed to fetch plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

const handleAction = async (action, planId) => {
  if (action === 'close') {
    setSelectedPlanId(null);
    return;
  }

  const endpointMap = {
    activate: `/owner/mess/plan/activate/${planId}`,
    deactivate: `/owner/mess/plan/deactivate/${planId}`,
    delete: `/owner/mess/plan/delete/${planId}`,
  };

  try {
    const res = await apiPost(endpointMap[action]);

    if (res?.data?.success) {
      setPlans((prevPlans) =>
        prevPlans
          .map((plan) => {
            if (plan._id === planId) {
              if (action === 'delete') return null;

              return {
                ...plan,
                isActive: action === 'activate',
                status: action === 'activate' ? 'active' : 'deactivated', // ✅ update UI instantly
              };
            }
            return plan;
          })
          .filter(Boolean)
      );
    }
    setSelectedPlanId(null);
  } catch (err) {
    console.error(`❌ Failed to ${action} plan`, err);
  }
};


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target)
      ) {
        setSelectedPlanId(null); // close if click is outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [messId]);

  // Sorting logic
  let sortedPlans = [...plans];
  if (sortType === 'priceAsc') {
    sortedPlans.sort((a, b) => a.price - b.price);
  } else if (sortType === 'priceDesc') {
    sortedPlans.sort((a, b) => b.price - a.price);
  } else if (sortType === 'alpha') {
    sortedPlans.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  return (
    <div className="flex h-screen">
      <Navbar />
      {/* <div className="flex-1 p-6 overflow-y-auto bg-[#f9f4f0] min-h-screen"> */}
      <div className="flex-1 md:p-4 pt-16 py-4 px-4 bg-gray-50 overflow-y-auto">
        <OwnerHeader ownerName="Pranav" messName="Test Mess 1" />
        <p className="text-2xl font-semibold  text-[#232325] mb-4">
          Your Plans ({plans.length}),
        </p>

        {/* SORTING CONTROLS */}
        <div className="flex gap-2 mb-6 relative">
          {/* 💰 Price Button */}


          {/* ⇅ Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm"
            >
              ⇅ Sort
            </button>

            {isSortDropdownOpen && (
              <div className="absolute z-10 mt-2 w-52 bg-white border rounded-lg shadow-md p-2 text-sm">
                <button
                  onClick={() => {
                    if (isPriceClicked) setSortType('priceAsc');
                    setIsSortDropdownOpen(false);
                  }}
                  disabled={!isPriceClicked}
                  className={`block w-full text-left p-1 rounded ${
                    isPriceClicked ? 'hover:bg-gray-100 text-black' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  🔼 Price Ascending
                </button>
                <button
                  onClick={() => {
                    if (isPriceClicked) setSortType('priceDesc');
                    setIsSortDropdownOpen(false);
                  }}
                  disabled={!isPriceClicked}
                  className={`block w-full text-left p-1 rounded ${
                    isPriceClicked ? 'hover:bg-gray-100 text-black' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  🔽 Price Descending
                </button>
                <button
                  onClick={() => {
                    setSortType('alpha');
                    setIsSortDropdownOpen(false);
                  }}
                  className="block w-full text-left hover:bg-gray-100 p-1 rounded"
                >
                  🔤 Alphabetical (Name)
                </button>
              </div>
            )}
          </div>
                    <button
            onClick={() => setIsPriceClicked(true)}
            className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm"
          >
            💰 Price
          </button>

          {/* UI Placeholders */}
          <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">
            Popularity
          </button>
          <button className="border px-4 py-1 rounded-md bg-white shadow-sm text-sm text-gray-400 cursor-not-allowed">
            Date Added +
          </button>
        </div>

        {/* PLAN LIST OR EMPTY STATE */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading plans...</div>
        ) : sortedPlans.length === 0 ? (
          <div className="text-center">
            <img src={planIllustration} className="w-40 h-40 mx-auto mb-1" />
            <p className="text-orange-600 text-xl font-bold">NO PLANS CREATED</p>
            <p className="text-sm">Let's create a plan to get started.</p>
            <button
              onClick={() => navigate('/add-plan')}
              className="bg-orange-500 text-white mt-2 md:mt-24 w-1/2 py-3 rounded-xl"
            >
              Create New Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedPlans.map((plan) => {
              const isSelected = selectedPlanId === plan._id;
              const { image, ...planDataWithoutImage } = plan;

              return (

<div key={plan._id} className="relative">
  {/* <div
    className={`flex bg-white border rounded-xl p-4 shadow-md transition-all duration-300 gap-4 ${
      !plan.isActive ? 'grayscale opacity-50' : ''
    }`}
  >
   */}
     <div
                    className={`flex bg-white border rounded-xl p-4 shadow-md transition-all duration-300 gap-4 ${
                      isSelected ? 'grayscale opacity-50' : plan.isActive ? '' : 'grayscale opacity-50'
                    }`}
                  >
  
<div className="relative w-28 h-28">
  <img
    src={plan.imageUrl}
    alt="Plan"
    className="w-full h-full object-cover rounded-lg"
  />
  
  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 rounded-lg cursor-pointer transition">
    <span className="text-white text-xs font-semibold px-2 py-1 border border-white rounded">Edit Image</span>
    <input
      type="file"
      accept="image/*"
      className="hidden"
     
onChange={async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append('image', file);

  try {
    const res = await apiPost(
      `/owner/mess/plan/update/image/${plan._id}`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    if (res?.data?.success) {
      const updatedImageUrl = res.data.data.imageUrl + `?t=${Date.now()}`;

      setPlans((prevPlans) =>
        prevPlans.map((p) =>
          p._id === plan._id
            ? { ...p, imageUrl: updatedImageUrl } // ✅ update in state instantly
            : p
        )
      );
    }
  } catch (err) {
    console.error('❌ Failed to update image:', err);
  }
}}

    />
  </label>
</div>

    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-800">{plan.name}</h3>
          <p className="text-sm text-gray-500">{plan.description}</p>
          <p className="text-sm text-green-500">{plan.status}</p>


        </div>

        <button
          onClick={() => {
            const id = isSelected ? null : plan._id;
            setSelectedPlanId(id);
            if (id) {
              storage.setItem('planId', id);
            } else {
              storage.removeItem('planId');
            }
          }}
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1 text-sm text-gray-700">
        <p className="font-semibold text-lg text-black">₹ {plan.price}</p>
        <p className="flex items-center gap-2">
          🎟️ {plan.totalTokens}/ {plan.totalTokens} Tokens
        </p>
        <p className="flex items-center gap-2">📅 {plan.durationDays} Days</p>
      </div>

      <div className="flex justify-end mt-3">
        <button
          title="Edit Plan"
          onClick={() =>
            navigate('/edit-plan', { state: { plan: planDataWithoutImage } })
          }
          className="text-purple-600 hover:text-purple-800 text-sm"
        >
          Edit &gt;
        </button>
      </div>
    </div>
  </div>

  {isSelected && (
    <div  ref={optionsRef} className="absolute top-4 right-4 z-50">
      <PlanOptions
        planId={plan._id}
        isActive={plan.isActive}
        onAction={handleAction}
      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
  
      </div>
    </div>
  );
};

export default Plans;
