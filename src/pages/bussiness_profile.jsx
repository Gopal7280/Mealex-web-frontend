import { useEffect, useState } from "react";
import { Loader } from "../layouts/Loader";
import Sidebar from "../layouts/Sidebar";
import { SearchComponent } from "../components/SerachBar";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components/Button";
import { apiGet, apiPut } from "../services/api";
import { useFormik } from "formik";
import { Preview, ModeEdit, DeleteForever, Close } from "@mui/icons-material";
import { InputComponent } from "../components/Input";
export function Bussiness_profile() {
  const [search, setSearch] = useState(""); // Search state
  const [logoPreview, setLogoPreview] = useState(null);
  const [signature, setSignature] = useState(null);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
    const bussinessProfle = async () => {
      try {
        const res = await apiGet("/businessprofile");
        console.log(res);
        setData(res);
        setLogoPreview(res[0].logo);
        setSignature(res[0].signature_box);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    bussinessProfle();
  }, []);
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
      logo: "",
      signatureBox: "",
    },
    onSubmit: (values) => {
      setLoader(true);
      if (values.name == "") {
        values.name = data[0].name;
      }
      if (values.businessName == "") {
        values.businessName = data[0].business_name;
      }
      if (values.phone == "") {
        values.phone = data[0].mobile_no;
      }
      if (values.email == "") {
        values.email = data[0].business_profile_email;
      }
      if (values.pan == "") {
        values.pan = data[0].pan_no;
      }
      if (values.gst == "") {
        values.gst = data[0].gst;
      }
      if (values.businessType == "") {
        values.businessType = data[0].businesstype;
      }
      if (values.businessCategory == "") {
        values.businessCategory = data[0].businesscategory;
      }
      if (values.openingValue == "") {
        values.openingValue = data[0].opening_value;
      }
      if (values.address == "") {
        values.address = data[0].address;
      }
      if (values.notes == "") {
        values.notes = data[0].notes;
      }
      if (values.personalNotes == "") {
        values.personalNotes = data[0].personalnotes;
      }
      if (values.birthdate == "") {
        values.birthdate = data[0].birthdate;
      }
      if (values.anniversary == "") {
        values.anniversary = data[0].anniversary;
      }
      values.signatureBox = signature;
      values.logo = logoPreview;
      console.log(values);
      const updateBusinessProfile = async () => {
        try {
          const res = await apiPut(`/businessprofile`, values);
          console.log(res);
        } catch (err) {
          console.log(err);
        } finally {
          setLoader(false);
          navigate("/dashboard");
        }
      };
      updateBusinessProfile();
    },
  });
  function handleEdit() {
    console.log("edit");
    setEdit(true);
  }
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        setLogoPreview(e.target.result);
        localStorage.setItem("image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        setSignature(e.target.result);
        localStorage.setItem("imageSign", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="">
          {data.length ? (
            <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
              <h1 className="text-2xl font-bold text-center mb-6">
                Update Details
              </h1>

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
                      onFocus={handleEdit}
                      name="name"
                      placeholder="Name"
                      {...(edit ? {} : { value: data[0].name })}
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="business_name"
                      labelInput="Bussiness Name"
                      type="text"
                      name="businessName"
                      placeholder="Bussiness name"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].business_name })}
                    />
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="phone"
                      labelInput="Phone No."
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].mobile_no })}
                    />
                    <span className="text-red-500">{formik.errors.phone}</span>
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="email"
                      labelInput="Email"
                      type="email"
                      name="email"
                      placeholder="Enter Email Id"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit
                        ? {}
                        : { value: data[0].business_profile_email })}
                    />
                  </div>
                  <div>
                    <InputComponent
                      required
                      onFocus={handleEdit}
                      labelName="pan"
                      labelInput="Pan No."
                      type="text"
                      name="pan"
                      placeholder="Enter Pan No."
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].pan_no })}
                    />
                  </div>
                  <div>
                    <InputComponent
                      onFocus={handleEdit}
                      labelName="gst"
                      labelInput="GST"
                      type="text"
                      name="gst"
                      placeholder="Enter GST"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].gst })}
                    />
                  </div>
                  <div>
                    <div>
                      <InputComponent
                        required
                        onFocus={handleEdit}
                        labelName="Business Type"
                        labelInput="Business Type"
                        type="text"
                        name="businessType"
                        placeholder="Enter business type"
                        classNameInput="w-full p-2 border rounded mt-1"
                        onChange={formik.handleChange}
                        {...(edit ? {} : { value: data[0].businesstype })}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputComponent
                        onFocus={handleEdit}
                        required
                        labelName="businessCategory"
                        labelInput="Business Category"
                        type="text"
                        name="businessCategory"
                        placeholder="Enter Business category"
                        classNameInput="w-full p-2 border rounded mt-1"
                        onChange={formik.handleChange}
                        {...(edit ? {} : { value: data[0].businesscategory })}
                      />
                    </div>
                  </div>
                  <div>
                    <InputComponent
                      onFocus={handleEdit}
                      labelName="openingValue"
                      labelInput="Opening Value"
                      type="number"
                      min="0"
                      name="openingValue"
                      placeholder="Enter Opening Value"
                      classNameInput="w-full p-2 border rounded mt-1"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].opening_value })}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-gray-600">Address</label>
                  <textarea
                    onFocus={handleEdit}
                    name="address"
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Enter Address"
                    onChange={formik.handleChange}
                    {...(edit ? {} : { value: data[0].address })}
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
                        className="w-24 h-24 object-cover border rounded mt-2"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-gray-600">
                    Signature Upload
                  </label>
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
                        className="w-24 h-24 object-cover border rounded mt-2"
                      />
                    )}
                  </div>
                </div>
                {/* <div className="mt-6">
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
                                               onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                                               value={field}
                                           />
                                       ))}
                                   </div>
                                   <button disabled onClick={addCustomField} type="button" className="disabled:opacity-80 disabled:bg-gray-400 mt-4 px-10 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]">
                                       + Add Field
                                   </button>
                               </div> */}

                <div className="mt-6">
                  <label className="block text-gray-600">Notes</label>
                  <textarea
                    name="notes"
                    onFocus={handleEdit}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Enter Notes"
                    onChange={formik.handleChange}
                    {...(edit ? {} : { value: data[0].notes })}
                  ></textarea>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <InputComponent
                        onFocus={handleEdit}
                        labelName="birthdate"
                        labelInput="Birthdate"
                        type="text"
                        name="birthdate"
                        classNameInput="w-full p-2 border rounded mt-1"
                        onChange={formik.handleChange}
                        value={data[0].birthdate}
                      />
                    </div>
                    <div>
                      <InputComponent
                        onFocus={handleEdit}
                        labelName="anniversary"
                        labelInput="Anniversary"
                        type="text"
                        name="anniversary"
                        classNameInput="w-full p-2 border rounded mt-1"
                        onChange={formik.handleChange}
                        value={data[0].anniversary}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-600">
                      Personal Notes
                    </label>
                    <textarea
                      name="personalNotes"
                      className="w-full p-2 border rounded mt-1"
                      placeholder="Enter Personal Notes"
                      onChange={formik.handleChange}
                      {...(edit ? {} : { value: data[0].personalnotes })}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <button
                    type="submit"
                    className="px-10 md:px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </>
  );
}
