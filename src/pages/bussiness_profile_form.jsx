import { useFormik } from "formik";
import React, { useState } from "react";
import { InputComponent } from "../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components/Button";
import { apiPost } from "../services/api";
import * as Yup from "yup";
import { Loader } from "../layouts/Loader";
import { Preview, ModeEdit, DeleteForever, Close } from "@mui/icons-material";
export function Bussiness_profile_from({setRefresh}) {
  const [customFields, setCustomFields] = useState([]);
  const [loader, setLoader] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [signature, setSignature] = useState(null);
  const [pan_no, setPan_no] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [status, setStatus] = useState(true);
  const maxSizeInMB = 1; // Limit size to 2MB
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      businessName: "",
      phone: "",
      email: "",
      pan: "",
      gst: "",
      businessType: "",
      businessCategory: "",
      openingValue: "",
      address: "",
      notes: "",
      birthdate: "",
      anniversary: "",
      personalNotes: "",
      // customFields: "",
      logo: "",
    },
    onSubmit: (values) => {
      // setLoader(true);
      values.customFields = customFields;
      values.gst=gstIn;
      values.pan=pan_no;
      values.phone=phoneNumber;
      values.logo = logoPreview != "" ? logoPreview : null;
      values.signature = signature != "" ? signature : null;
      console.log(logoPreview);
      const addBussinessProfile = async () => {
        setLoader(true);
        try {
          const res =await apiPost("/businessprofile", values);
          // alert(res);
          navigate("/display");
          setRefresh(true);
        } catch (err) {
          console.log(err);
        } finally {
          setLoader(false);
        }
      };
      addBussinessProfile();
      // alert(JSON.stringify(values))
      console.log(values);
    },
  });

  const addCustomField = () => {
    setCustomFields([...customFields, ""]);
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index] = value;
    console.log(updatedFields);
    setCustomFields(updatedFields);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeInMB > maxSizeInMB) {
        setError(`File size should be less than ${maxSizeInMB} MB`);
        alert("file size too long for logo");
        event.target.value = ""; // Clear the input
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
          setLogoPreview(e.target.result);
          localStorage.setItem("image", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeInMB > maxSizeInMB) {
        setError(`File size should be less than ${maxSizeInMB} MB`);
        alert("file size too long for signature");
        event.target.value = ""; // Clear the input
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
          setSignature(e.target.result);
          localStorage.setItem("imageSign", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const [shipping, setShipping] = useState("");
  function handleCheck(e) {
    if (e.target.checked) {
      var bill = document.getElementById("bill");
      console.log(bill.value);
      setShipping(bill.value);
    } else {
      setShipping("");
    }
  }
  const [error, setError] = useState({
    panNo: "",
    gstinNo: "",
    phone_Number: "",
  });
  function handleCheckCred(e, name) {
    if (name == "pan") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(e.target.value.toUpperCase())) {
        if (e.target.value == "") {
          setError({
            panNo: "",
            gstinNo: error.gstinNo,
            phone_Number: error.phone_Number,
          });
          setPan_no("");
          setStatus(true);
        } else {
          setError({
            panNo:
              "Invalid PAN format. Expected: 5 letters, 4 numbers, 1 letter",
            gstinNo: error.gstinNo,
            phone_Number: error.phone_Number,
          });
          setPan_no("false");
          setStatus(false);
        }
      } else {
        setPan_no(e.target.value.toUpperCase());
        console.log("2");
        setError({
          panNo: "",
          gstinNo: error.gstinNo,
          phone_Number: error.phone_Number,
        });
        setStatus(true);
      }
    }
    if (name == "number") {
      const panRegex = /^[0-9]{10}$/;
      if (!panRegex.test(e.target.value)) {
        if (e.target.value == "") {
          setError({
            panNo: error.panNo,
            gstinNo: error.gstinNo,
            phone_Number: "",
          });
          setPhoneNumber("");
          setStatus(true);
        } else {
          setError({
            panNo: error.panNo,
            gstinNo: error.gstinNo,
            phone_Number: "Invalid Mobile no format. Expected: 10 numbers",
          });
          setPhoneNumber("false");
          setStatus(false);
        }
      } else {
        setPhoneNumber(e.target.value);
        console.log("2");
        setError({
          panNo: error.panNo,
          gstinNo: error.gstinNo,
          phone_Number: "",
        });
        setStatus(true);
      }
    }
    if (name == "gstin") {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{2}$/;
      if (!gstRegex.test(e.target.value.toUpperCase())) {
        if (e.target.value == "") {
          setError({
            panNo: error.panNo,
            gstinNo: "",
            phone_Number: error.phone_Number,
          });
          setGstIn("");
          setStatus(true);
        } else {
          setError({
            panNo: error.panNo,
            gstinNo:
              "Invalid GSTIN format. Expected: 2 numbers, 5 letters, 4 numbers, 1 letter , 1 number , 2 letters",
            phone_Number: error.phone_Number,
          });
          setGstIn("false");
          setStatus(false);
        }
      } else {
        setGstIn(e.target.value.toUpperCase());
        console.log("2");
        setError({
          panNo: error.panNo,
          gstinNo: "",
          phone_Number: error.phone_Number,
        });
        setStatus(true);
      }
    }
    console.log(e.target.value);
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 p-4">
          <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              Business Profile
            </h2>
            <NavLink
              to="/dashboard"
              className="text-white text-decoration-none"
            >
              <ButtonComponent
                type="button"
                className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
                value="close"
                children={<Close />}
              />
            </NavLink>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputComponent
                    required
                    labelName="name"
                    labelInput="Name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    classNameInput="w-full p-2 border rounded mt-1"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                <div>
                  <InputComponent
                    required
                    labelName="business_name"
                    labelInput="Bussiness Name"
                    type="text"
                    name="businessName"
                    placeholder="Bussiness name"
                    classNameInput="w-full p-2 border rounded mt-1"
                    onChange={formik.handleChange}
                    value={formik.values.bussiness_name}
                  />
                </div>
                <div className="">
                  <InputComponent
                    htmlFor="mobile"
                    labelInput="Phone No:"
                    type="text"
                    min="0"
                    id="mobile"
                    onChange={(e) => handleCheckCred(e, "number")}
                    name="phone"
                    classNameInput="w-full p-2 border rounded mt-1"
                    placeholder="Enter Phone Number"
                  />
                  <span className="text-red-500">
                    {error.phone_Number != "" ? error.phone_Number : ""}
                  </span>
                </div>
                <div>
                  <InputComponent
                    required
                    labelName="email"
                    labelInput="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email Id"
                    classNameInput="w-full p-2 border rounded mt-1"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div>
                  <InputComponent
                    htmlFor="pan_no"
                    
                    labelInput="Pan No:"
                    type="text"
                    id="pan"
                    onChange={(e) => handleCheckCred(e, "pan")}
                    name="pan"
                    classNameInput="w-full p-2 border rounded mt-1 text-transform: uppercase"
                    placeholder="Enter Pan Number"
                  />
                  <span className="text-red-500">
                    {error.panNo != "" ? error.panNo : ""}
                  </span>
                </div>
                <div>
              <InputComponent
                htmlFor="gst_id"
               
                labelInput="GSTN:"
                type="text"
                id="gst"
                onChange={(e)=>handleCheckCred(e,"gstin")}
                name="gst"
                classNameInput="w-full p-2 border rounded mt-1 text-transform: uppercase"
                placeholder="Enter GSTN"
              />
              <span className="text-red-500">{error.gstinNo!=""?(error.gstinNo):("")}</span>
            </div>
                <div>
                  <div>
                    <label className="block text-gray-600">Business Type</label>
                    <select
                      name="businessType"
                      className="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.businessType}
                    >
                      <option value="">Select</option>
                      <option>Proprietor</option>
                      <option>Partner</option>
                      <option>LLP</option>
                      <option>Pvt.Ltd</option>
                      <option>HUF</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="block text-gray-600">
                      Business Category
                    </label>
                    <select
                      name="businessCategory"
                      className="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.businessCategory}
                    >
                      <option value="">Select</option>
                      <option>Retail</option>
                      <option>Wholesale</option>
                      <option>IT Field</option>
                      <option>Service Industry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <InputComponent
                    labelName="openingValue"
                    labelInput="Opening Value"
                    type="number"
                    min="0"
                    name="openingValue"
                    placeholder="Enter Opening Value"
                    classNameInput="w-full p-2 border rounded mt-1"
                    onChange={formik.handleChange}
                    value={formik.values.openingValue}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-600">Address</label>
                <textarea
                  name="address"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Address"
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="mt-6">
                <label className="block text-gray-600">Business Logo</label>
                <div>
                  <input
                    type="file"
                    id="logoUpload"
                    accept="image/*"
                    className="p-1 border rounded mt-1"
                    onChange={handleLogoChange}
                  />
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-24 h-24 object-contain border rounded mt-2"
                    />
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-600">Signature Upload</label>
                <div>
                  <input
                    type="file"
                    id="logoUpload"
                    accept="image/*"
                    className="p-1 border rounded mt-1"
                    onChange={handleSignatureChange}
                  />
                  {signature && (
                    <img
                      src={signature}
                      alt="Logo Preview"
                      className="w-24 h-24 object-contain border rounded mt-2"
                    />
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-600">Custom Fields</label>
                <div id="custom-fields">
                  {customFields.map((field, index) => (
                    <InputComponent
                      disabled
                      required
                      key={index}
                      labelName={`customField${index}`}
                      labelInput={`Custom Field ${index + 1}`}
                      type="text"
                      name={`customField${index}`}
                      placeholder="Enter Custom Field"
                      classNameInput="w-full p-2 border rounded mt-2"
                      onChange={(e) =>
                        handleCustomFieldChange(index, e.target.value)
                      }
                      value={field}
                    />
                  ))}
                </div>
                <button
                  disabled
                  onClick={addCustomField}
                  type="button"
                  className="disabled:opacity-80 disabled:bg-gray-400 mt-4 px-10 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                >
                  + Add Field
                </button>
              </div>

              <div className="mt-6">
                <label className="block text-gray-600">Notes</label>
                <textarea
                  name="notes"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Notes"
                  onChange={formik.handleChange}
                  value={formik.values.notes}
                ></textarea>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputComponent
                      labelName="birthdate"
                      labelInput="Birthdate"
                      type="date"
                      name="birthdate"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.birthdate}
                    />
                  </div>
                  <div>
                    <InputComponent
                      labelName="anniversary"
                      labelInput="Anniversary"
                      type="date"
                      name="anniversary"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.anniversary}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-600">Personal Notes</label>
                  <textarea
                    name="personalNotes"
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Enter Personal Notes"
                    onChange={formik.handleChange}
                    value={formik.values.personalNotes}
                  ></textarea>
                </div>
              </div>

              <div className="mt-10 text-end">
          <ButtonComponent
            {...(status)?{}:{disabled:true}}
            value="Submit"
            type="submit"
            label="Save"
            className="disabled:opacity-80 disabled:bg-gray-400 px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
          ></ButtonComponent>
        </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
