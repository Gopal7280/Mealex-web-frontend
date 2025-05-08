import React, { useState, useEffect, useRef } from "react";
import { SearchComponent } from "../components/SerachBar";
import { NavLink, useNavigate } from "react-router-dom";
import { apiDelete, apiGet } from "../services/api"; // Import your API service
import { TableComponent } from "../components/Table";
import { Preview, ModeEdit, DeleteForever } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import "../styles/layoutFix.css";
import Sidebar from "../layouts/Sidebar";
import { ConfirmDialog } from "../components/confirmDialog";
import { Toast } from "primereact/toast";
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { update } from "lodash";
import {Loader} from "../layouts/Loader"
export function PaymentOut() {
  const items = Array.from({ length: 5 }, (v, i) => i);
  const [loader,setLoader]=useState(true);
  const [searchTerm, setSearchTerm] = useState(""); //working
  const [statusFilter, setStatusFilter] = useState("unPaid");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paymentIn, setPaymentIn] = useState([]);
  const [fetchPaymentIn, setFetchPaymentIn] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [open, setOpen] = useState(false);
  const [match, setMatch] = useState([]);
  const toast = useRef(null);
  const [totalPurchase, setTotalPurchase] = useState(null);
  
  const navigate = useNavigate();
  const column = [
    "Id",
    "Party Name",
    "Payment method",
    "Remaining Amount",
    "Date"  
  ];
  useEffect(() => {
    setLoader(true); // Ensure loader is visible when the effect runs
    
    const fetchCustomers = async () => {
      try {
        const res = await apiGet("/payment/payment_out");
        console.log(res);
        
        setPaymentIn(res.data);
        const formattedPaymentIn = res.data.map((paymentIn) => ({
          Id: paymentIn.payment_out_id, // Use current date or modify as needed
          partyName: paymentIn.customer_name,
          Method: paymentIn.payment_method,
          RemainingAmount: paymentIn.remaining_amount,
          updateTime: paymentIn.update_at, // Modify as needed
        }));
        
        setPaymentIn(formattedPaymentIn);
        setFetchPaymentIn(res.data);
        
        // Optional: Your previous code for calculating totals can be uncommented if needed
        // var total = 0;
        // var paidd = 0;
        // var unpaidd = 0;
        // for (var i of res) {
        //   total = parseFloat(i.total_amount) + total;
        //   if (i.status == "paid") {
        //     paidd = paidd + 1;
        //   }
        //   if (i.status == "Unpaid") {
        //     unpaidd = unpaidd + 1;
        //   }
        // }
        // setPaid(paidd);
        // setUnpaid(unpaidd);
        // setTotalPurchase(total);
  
      } catch (error) {
        console.error("Error fetching paymentOut data:", error);
        toast.current.show({
          severity: "info",
          summary: "info",
          detail: "Please create payment Out no payment out found",
          life: 1500,
        });
      } finally {
        // Ensure the loader is stopped after data fetching completes
        setLoader(false);
      }
    };
  
    fetchCustomers(); // Call the async function to fetch data
  
  }, []);  // Empty dependency array, effect runs only once after component mounts
  

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClick = (action) => {
    console.log(action); // Handle bulk actions here
    setDropdownOpen(false);
  };

  const filterPaymentIn = () => {
    return paymentIn.filter((paymentIn) => {
      const matchesSearch = paymentIn.partyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        return matchesSearch;
    });
  };

  const handleRowClick = (challan) => {
    setSelectedInvoice(challan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };
  function handlePreview(e, paymentInId, row) {
    console.log(paymentInId);
    for (var i of fetchPaymentIn) {
      if (paymentInId == i.paymentIn_id) {
        //   alert(JSON.stringify(i));
        navigate("/paymentIn-preview", { state: { data: i } });
      }
    }
  }
  function handledelete(e, paymentInId) {
    console.log(paymentInId);
    const deleteInvoice = async () => {
      const res = await apiDelete(`/paymentIns/${paymentInId}`);
      // alert(res);
      window.location.reload();
    };
    deleteInvoice();
  }
  function handleEdit(e, paymentInId) {
    console.log(paymentInId);
    console.log(paymentInId);
    console.log(paymentInId);
    for (var i of fetchPaymentIn) {
      if (paymentInId == i.paymentIn_id) {
        //   alert(JSON.stringify(i));
        navigate("/paymentIn-edit", { state: { data: i } });
      }
    }
  }
  function handleCheckboxClick(e, id) {
    if (e.target.checked) {
      console.log("checked");
      for (var i of fetchPaymentIn) {
        if (id == i.paymentIn_id) {
          // alert(JSON.stringify(i));
          console.log(i);
          const updatedRows = [i];
          setMatch(updatedRows);
          setOpen(true);
        }
      }
    } else {
      console.log("unchecked");
    }
  }
  const handleGenerate = (e) => {
    setOpen(false);
    console.log(match);
    navigate("/generate-paymentIn", { state: { data: match } });
    console.log("generate");
  };
  const handleClose = (e) => {
    setOpen(false);
    console.log("close");
  };

  return (
    <>
    {
      loader?(<div>
      <div className="over bg-gray-100 font-roboto p-2">
          <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <Toast ref={toast} />
          <Skeleton width="10rem" className="mb-2"></Skeleton>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            </div>
              {/* Search + Buttons + Filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
              <Skeleton width="100%" height="50px"></Skeleton>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                  {/* <table className="w-full border-collapse mt-2">
                      <thead>
                          <tr className="bg-gray-200 text-left text-[#2D465B]">
                              <th className="p-3 cursor-pointer">Date</th>
                              <th className="p-3 cursor-pointer">Challan Number</th>
                              <th className="p-3 cursor-pointer">Party Name</th>
                              <th className="p-3 cursor-pointer">Due In</th>
                              <th className="p-3 cursor-pointer">Amount</th>
                              <th className="p-3">Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filterChallan().map((invoice, index) => (
                              <tr key={index} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(invoice)}>
                                  <td className="p-3">{invoice.date}</td>
                                  <td className="p-3">{invoice.challanNumber}</td>
                                  <td className="p-3">{invoice.partyName}</td>
                                  <td className="p-3">{invoice.dueIn}</td>
                                  <td className="p-3">{invoice.amount}</td>
                                  <td className={`p-3 ${invoice.status === 'Open' ? 'text-green-500' : 'text-red-500'}`}>{invoice.status}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table> */}
                    <div className="card">
        <DataTable value={items} className="p-datatable-striped">
            <Column field="code" header="Id" style={{ width: '25%' }} body={<Skeleton />}></Column>
            <Column field="category" header="Party Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
            <Column field="quantity" header="Payment Method" style={{ width: '25%' }} body={<Skeleton />}></Column>
            <Column field="quantity" header="Remaining Amount" style={{ width: '25%' }} body={<Skeleton />}></Column>
            <Column field="quantity" header="Date" style={{ width: '25%' }} body={<Skeleton />}></Column>
        </DataTable>
    </div>
                
              </div>
          </div>

          {/* Modal */}
          {modalOpen && (
              <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg relative">
                      <button onClick={closeModal} className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500">&times;</button>
                      <h3 className="text-xl font-bold mb-4 text-[#2D465B]">Challan Details</h3>
                      <div className="space-y-2 text-[#3A5B76] text-sm">
                          <p><strong>Date:</strong> {selectedInvoice.date}</p>
                          <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
                          <p><strong>Party Name:</strong> {selectedInvoice.partyName}</p>
                          <p><strong>Due In:</strong> {selectedInvoice.dueIn}</p>
                          <p><strong>Amount:</strong> {selectedInvoice.amount}</p>
                          <p><strong>Status:</strong> {selectedInvoice.status}</p>
                      </div>
                  </div>
              </div>
          )}
          
      </div>
      </div>):(
        <div>
      <div className="over bg-gray-100 font-roboto p-2">
        <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <Toast ref={toast} />
          <h2 className="text-xl font-bold text-[#2D465B] mb-4">
            Payment Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          </div>
          {/* Search + Buttons + Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
            <div className="flex gap-2 flex-col md:flex-row items-start md:items-center w-full md:w-auto">
              <form className="relative w-full md:w-72">
                <SearchComponent
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pl-10 rounded-full border-2 border-[#3A5B76]"
                />
              </form>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <div
                className="relative inline-block text-left"
                id="dropdownWrapper"
              >
                <button
                  disabled
                  onClick={toggleDropdown}
                  className="disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B] flex items-center"
                >
                  Bulk Actions
                  <svg
                    className="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a
                        href="#"
                        onClick={() => handleDropdownClick("Bulk Edit")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3A5B76] hover:text-white"
                      >
                        Bulk Edit
                      </a>
                      <a
                        href="#"
                        onClick={() => handleDropdownClick("Bulk Download")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3A5B76] hover:text-white"
                      >
                        Bulk Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <NavLink to="/paymentOutForm">
                <button className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]">
                  Create Payment Out
                </button>
              </NavLink>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* <table className="w-full border-collapse mt-2">
                          <thead>
                              <tr className="bg-gray-200 text-left text-[#2D465B]">
                                  <th className="p-3 cursor-pointer">Date</th>
                                  <th className="p-3 cursor-pointer">Challan Number</th>
                                  <th className="p-3 cursor-pointer">Party Name</th>
                                  <th className="p-3 cursor-pointer">Due In</th>
                                  <th className="p-3 cursor-pointer">Amount</th>
                                  <th className="p-3">Status</th>
                              </tr>
                          </thead>
                          <tbody>
                              {filterChallan().map((paymentIn, index) => (
                                  <tr key={index} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(paymentIn)}>
                                      <td className="p-3">{paymentIn.date}</td>
                                      <td className="p-3">{paymentIn.challanNumber}</td>
                                      <td className="p-3">{paymentIn.partyName}</td>
                                      <td className="p-3">{paymentIn.dueIn}</td>
                                      <td className="p-3">{paymentIn.amount}</td>
                                      <td className={`p-3 ${paymentIn.status === 'Open' ? 'text-green-500' : 'text-red-500'}`}>{paymentIn.status}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table> */}
            <TableComponent
              name="Payment Out"
              column={column}
              data={filterPaymentIn()}
              pageSize={3} // Number of rows per page
              // generate={(row) => (
              //   <div className="flex gap-2">
              //     <button
              //       className="text-red-500"
              //       onClick={(e) => handleCheckboxClick(e, row.paymentInNumber)}
              //     >
              //       <Checkbox color="success" />
              //     </button>
              //   </div>
              // )}
              // actions={(row) => (
              //   <div className="flex gap-2">
              //     <button
              //       className="text-[#3A5B76]"
              //       onClick={(e) => handlePreview(e, row.paymentInNumber, row)}
              //     >
              //       <Preview />
              //     </button>
              //     <button
              //       className="text-[#3A5B76]"
              //       onClick={(e) => handleEdit(e, row.paymentInNumber)}
              //     >
              //       <ModeEdit />
              //     </button>
              //     <button
              //       className="text-red-500"
              //       onClick={(e) => handledelete(e, row.paymentInNumber)}
              //     >
              //       <DeleteForever />
              //     </button>
              //   </div>
              // )}
            />
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-[#2D465B]">
                Challan Details
              </h3>
              <div className="space-y-2 text-[#3A5B76] text-sm">
                <p>
                  <strong>Date:</strong> {selectedInvoice.date}
                </p>
                <p>
                  <strong>Invoice Number:</strong>{" "}
                  {selectedInvoice.paymentInNumber}
                </p>
                <p>
                  <strong>Party Name:</strong> {selectedInvoice.partyName}
                </p>
                <p>
                  <strong>Due In:</strong> {selectedInvoice.dueIn}
                </p>
                <p>
                  <strong>Amount:</strong> {selectedInvoice.amount}
                </p>
                <p>
                  <strong>Status:</strong> {selectedInvoice.status}
                </p>
              </div>
            </div>
          </div>
        )}
        <ConfirmDialog
          text="paymentIn"
          open={open}
          onClick1={handleGenerate}
          onClick={handleClose}
        ></ConfirmDialog>
      </div>
    </div>
      )
    }
    </>
  );
}
