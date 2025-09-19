import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import storage from '../utils/storage';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { Clock } from "lucide-react";
import { useRef } from "react";



const InputGroup = ({ label, children }) => (
  <div className="space-y-8">
    <label className="text-sm font-bold text-black">{label}</label>
    {children}
  </div>
);

const MessDetailsForm = () => {
  const navigate = useNavigate();
  const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const openTimeRef = useRef(null);
const closeTimeRef = useRef(null);

     const validateFile = (file, allowedTypes) => {
  if (!file) return true;
  if (!allowedTypes.includes(file.type)) {
    alert("Only PDF, JPG, PNG files are allowed.");
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
  });

  const [logoFile, setLogoFile] = useState(null);
  const [activationDoc, setActivationDoc] = useState(null);
  const [fssaiDoc, setFssaiDoc] = useState(null);


const handleToggleDay = (day) => {
  setSelectedDays((prev) => {
    const updatedDays = prev.includes(day)
      ? prev.filter((d) => d !== day)
      : [...prev, day];

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
      alert("Please upload Mess Logo.");
      return false;
    }

    if (!activationDoc) {
      alert("Please upload Activation Document.");
      return false;
    }

    if (form.services.length === 0) {
      alert("Please select at least one service offered.");
      return false;
    }

    if (form.daysOpen.length === 0) {
      alert("Please select days open.");
      return false;
    }

    if (!/^\d{10}$/.test(form.contactNumber)) {
      alert("Please enter a valid 10-digit contact number.");
      return false;
    }

    if (form.alternateContact && !/^\d{10}$/.test(form.alternateContact)) {
      alert("Please enter a valid 10-digit alternate contact number.");
      return false;
    }

    // ✅ FSSAI validation
    if (form.fssaiLicenseNumber && !fssaiDoc) {
      alert("Please upload FSSAI Document since you entered License Number.");
      return false;
    }
    if (fssaiDoc && !form.fssaiLicenseNumber) {
      alert("Please enter FSSAI License Number since you uploaded FSSAI Document.");
      return false;
    }
 


    return true;
  };


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
    formData.append("daysOpen[]", day);
  });

  normalizeArray(form.services).forEach((service) => {
    formData.append("services[]", service);
  });

  // other fields
  for (const key in form) {
    if (key !== "daysOpen" && key !== "services") {
      formData.append(key, form[key]);
    }
  }

  // file validations
  if (!validateFile(logoFile, ["image/jpeg", "image/png"])) {
    setLoading(false);
    return;
  }
  if (!validateFile(activationDoc, ["image/jpeg", "image/png", "application/pdf"])) {
    setLoading(false);
    return;
  }
  if (fssaiDoc && !validateFile(fssaiDoc, ["image/jpeg", "image/png", "application/pdf"])) {
    setLoading(false);
    return;
  }

  formData.append("logoFile", logoFile);
  formData.append("activationDoc", activationDoc);
  if (fssaiDoc) formData.append("fssaiDoc", fssaiDoc);

  const token = storage.getItem("token")?.replace(/"/g, "");
  if (!token) {
    toast.error("Session expired. Please log in again.");
    setLoading(false);
    return;
  }

  try {
    const res = await apiPost("/owner/mess", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
      console.log(res);

    if (res.success) {
      const { email, requestId, messId, messName } = res;
      storage.setItem("messEmail", email);
      storage.setItem("messRequestId", requestId);
      storage.setItem("messId", messId);
      storage.setItem("messName", messName);
      navigate("/verify-mess-otp");
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Mess registration failed.");
  } finally {
    setLoading(false);
  }
};

  
  return (
 
    <form
  onSubmit={handleSubmit}
  className="w-full mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow space-y-8"
>
  <div className="flex items-center gap-2 mb-4">
    <ArrowLeft
      className="w-8 h-8 cursor-pointer text-orange-500 hover:text-red-500"
      onClick={() => navigate(-1)}
    />
    <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
      Create Mess Profile
    </h2>
  </div>


      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <InputGroup label="Mess Name*">
          <input
            type="text"
            name="messName"
            placeholder="Enter Mess Name"
            value={form.messName}
            onChange={handleChange}
            className="w-full px-4 py-3 border  bg-gray-100 border-black focus:border-2 rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="Mess Type*">
          <select
            name="messType"
            value={form.messType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
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

        <InputGroup label="State*">
          <input
            type="text"
            name="state"
            placeholder="Enter State"
            value={form.state}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="Pincode*">
          <input
            type="text"
            name="pincode"
            placeholder="Enter Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
            required
          />
        </InputGroup>

        <InputGroup label="City*">
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
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


{/* 
<InputGroup label="Opening Time*">
  <div className="relative">
    <input
      ref={openTimeRef}
      type="time"
      name="openTime"
      value={form.openTime}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl focus:ring-2 focus:ring-orange-500 "
      required
    />
   
  </div>
</InputGroup>



<InputGroup label="Closing Time*">
  <div className="relative">
    <input
      ref={openTimeRef}
      type="time"
      name="closeTime"
      value={form.closeTime}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl focus:ring-2 focus:ring-orange-500"
      required
    />
     <Clock
      className="absolute right-3 top-1/2 transform -translate-y-1/2 
                 text-black w-5 h-5 cursor-pointer"
      onClick={() => openTimeRef.current?.showPicker?.()}
    />
    
  </div>
</InputGroup> */}


<InputGroup label="Opening Time*">
  <div className="relative">
    <input
      ref={openTimeRef}
      type="time"
      name="openTime"
      value={form.openTime}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl focus:ring-2 focus:ring-orange-500 pr-10"
      required
    />
    <Clock
      className="absolute right-3 top-1/2 transform -translate-y-1/2 
                 text-black w-5 h-5 cursor-pointer"
      onClick={() => openTimeRef.current?.showPicker?.()}
    />
  </div>
</InputGroup>

<InputGroup label="Closing Time*">
  <div className="relative">
    <input
      ref={closeTimeRef}
      type="time"
      name="closeTime"
      value={form.closeTime}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl focus:ring-2 focus:ring-orange-500 pr-10"
      required
    />
    <Clock
      className="absolute right-3 top-1/2 transform -translate-y-1/2 
                 text-black w-5 h-5 cursor-pointer"
      onClick={() => closeTimeRef.current?.showPicker?.()}
    />
  </div>
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
    
<InputGroup label="Upload Mess Logo*">
  <input
    type="file"
    accept="image/jpeg,image/png"
    onChange={(e) => setLogoFile(e.target.files[0])}
    required
    className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
  />
  <p className="mt-1 text-xs text-gray-500">Only JPG, PNG files are allowed.</p>
</InputGroup>

<InputGroup label="Upload Activation Document*">
  <input
    type="file"
    accept="image/jpeg,image/png,application/pdf"
    onChange={(e) => setActivationDoc(e.target.files[0])}
    required
    className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
  />
  <p className="mt-1 text-xs text-gray-500">Only PDF, JPG, PNG files are allowed.</p>
</InputGroup>

<InputGroup label="Upload FSSAI Document">
  <input
    type="file"
    accept="image/jpeg,image/png,application/pdf"
    onChange={(e) => setFssaiDoc(e.target.files[0])}
    className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
  />
  <p className="mt-1 text-xs text-gray-500">Only PDF, JPG, PNG files are allowed.</p>
</InputGroup>


           <InputGroup label="Activation Document Type*">
          <select
            name="activationDocType"
            value={form.activationDocType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-black rounded-xl"
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
        <InputGroup label="Services Offered*">
  <div className="flex flex-wrap gap-2 w-full">
    {['dine', 'take-away', 'delivery'].map((service) => (
      <button
        type="button"
        key={service}
        onClick={() => {
          setForm((prev) => ({
            ...prev,
            services: prev.services.includes(service)
              ? prev.services.filter(s => s !== service)
              : [...prev.services, service]
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


       <div className="mb-4">
  <label className="block mb-1 text-sm font-medium text-black">Days Open</label>
  <button
    type="button"
    onClick={() => setIsDaysModalOpen(true)}
    className="px-4 py-3 border border-black rounded-xl bg-gray-100"
  >
    {selectedDays.length > 0 ? selectedDays.join(', ') : 'Select Days Open'}
  </button>
</div>

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
              className={`border px-3 py-1 rounded ${
                selectedDays.includes(day)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="text-gray-500"
            onClick={() => setIsDaysModalOpen(false)}
          >
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

  {/* Submit Button */}
  <div className="flex flex-col items-center">
    <button
      type="submit"
      disabled={loading}
      className={`w-full sm:w-1/2 md:w-1/3 font-semibold py-3 rounded-xl transition 
        ${
          loading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
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
    <p className="mt-2 text-sm text-orange-600">
      Fields marked with * are mandatory
    </p>
  </div>
</form>

    
  );
};

export default MessDetailsForm;















