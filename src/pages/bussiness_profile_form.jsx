import { useFormik } from 'formik';
import React, { useState } from 'react';
import { InputComponent } from '../components/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/Button';
import { apiPost } from '../services/api';
import * as Yup from "yup";
import {Loader} from "../layouts/Loader"
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
export function Bussiness_profile_from() {
    const [customFields, setCustomFields] = useState([]);
    const [loader,setLoader]=useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [signature, setSignature] = useState(null);
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            businessName:"",
            phone: '',
            email: '',
            pan: '',
            gst: '',
            businessType: '',
            businessCategory: '',
            openingValue: '',
            address: '',
            notes: '',
            birthdate: '',
            anniversary: '',
            personalNotes: '',
            customFields:"",
            logo:"",
        },
        onSubmit: (values) => {
            setLoader(true);
            values.customFields=customFields;
            values.logo=logoPreview!=""?logoPreview:null;
            values.signature=signature!=""?signature:null;
            console.log(logoPreview);
            const addBussinessProfile=async()=>{
                setLoader(true);
                        try{
                            const res=apiPost("/businessprofile",values);
                        // alert(res);
                        }
                        catch(err)
                        {
                            console.log(err);
                        }
                        finally{
                            
                            setTimeout(()=>{
                                setLoader(false);
                                navigate("/display");
                                window.location.reload();
                            },1500)
                        }
            }
            addBussinessProfile();
            // alert(JSON.stringify(values))
            console.log(values);
        },
        validationSchema:Yup.object({
            phone:Yup.string().required("mobile no required").matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
          })
    });

    const addCustomField = () => {
        setCustomFields([...customFields, '']);
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
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e.target.result);
                setLogoPreview(e.target.result);
                localStorage.setItem("image",e.target.result);
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
                localStorage.setItem("imageSign",e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [shipping,setShipping]=useState("");
    function handleCheck(e){
            if(e.target.checked)
            {
                var bill=document.getElementById("bill");
                console.log(bill.value);
                setShipping(bill.value);
            }
            else{
                setShipping("");
            }
    }

    return (
        <>
        {
            loader?(<Loader/>):(
                <div className="bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto bg-white mt-10 p-8 shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-center mb-6">Business Profile</h2>
                <NavLink to="/dashboard" className="text-white text-decoration-none">
                <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
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
                        <div>
                        <InputComponent
                            required
                            labelName="phone"
                            labelInput="Phone No."
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        <span className="text-red-500">{formik.errors.phone}</span>
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
                            required
                            labelName="pan"
                            labelInput="Pan No."
                            type="text"
                            name="pan"
                            placeholder="Enter Pan No."
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.pan}
                        />
                        </div>
                        <div>
                        <InputComponent
                            required
                            labelName="gst"
                            labelInput="GST"
                            type="text"
                            name="gst"
                            placeholder="Enter GST"
                            classNameInput="w-full p-2 border rounded mt-1"
                            onChange={formik.handleChange}
                            value={formik.values.gst}
                        />
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
                            <label className="block text-gray-600">Business Category</label>
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
                        {logoPreview && <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-cover border rounded mt-2" />}
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
                        {signature && <img src={signature} alt="Logo Preview" className="w-24 h-24 object-cover border rounded mt-2" />}
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
                                    onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                                    value={field}
                                />
                            ))}
                        </div>
                        <button disabled onClick={addCustomField} type="button" className="disabled:opacity-80 disabled:bg-gray-400 mt-4 px-10 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]">
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

                    <div className="mt-10 text-center">
                        <button type="submit" className="px-10 md:px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
            )
        }
        </>
    );
}