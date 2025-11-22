import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { MdPowerSettingsNew  } from "react-icons/md";

const InputGroup = ({ label, children }) => {
  const parts = label.split("*");
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-black">
        {parts[0]}
        {label.includes("*") && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
};

const MessDetailsForm = () => {
  const navigate = useNavigate();
  const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  // 🌍 Country / State / City related states
const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [selectedCountry, setSelectedCountry] = useState("India");
const [selectedState, setSelectedState] = useState("");
const [pincode, setPincode] = useState("");

  const validateFile = (file, allowedTypes) => {
    if (!file) return true;
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, PNG files are allowed.');
      return false;
    }
    return true;
  };

  const [form, setForm] = useState({
    messName: '',
    messType: '',
    email: '',
    contactNumber: '',
    alternateContact: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    fssaiLicenseNumber: '',
    activationDocType: '',
    openTime: '10:30',
    closeTime: '22:30',
    daysOpen: [],
    services: [],
       dineCharge: "",
  takeAwayCharge: "",
  deliveryCharge: ""
  });

  const [logoFile, setLogoFile] = useState(null);
  const [activationDoc, setActivationDoc] = useState(null);
  const [fssaiDoc, setFssaiDoc] = useState(null);

  const handleToggleDay = (day) => {
    setSelectedDays((prev) => {
      const updatedDays = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];

      const fullDayMap = {
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sun: 'Sunday',
      };

      const mappedDays = updatedDays.map((d) => fullDayMap[d]);

      setForm((prevForm) => ({
        ...prevForm,
        daysOpen: mappedDays,
      }));

      return updatedDays;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

      if (name === "city" || name === "state") {
    const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
    setForm((prev) => ({ ...prev, [name]: lettersOnly }));
    return;
  }
  if (
  name === "dineCharge" ||
  name === "takeAwayCharge" ||
  name === "deliveryCharge"
) {
  let num = value.trim() === "" ? "" : value;

  if (!/^\d*$/.test(num)) return;

  setForm((prev) => ({ 
    ...prev, 
    [name]: num 
  }));

  return;
}


    setForm((prev) => ({ ...prev, [name]: value }));
  };




  const validateFields = () => {
    const requiredFields = [
      'messName',
      'messType',
      'email',
      'contactNumber',
      'address',
      'city',
      'state',
      'pincode',
      'openTime',
      'closeTime',
      'activationDocType',
    ];

    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill out the ${field} field.`);
        return false;
      }
    }

    if (!logoFile) {
      alert('Please upload Mess Logo.');
      return false;
    }

    if (!activationDoc) {
      alert('Please upload Activation Document.');
      return false;
    }

    if (form.services.length === 0) {
      alert('Please select at least one service offered.');
      return false;
    }

    if (form.daysOpen.length === 0) {
      alert('Please select days open.');
      return false;
    }

    if (!/^\d{10}$/.test(form.contactNumber)) {
      alert('Please enter a valid 10-digit contact number.');
      return false;
    }

    if (form.alternateContact && !/^\d{10}$/.test(form.alternateContact)) {
      alert('Please enter a valid 10-digit alternate contact number.');
      return false;
    }

    // FSSAI validation
    if (form.fssaiLicenseNumber && !fssaiDoc) {
      alert('Please upload FSSAI Document since you entered License Number.');
      return false;
    }
    if (fssaiDoc && !form.fssaiLicenseNumber) {
      alert('Please enter FSSAI License Number since you uploaded FSSAI Document.');
      return false;
    }

    return true;
  };
// ✅ Simple silent check to see if form is ready for submission
const isFormValid = () => {
  const requiredFields = [
    'messName',
    'messType',
    'email',
    'contactNumber',
    'address',
    'city',
    'state',
    'pincode',
    'openTime',
    'closeTime',
    'activationDocType',
  ];

  return requiredFields.every((f) => form[f]) &&
         logoFile &&
         activationDoc &&
         form.services.length > 0 &&
         form.daysOpen.length > 0 &&
         /^\d{10}$/.test(form.contactNumber);
};

  const [openTime, setOpenTime] = useState({ hour: '10', minute: '30', period: 'AM' });
  const [closeTime, setCloseTime] = useState({ hour: '10', minute: '30', period: 'PM' });

  // Helper — convert 12-hour to 24-hour format
  const convertTo24Hour = ({ hour, minute, period }) => {
    let h = parseInt(hour, 10);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };


useEffect(() => {
  const fetchCountries = async () => {
    try {
      // const res = await fetch("https://restcountries.com/v3.1/all");
const res = await fetch("https://restcountries.com/v3.1/all?fields=name");

      const data = await res.json();

      const countryList = data
        .map((c) => c.name.common)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));

      setCountries(countryList);
      setSelectedCountry("India");
      setForm((prev) => ({ ...prev, country: "India" }));
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  fetchCountries();
}, []);

// 🧭 Fetch states dynamically when country changes
useEffect(() => {
  const fetchStates = async () => {
    if (!selectedCountry) return;

    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selectedCountry }),
      });

      const data = await res.json();

      if (data?.data?.states?.length) {
        const allStates = data.data.states.map((s) => s.name).filter(Boolean);
        setStates(allStates.sort());
      } else {
        setStates([]); // no states found
      }
    } catch (err) {
      console.error("Error fetching states:", err);
      setStates([]);
    }
  };

  fetchStates();
}, [selectedCountry]);

useEffect(() => {
    setForm((prev) => ({
      ...prev,
      openTime: convertTo24Hour(openTime),
      closeTime: convertTo24Hour(closeTime),
    }));
  }, [openTime, closeTime]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();

    const normalizeArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    // ensure array fields
    normalizeArray(form.daysOpen).forEach((day) => {
      formData.append('daysOpen[]', day);
    });

    normalizeArray(form.services).forEach((service) => {
      formData.append('services[]', service);
    });
// Dine charge
if (form.services.includes("dine")) {
  formData.append("dineCharge", form.dineCharge || "0");
}

if (form.services.includes("take-away")) {
  formData.append("takeAwayCharge", form.takeAwayCharge || "0");
}

if (form.services.includes("delivery")) {
  formData.append("deliveryCharge", form.deliveryCharge || "0");
}

formData.append("country", form.country?.toLowerCase() || "");
console.log(form.dineCharge, form.takeAwayCharge, form.deliveryCharge, form.country);
    for (const key in form) {
        if (key === "country") continue; 
        if (["dineCharge", "takeAwayCharge", "deliveryCharge"].includes(key)) continue;

      if (key !== 'daysOpen' && key !== 'services') {
        formData.append(key, form[key]);
      }
    }
    if (!validateFile(logoFile, ['image/jpeg', 'image/png'])) {
      setLoading(false);
      return;
    }
    if (!validateFile(activationDoc, ['image/jpeg', 'image/png', 'application/pdf'])) {
      setLoading(false);
      return;
    }
    if (fssaiDoc && !validateFile(fssaiDoc, ['image/jpeg', 'image/png', 'application/pdf'])) {
      setLoading(false);
      return;
    }

    formData.append('logoFile', logoFile);
    formData.append('activationDoc', activationDoc);
    if (fssaiDoc) formData.append('fssaiDoc', fssaiDoc);

    const token = storage.getItem('token')?.replace(/"/g, '');
    if (!token) {
      toast.error('Session expired. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const res = await apiPost('/owner/mess', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.success) {
        const { email, requestId, messId, messName } = res;
        storage.setItem('messEmail', email);
        storage.setItem('messRequestId', requestId);
        storage.setItem('messId', messId);
        storage.setItem('messName', messName);
        navigate('/verify-mess-otp');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Mess registration failed.');
    } finally {
      setLoading(false);
    }
  };
    const handleLogout = async () => {
    try {
      const userJwt = storage.getItem("token");
      const fcmToken = storage.getItem("fcmToken");
      await apiPost(
        "/user/logout",
        { fcmToken },
        { headers: { Authorization: `Bearer ${userJwt}` } }
      );
    } catch (err) {
    } finally {
      storage.clear();
      localStorage.clear();
      sessionStorage.clear();
      
      if (window.Razorpay) delete window.Razorpay;
      window.location.replace("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow space-y-6"
    >
      <div className="flex justify-between items-center mb-6 relative">
  <div className="flex items-center gap-2">
    <ArrowLeft
      className="w-8 h-8 cursor-pointer text-orange-500 hover:text-red-500"
      onClick={() => navigate(-1)}
    />
    <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">Create Mess Profile</h2>
  </div>

  <button
    onClick={handleLogout}
    className="flex items-center gap-1  hover:bg-red-200 text-red-500 
               px-3 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm cursor-pointer
               font-semibold shadow-sm transition-all duration-200"
  >
    <MdPowerSettingsNew size={16} className="sm:w-5 sm:h-5" />
    <span className="hidden sm:inline">LOG OUT</span>
  </button>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InputGroup label="Mess Name*">
          <input
            type="text"
            name="messName"
            placeholder="Enter Mess Name"
            value={form.messName}
            onChange={handleChange}
            className="w-full px-4 py-3 border bg-gray-100 border-black rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="Mess Type*">
          <select
            name="messType"
            value={form.messType}
            onChange={handleChange}
            className="w-full px-4 py-3 cursor-pointer bg-gray-100 border border-black rounded-xl"
            required
          >
            <option value="">Select Type</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="both">Both</option>
          </select>
        </InputGroup>

        <InputGroup label="Email Address*">
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="Contact Number*">
          <input
            type="tel"
            name="contactNumber"
            placeholder="Enter Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="Alternate Contact Number">
          <input
            type="tel"
            name="alternateContact"
            placeholder="Enter Alternate Contact"
            value={form.alternateContact}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
          />
        </InputGroup>


{/* 🌍 Country */}
<InputGroup label="Country*">
  <select
    name="country"
    value={selectedCountry}
    onChange={(e) => {
      const country = e.target.value;
      setSelectedCountry(country);
      setForm((prev) => ({
        ...prev,
        country,
        state: "",
        city: "",
      }));
      if (country !== "India") setStates([]);
    }}
    className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl cursor-pointer"
    required
  >
    <option value="">Select Country</option>
    <option value="India">India</option>
    {countries
      .filter((c) => c !== "India")
      .map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
  </select>
</InputGroup>

{/* 🏙️ State */}
<InputGroup label="State*">
  {selectedCountry === "India" ? (
    <select
      name="state"
      value={selectedState}
      onChange={(e) => {
        const state = e.target.value;
        setSelectedState(state);
        setForm((prev) => ({ ...prev, state }));
      }}
      className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl cursor-pointer"
      required
    >
      <option value="">Select State</option>
      {states.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  ) : (
    <input
      type="text"
      name="state"
      value={form.state || ""}
      onChange={(e) =>
        setForm((prev) => ({ ...prev, state: e.target.value }))
      }
      className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
      placeholder="Enter State"
      required
    />
  )}
</InputGroup>

{/* 📮 Pincode */}
<InputGroup label="Pincode*">
  <input
    type="text"
    name="pincode"
    value={pincode}
    maxLength={6}
    onChange={async (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setPincode(value);
      setForm((prev) => ({ ...prev, pincode: value }));

      if (selectedCountry === "India" && value.length === 6) {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
          const data = await res.json();
          if (data[0]?.Status === "Success") {
            const details = data[0].PostOffice[0];
            setForm((prev) => ({
              ...prev,
              city: details.District,
              state: details.State,
              country: "India",
            }));
            setSelectedState(details.State);
          }
        } catch (err) {
          console.error("Error fetching pincode details:", err);
        }
      }
    }}
    className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
    placeholder="Enter Pincode"
    required
  />
</InputGroup>

<InputGroup label="City*">
  <input
    type="text"
    name="city"
    value={form.city || ""}
    onChange={(e) => {
      const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
      setForm((prev) => ({ ...prev, city: lettersOnly }));
    }}
    className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
    placeholder="Enter City"
    required
  />
</InputGroup>



        <InputGroup label="Address*">
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="Activation Document Type*">
          <select
            name="activationDocType"
            value={form.activationDocType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 cursor-pointer border border-black rounded-xl"
            required
          >
            <option value="">Select Type</option>
            <option value="aadhaar">Aadhaar</option>
            <option value="gst">GST</option>
            <option value="pan">PAN</option>
            <option value="electricity_bill">Electricity Bill</option>
            <option value="business_license">Business License</option>
            <option value="rent_agreement">Rent Agreement</option>
            <option value="other">Other</option>
          </select>
        </InputGroup>

        <InputGroup label="Upload Activation Document* (PDF, JPG, PNG)">
          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={(e) => {
              if (!form.activationDocType) return; // ignore if disabled
              setActivationDoc(e.target.files[0]);
            }}
            required={!!form.activationDocType}
            disabled={!form.activationDocType}
            className={`w-full px-4 py-3 bg-gray-100 border rounded-xl ${
              !form.activationDocType ? 'opacity-60 cursor-not-allowed border-black' : 'border-black'
            }`}
          />
        </InputGroup>

        <InputGroup label="Upload Mess Logo* (JPG, PNG)">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => setLogoFile(e.target.files[0])}
            required
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
          />
        </InputGroup>

        <InputGroup label="FSSAI License Number">
          <input
            type="text"
            name="fssaiLicenseNumber"
            placeholder="e.g., 10022XXXXX00000"
            value={form.fssaiLicenseNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
          />
        </InputGroup>

        <InputGroup label="Upload FSSAI Document (PDF, JPG, PNG)">
          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={(e) => {
              if (!form.fssaiLicenseNumber) return;
              setFssaiDoc(e.target.files[0]);
            }}
            disabled={!form.fssaiLicenseNumber}
            required={!!form.fssaiLicenseNumber}
            className={`w-full px-4 py-3 bg-gray-100 border rounded-xl ${
              !form.fssaiLicenseNumber ? 'opacity-60 cursor-not-allowed border-black' : 'border-black'
            }`}
          />
        </InputGroup>

        <InputGroup label="Services Offered*">
          <div className="flex flex-wrap gap-2 cursor-pointer w-full">
            {['dine', 'take-away', 'delivery'].map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    services: prev.services.includes(service)
                      ? prev.services.filter((s) => s !== service)
                      : [...prev.services, service],
                  }));
                }}
                className={`px-4 py-3 border border-black rounded-xl ${
                  form.services.includes(service) ? 'bg-orange-500 text-white' : 'bg-gray-100'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </InputGroup>

  {form.services.includes("dine") && (
    <InputGroup label="Dine-in Charge">
      <input
        type="text"
        name="dineCharge"
        placeholder="Enter Charge"
        value={form.dineCharge}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
      />
    </InputGroup>
  )}

  {form.services.includes("take-away") && (
    <InputGroup label="Take Away Charge">
      <input
        type="text"
        name="takeAwayCharge"
        placeholder="Enter Charge"
        value={form.takeAwayCharge}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
      />
    </InputGroup>
  )}

  {form.services.includes("delivery") && (
    <InputGroup label="Delivery Charge">
      <input
        type="text"
        name="deliveryCharge"
        placeholder="Enter Charge"
        value={form.deliveryCharge}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
      />
    </InputGroup>
  )}
        <InputGroup label="Opening Time*">
          <div className="flex gap-2 items-center cursor-pointer h-full">
            <input
              type="number"
              min="1"
              max="12"
              value={openTime.hour}
              onChange={(e) => setOpenTime((prev) => ({ ...prev, hour: e.target.value }))}
              className="w-20 px-4 py-3 border border-black rounded-xl bg-gray-100 text-center"
            />
            <span className="mt-1">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={openTime.minute}
              onChange={(e) =>
                setOpenTime((prev) => ({ ...prev, minute: String(e.target.value).padStart(2, '0') }))
              }
              className="w-20 px-4 py-3 border border-black rounded-xl bg-gray-100 text-center"
            />
            <select
              value={openTime.period}
              onChange={(e) => setOpenTime((prev) => ({ ...prev, period: e.target.value }))}
              className="px-4 py-3 border border-black rounded-xl bg-gray-100"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </InputGroup>

        <InputGroup label="Closing Time*">
          <div className="flex gap-2 items-center cursor-pointer h-full">
            <input
              type="number"
              min="1"
              max="12"
              value={closeTime.hour}
              onChange={(e) => setCloseTime((prev) => ({ ...prev, hour: e.target.value }))}
              className="w-20 px-4 py-3 border border-black rounded-xl bg-gray-100 text-center"
            />
            <span className="mt-1">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={closeTime.minute}
              onChange={(e) =>
                setCloseTime((prev) => ({ ...prev, minute: String(e.target.value).padStart(2, '0') }))
              }
              className="w-20 px-4 py-3 border border-black rounded-xl bg-gray-100 text-center"
            />
            <select
              value={closeTime.period}
              onChange={(e) => setCloseTime((prev) => ({ ...prev, period: e.target.value }))}
              className="px-4 py-3 border border-black rounded-xl bg-gray-100"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </InputGroup>

        <InputGroup label="Days Open*">
          <div className="flex flex-wrap items-center gap-3 mt-2 bg-gray-50 p-3 rounded-xl border border-gray-300">
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border hover:border-orange-400 transition">
              <input
                type="checkbox"
                checked={selectedDays.length === 7}
                onChange={(e) => {
                  if (e.target.checked) {
                    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    setSelectedDays(allDays);
                    setForm((prev) => ({
                      ...prev,
                      daysOpen: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ],
                    }));
                  } else {
                    setSelectedDays([]);
                    setForm((prev) => ({ ...prev, daysOpen: [] }));
                  }
                }}
                className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-800">Select All</span>
            </label>

            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <label
                  key={day}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500 border-orange-500 text-white shadow'
                      : 'bg-white border-gray-300 hover:border-orange-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      setSelectedDays((prev) => {
                        let updated;
                        if (prev.includes(day)) {
                          updated = prev.filter((d) => d !== day);
                        } else {
                          updated = [...prev, day];
                        }

                        const fullDayMap = {
                          Mon: 'Monday',
                          Tue: 'Tuesday',
                          Wed: 'Wednesday',
                          Thu: 'Thursday',
                          Fri: 'Friday',
                          Sat: 'Saturday',
                          Sun: 'Sunday',
                        };

                        setForm((f) => ({
                          ...f,
                          daysOpen: updated.map((d) => fullDayMap[d]),
                        }));

                        return updated;
                      });
                    }}
                    className="w-5 h-5 accent-orange-500 cursor-pointer"
                  />
                  <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                    {day}
                  </span>
                </label>
              );
            })}
          </div>
        </InputGroup>
      </div>

      {isDaysModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white shadow p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Select Days Open</h2>
            <div className="grid grid-cols-3 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleToggleDay(day)}
                  className={`border px-3 py-1 rounded ${selectedDays.includes(day) ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="text-gray-500" onClick={() => setIsDaysModalOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded"
                onClick={() => {
                  const fullDayMap = {
                    Mon: 'Monday',
                    Tue: 'Tuesday',
                    Wed: 'Wednesday',
                    Thu: 'Thursday',
                    Fri: 'Friday',
                    Sat: 'Saturday',
                    Sun: 'Sunday',
                  };
                  const mappedDays = selectedDays.map((day) => fullDayMap[day]);
                  setForm((prev) => ({ ...prev, daysOpen: mappedDays }));
                  setIsDaysModalOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
     <button
  type="submit"
  disabled={loading || !isFormValid()}
  className={`w-full sm:w-1/2 md:w-1/3 font-semibold py-3 rounded-xl transition ${
    loading || !isFormValid()
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer'
  }`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      <span>Submitting...</span>
    </div>
  ) : (
    'Submit Details'
  )}
</button>
        <p className="mt-2 text-sm text-orange-600">Fields marked with * are mandatory</p>
      </div>
    </form>
  );
};

export default MessDetailsForm;
