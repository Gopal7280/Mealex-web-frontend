import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../layouts/Sidebar"; // Make sure Sidebar is correctly imported
import InvoiceForm from "./InvoiceForm";
import "../styles/Invoices.css";
import "../styles/customerDisplay.css"; // Import the CSS file
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { debounce } from "lodash";
import { useReactToPrint } from "react-to-print";
import { data } from "jquery";
import { InputComponent } from "../components/Input.jsx";
import { ButtonComponent } from "../components/Button.jsx";
import { apiGet } from "../services/api.js";
import { SearchComponent } from "../components/SerachBar.jsx";
import { Preview, ModeEdit, DeleteForever } from "@mui/icons-material";
import { Toast } from 'primereact/toast';
import { config } from "../config/app.js";
import {Loader} from "../layouts/Loader"

export function Challan() {
  const [loader,setLoader]=useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [challan, setChallan] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const [checked, setChecked] = useState([]); // Changed to an array to hold checked items
  const navigate = useNavigate();
  const contentRef = useRef();
  const toast=useRef();
  const [totalPurchase,setTotalPurchase]=useState(null);

  // function handleModalClick() {
  //   setIsClicked(true);
  // }

  // function closeBtn() {
  //   setIsClicked(false);
  // }

  // const debounceCall = debounce((value) => {
  //   // console.log(value);
  //   setCustomerId(value);
  // }, 500);

  // function customerIdGet(e) {
  //   debounceCall(e.target.value);
  // }
  useEffect(() => {
    try{
    const fetchChallan = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await apiGet("/challan");
        setChallan(res);
        var total = 0;
        for (var i of res) {
          total = parseFloat(i.total_amount) + total;
        }
        setTotalPurchase(total);
        // console.log(res.data[0].challan_date);
      } catch (error) {
        console.log(error);
        toast.current.show({severity:'info', summary: 'info', detail:'Please create challan no challan found', life: 1500});
      }
    };
    fetchChallan();
  }
  catch(err)
  {
    console.log(err)
  }
  finally{
    setTimeout(()=>{
      setLoader(false);
    },700);
  }
    setIsClicked(false);
  }, []);

  const fetchChallanDetail = challan.filter((challan) =>
    `${challan.challan_prefix}`.toLowerCase().includes(search.toLowerCase())
  );

  const deleteCustomer = async (id) => {
    console.log(id);
    alert(id);
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      const response = await fetch(`${config.apiBaseUrl}/customers/${id}`, {
          method: "DELETE",
      });

      if (response.ok) {
        alert("Customer deleted successfully");
        // handleChallanCheck();
      } else {
        alert("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  function handleGenerateChallan(e) {
    if (checked.length > 0) {
      navigate("/generate-invoice", { state: { data: checked } });
    } else {
      navigate("/generate-invoice", { state: { data: challan } });
    }
  }
  function handleCheckbox(e, challan) {
    // console.log(challan);
    alert(JSON.stringify(checked) + "previous value");
    if (e.target.checked) {
      // Add the checked challan to the checked array
      setChecked((prevChecked) => [...prevChecked, challan]);
    } else {
      // Remove the unchecked challan from the checked array
      setChecked((prevChecked) =>
        prevChecked.filter((item) => item.challan_id !== challan.challan_id)
      );
    }
  }
  function handlePreview(e, id) {
    alert(id);
    for (var i of fetchChallanDetail) {
      if (id == i.challan_id) {
        alert(JSON.stringify(i));
        navigate("/challan-preview", { state: { data: i } });
      }
    }
  }
  function handledelete(e, id) {
    console.log("executing");
  }
  function handleEdit(e, id) {
    alert(id);
    for (var i of fetchChallanDetail) {
      if (id == i.challan_id) {
        alert(JSON.stringify(i));
        navigate("/challan-edit", { state: { data: i } });
      }
    }
  }
  return (
    <>
    {
      loader?(<Loader/>):(
        <div>
      <div className="mt-2 header-topper gopal">
        <h1 className="gopa">Challan</h1>
        <Toast ref={toast} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Total Purchase</h3>
                        {totalPurchase && <p className="text-3xl font-bold">₹{totalPurchase.toFixed(2)}</p>}
                    </div>
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Paid</h3>
                        <p className="text-3xl font-bold">350</p>
                    </div>
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Unpaid</h3>
                        <p className="text-3xl font-bold">100</p>
                    </div>
                </div>
        {/* <InputComponent
          type="text"
          placeholder="Search Challan by Id.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classNameInput="search-bar"
        ></InputComponent> */}
        <SearchComponent onChange={(e) => setSearch(e.target.value)} />
        {/* <button
          type="button"
          onClick={handleModalClick}
          className="btn btn-primary"
        >
          Get Challan
        </button> */}
        <ButtonComponent
          label="Generate Challan Invoice"
          value="challanInvoice"
          className="btn btn-warning"
          type="button"
          onClick={handleGenerateChallan}
        ></ButtonComponent>
        <NavLink to="/add-challan">
          <ButtonComponent
            className="btn btn-primary"
            label="Add Challan"
            value="challanAdd"
          ></ButtonComponent>
        </NavLink>
      </div>
      {/* <div>
        <ModalComponent style={{ display: isClicked ? "inline-block" : "none" }}
          model_title="Enter your Customer number:-"
          onClick={closeBtn}
          modal_body={<InputComponent type="text" onChange={customerIdGet} classNameInput="form-control" placeholder="Enter customer id" />}
          modal_footer={<ButtonComponent type="button" className="btn btn-primary" label="Search Challan's" value="challan" onClick={handleChallanCheck}></ButtonComponent>}
        ></ModalComponent>
      </div> */}
      <table className="customer-table gopal">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Select</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchChallanDetail.length > 0 ? (
            fetchChallanDetail.map((challan) => {
              console.log(challan); // Debugging step
              return (
                <tr key={challan.challan_id}>
                  <td>{challan.challan_id}</td>
                  <td>{challan.challan_date}</td>
                  <td>{challan.total_amount}</td>
                  <td></td>
                  <td>
                    <InputComponent
                      id={challan.challan_id}
                      onChange={(e) => handleCheckbox(e, challan)}
                      type="checkbox"
                      classNameInput="form-check-input"
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="text-[#3A5B76]"
                        onClick={(e) => handlePreview(e, challan.challan_id)}
                      >
                        <Preview />
                      </button>
                      <button
                        className="text-[#3A5B76]"
                        onClick={(e) => handleEdit(e, challan.challan_id)}
                      >
                        <ModeEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={(e) => handledelete(e, challan.challan_id)}
                      >
                        <DeleteForever />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Please insert customer mobile no from get challan button
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      )
    }
    </>
  );
}
