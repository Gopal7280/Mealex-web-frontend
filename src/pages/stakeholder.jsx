



import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate ,useLocation} from "react-router-dom";
import storage from "../utils/storage";
import { apiPost } from "../services/api";
import toast from "react-hot-toast";

const StakeholderAndBankForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "stakeholder");


  // const [activeTab, setActiveTab] = useState("stakeholder");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateIFSC = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/i.test((ifsc || "").trim());

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setLoading(true);
    try {
      const messId = storage.getItem("messId");
      if (!messId) {
        toast.error("Mess ID not found in storage");
        return;
      }

      let endpoint = "";
      let payload = {};
      let apiMethod = apiPost;

      if (type === "stakeholder") {
        payload = {
          name: formData.name,
          email: formData.email,
          phone: {
            primary: formData.phone_primary,
            secondary: formData.phone_secondary,
          },
          addresses: {
            residential: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postal_code,
              country: "IN",
            },
          },
          kyc: { pan: formData.pan },
        };
        endpoint = `/owner/add/stakeholder/${messId}`;
      } else {
        if (!validateIFSC(formData.ifsc_code)) {
          toast.error("Invalid IFSC format");
          return;
        }
        payload = {
          tnc_accepted: formData.tnc || false,
          settlements: {
            beneficiary_name: formData.beneficiary_name,
            ifsc_code: formData.ifsc_code.toUpperCase(),
            account_number: formData.account_number,
          },
        };
        endpoint = `/owner/add/bank-details/${messId}`;
      }

      const res = await apiMethod(endpoint, payload);

      if (type === "stakeholder") {
        toast.success("✅ Stakeholder created successfully!");
        // ⏳ auto switch to bank tab after 2s
        setTimeout(() => setActiveTab("bank"), 2000);
      } else {
        toast.success("✅ Bank details added successfully!");
        navigate("/owner-dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.data.error.description || err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border relative">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-orange-600 flex items-center gap-1"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
          Razorpay Linked Account Setup
        </h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "stakeholder"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-orange-500"
            }`}
            onClick={() => setActiveTab("stakeholder")}
          >
            Create Stakeholder
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "bank"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-orange-500"
            }`}
            onClick={() => setActiveTab("bank")}
          >
            Add Bank Details
          </button>
        </div>

        {/* Stakeholder Form */}
        {activeTab === "stakeholder" && (
          <form onSubmit={(e) => handleSubmit(e, "stakeholder")} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
            <input type="text" name="phone_primary" placeholder="Primary Phone" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
            <input type="text" name="phone_secondary" placeholder="Secondary Phone" onChange={handleChange} className="border p-3 rounded-lg w-full" />

            <h3 className="text-lg font-semibold mt-4">Residential Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="street" placeholder="Street" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
              <input type="text" name="city" placeholder="City" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
              <input type="text" name="state" placeholder="State" onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" required />
              <input type="text" name="postal_code" placeholder="Postal Code" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
              <input type="text" name="country" value="IN" readOnly className="border p-3 rounded-lg w-full bg-gray-100" />
            </div>

            <input type="text" name="pan" placeholder="PAN Number" onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" required />

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full font-medium transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Stakeholder"}
            </button>
          </form>
        )}

        {/* Bank Form */}
        {activeTab === "bank" && (
          <form onSubmit={(e) => handleSubmit(e, "bank")} className="space-y-4">
            <input type="text" name="beneficiary_name" placeholder="Beneficiary Name" onChange={handleChange} className="border p-3 rounded-lg w-full" required />
            <input type="text" name="ifsc_code" placeholder="IFSC Code" onChange={handleChange} className="border p-3 rounded-lg w-full uppercase" required />
            <input type="text" name="account_number" placeholder="Bank Account Number" onChange={handleChange} className="border p-3 rounded-lg w-full" required />

            <div className="flex items-center gap-2">
              <input type="checkbox" name="tnc" onChange={handleChange} />
              <span className="text-sm text-gray-600">I confirm settlement terms & conditions</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg w-full font-medium transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Bank Details"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StakeholderAndBankForm;
