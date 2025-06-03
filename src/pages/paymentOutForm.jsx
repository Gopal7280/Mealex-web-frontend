import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, useFormik } from "formik";
import { debounce } from "lodash";
import "../styles/layoutFix.css"
import { Dropdown } from 'primereact/dropdown';
import Sidebar from '../layouts/Sidebar';
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { Toast } from 'primereact/toast';
import { Loader } from "../layouts/Loader";
import { Calendar } from 'primereact/calendar';
import {
  apiReuestLoadCountry,
  apiReuestLoadDataUsingZipCode,
  apiReuestLoadState,
} from "../services/apiServicesOnline";
import axios from "axios";
import { InputComponent } from "../components/Input";
import { ButtonComponent } from "../components/Button";
import { apiGet, apiPost } from "../services/api";
import * as yup from "yup";
export function PaymentOutForm() {
  const [loader,setLoader]=useState(false);
  const [party, setParty] = useState("");
  const toast = useRef(null);
  const [locations,setLocationS]=useState("")
  const location=useLocation();
  useEffect(() => {
     const fetchBussiness = async () => {
              try {
                const res = await apiGet('/businessprofile');
                if (res.length === 0) {
                  navigate('/profile_form');
                }
              } catch (err) {
                console.log("working");
                console.log(err);
              }
            };
            fetchBussiness();
    console.log(location.state?.data);
    setLocationS(location.state?.data);
  }, []);

  const navigate = useNavigate();
  const [state, setState] = useState([{}]);
  const [payment_type, setPayment_type] = useState("");
  const [customField, setCustomField] = useState([""]);
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState(null);
  const [companyName,setCompanyName]=useState(null);
  const [moreData,setMoreData]=useState([]);
  const [purchaseId,setPurchaseId]=useState([]);
  const [purchasePre,setPurchasePre]=useState([]);
  const [selectedPurchaseId,setSelectedPurchaseId]=useState(null);
  const [purchaseTotal,setPurchaseTotal]=useState();
  const [total,setTotal]=useState(0);
  const [recieptNoPrefix,setRecieptNoPrefix]=useState("");
  useEffect(()=>{
    try{
        const fetchCustomer=async ()=>{
            const res=await apiGet("/customers");
            console.log(res);
            const companyNamee = res.map(item=>({
                name:`${item.customer_name}_${item.customer_email}_${item.customer_phone}`
            }))
            const paymentType=[
                {name:"CASH"},{name:"CHEQUE"},{name:"ONLINE"},{name:"BANK"},{name:"TDS"},{name:"Bad Debts / Kasar"}]
            setCompanyName(companyNamee);
            setPaymentTypes(paymentType)
        }
        fetchCustomer();
        const prefixGet =async ()=>{
          const res=await apiGet("/payment/payment_out/prefix");
          console.log(res);
          setRecieptNoPrefix(res.payment_out_prefix);
        }
        prefixGet();
    }
    catch(err)
    {
        console.log(err);
    }
  },[])

  const formik = useFormik({
    initialValues: {
        paymentPrefix:"",
        companyName:"",
        paymentDate:"",
        paymentType:"",
        paidAmount:"",
        purchaseId:"",
        purchasePrefix:"",
        totalAmount:"",
        referenceNo:""
    },
    onSubmit: (values) => {
      values.totalAmount=total=="null"?0:total;
      values.paymentPrefix=recieptNoPrefix;
      values.purchaseId=purchasePre;
      values.purchasePrefix=purchaseId;
      values.paymentType=selectedPaymentType;
      values.companyName=selectedCompanyName;
      values.paymentDate=date;
      console.log(values);
      const addPayment = async () => {
        setLoader(true);
        try {
          const res = await apiPost("/payment/payment_out", values);
          console.log(res);
          navigate("/paymentOut");
        } catch (err) {
          console.error("Payment Out Error:", err);
        } finally {
          setLoader(false);
        }
      };
      
      addPayment();
      
    },
  });

  function handlePartyChange(e) {
    setParty(e);
  }
  function handleCustomField() {
    setCustomField((prevCustomField) => [...prevCustomField,""]);
  }
  function handleCustomFieldChange(index, value) {
    const updatedFields = [...customField];
    updatedFields[index] = value;
    setCustomField(updatedFields);
  }
  function handleCompanyChange(e,name){
    setSelectedCompanyName(name);
    var spl=(name.name).split("_");
    console.log(spl[0].trim());
    try{
            const fetchOtherDetails=async ()=>{
                    const res=await apiGet("/customers");
                    for(var i of res)
                    {
                        if(i.customer_name==spl[0])
                            {
                                    setMoreData(i);
                                    const res=await apiGet(`/purchase/getallpurchase/${i.customer_id}`)
                                    const PurchaseId = res.data.map(item=>({
                                      name:`${item.purchase_prefix}`,
                                      id:`${item.purchase_id}`
                                  }))
                                  const PurchaseTotal = res.data.map(item=>({
                                    totalAmount:`${item.purchase_payment_remaining}`,
                                    purchaseId:`${item.purchase_prefix}`,
                                }))
                                    console.log(res.data);
                                    setPurchaseTotal(PurchaseTotal);
                                    setSelectedPurchaseId(PurchaseId);
                                    console.log("executed");
                            }
                    }
            }
            fetchOtherDetails();
    }
    catch(err){
        console.log(err);
    }
  }
  function handlePaymentType(e,name){
    setSelectedPaymentType(name.name);
  }
  function handlePurchaseChange(e,name){
    console.log(name);
    setPurchaseId(name.name);
    setPurchasePre(name.id);
    for(var i of purchaseTotal)
    {
      if(i.purchaseId==name.name)
      {
        console.log(i.totalAmount)
        setTotal(i.totalAmount);
      }
    }
  }
  return (
    <div>
    <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Payment Out
      </h1>

        <NavLink to="/paymentOut" className="text-white text-decoration-none">
        <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
            />
        </NavLink>
      <form id="paymentOutForm" onSubmit={formik.handleSubmit}>
        <div className="">
          <div>
          <Toast ref={toast} />
            <div>
              <InputComponent
                htmlFor="receiptNo"
                classNameLabel="block text-gray-600"
                labelInput="Receipt No:"
                type="text"
                value={recieptNoPrefix}
                name="paymentPrefix"
                onChange={formik.handleChange}
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder=""
              />
              {/* <span>{formik.errors.customer_name}</span> */}
            </div>
            <label htmlFor="companyName" className="block text-gray-600 mt-4">Company Name:</label>
            <div className="">
            <Dropdown  onChange={(e)=>handleCompanyChange(e,e.value)} value={selectedCompanyName} options={companyName} optionLabel="name" 
                editable placeholder="Select a Company name" className="w-full mt-1 md:w-14rem" />
        </div>
        <div>
          <div><label htmlFor="purchaseId" className="block text-gray-600 mt-4">Purchase Id:</label></div>
        <Dropdown  onChange={(e)=>handlePurchaseChange(e,e.value)}  value={purchaseId} options={selectedPurchaseId} optionLabel="name" 
                editable placeholder="Select a Purchase id" className="w-full mt-1 md:w-14rem" />
        </div>
        <div>
        <InputComponent
                htmlFor="amount"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Total Amount :"
                type="number"
                id="amount"
                value={total}
                onChange={formik.handleChange}
                name="totalAmount"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter your amount"
                readOnly
              />
        </div>
        <div>
        <InputComponent
                htmlFor="amount"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Paid Amount :"
                type="number"
                min="0"
                id="amount"
                onChange={formik.handleChange}
                name="paidAmount"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter your amount"
                required
              />
        </div>
            <div>
              <label htmlFor="date" className="block text-gray-600 mt-4">Payment Date</label>
              <div>
            <Calendar placeholder="mm-dd-yyy" className="mt-1" value={date} onChange={(e) => setDate(e.value)} />
              </div>
              </div>
              <div>
            <label htmlFor="paymentType" className="block text-gray-600 mt-4">Payment Type:</label>
            <Dropdown  onChange={(e)=>handlePaymentType(e,e.value)} value={selectedPaymentType} options={paymentTypes} optionLabel="name" 
                editable placeholder="Select Payment type" className="w-full mt-1 md:w-14rem" /> 
                </div>
                <div>
        <InputComponent
                htmlFor="referenceNo"
                classNameLabel="block text-gray-600 mt-4"
                labelInput="Reference No :"
                type="text"
                id="referenceNo"
                onChange={formik.handleChange}
                name="referenceNo"
                classNameInput="w-full p-2 border rounded mt-1"
                placeholder="Enter Reference No"
                
              />
        </div>
              {/* <span>{formik.errors.opening_value}</span> */}
          </div>
        </div>
        <div className="mt-10 text-end">
          <ButtonComponent
            value="Submit"
            type="submit"
            label="Save"
            className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
          ></ButtonComponent>
        </div>
      </form>
    </div>
    </div>
  );
}
