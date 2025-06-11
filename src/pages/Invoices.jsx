// Description: This file contains the Invoices component which displays a list of invoices with search, filter, and action functionalities.
//// It includes features like viewing, editing, deleting invoices, and generating new invoices from selected ones.
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
import { Loader } from "../layouts/Loader";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const Invoices = ({ onLoad }) => {
  const [loader, setLoader] = useState(true); // Initialize loader state to true
  const [searchTerm, setSearchTerm] = useState(""); //working
  const [statusFilter, setStatusFilter] = useState("unPaid"); // Default filter to show unpaid invoices
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility 
  const [invoice, setInvoice] = useState([]); // State to hold invoice data
  const [fetchInvoice, setFetchInvoice] = useState([]); // State to hold fetched invoice data
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to hold the selected invoice for modal display
  const [open, setOpen] = useState(false);// State to manage the open state of the generate invoice modal
  const [match, setMatch] = useState([]); // State to hold matched invoice data for generation
  const toast = useRef(null); // Reference for toast notifications
  const [paid, setPaid] = useState(null); // State to hold the count of paid invoices
  const [unPaid, setUnpaid] = useState(null); // State to hold the count of unpaid invoices
  const [totalPurchase, setTotalPurchase] = useState(null); // State to hold the total purchase amount
  const navigate = useNavigate(); // Hook to navigate programmatically
  const items = Array.from({ length: 5 }, (v, i) => i); // Generate an array of 5 items for the skeleton loader 
  const column = [
    "Date",
    "Invoice Number",
    "Party Name",
    "Due In",
    "Amount",
    "Status",
  ]; // Define the columns for the invoice table
  useEffect(() => {
    setLoader(true); // Setting loader to true at the beginning
    try {
      // Function to check if business profile exists
      // If not, redirect to profile form
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
      const fetchCustomers = async () => {
        try {
          const res = await apiGet("/invoices");
          console.log(res);
          const formattedInvoices = res.map((invoice) => ({
            date: invoice.sales_invoice_date,
            invoiceNumber: invoice.invoice_prefix,
            partyName: invoice.customername,
            dueIn: invoice.due_date,
            amount: invoice.total_amount,
            status: invoice.status,
          }));
          setInvoice(formattedInvoices);
          setFetchInvoice(res);
          let total = 0,
            paidd = 0,
            unpaidd = 0;
          res.forEach((i) => {
            total += parseFloat(i.total_amount);
            if (i.status === "paid") paidd++;
            if (i.status === "unpaid") unpaidd++;
          });
          setPaid(paidd);
          setUnpaid(unpaidd);
          setTotalPurchase(total);
        } catch (error) {
          console.error("Error fetching invoice data:", error);
          toast.current.show({
            severity: "info",
            summary: "info",
            detail: "Please create invoice, no invoice found",
            life: 1500,
          });
        } finally {
          setLoader(false); // Hide loader when data is fetched or an error occurs
        }
      };

      fetchCustomers();
    } catch (err) {
      console.log(err);
      setLoader(false); // Hide loader if error occurs outside of async function
    }
  }, []);
  
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  }; // Toggle dropdown visibility
  // Function to handle dropdown click actions
  const handleDropdownClick = (action) => {
    console.log(action); // Handle bulk actions here
    setDropdownOpen(false);
  };
  // Function to filter invoices based on search term and status
  const filterInvoice = () => {
    return invoice.filter((invoice) => {
      const matchesSearch = `${invoice.partyName} ${invoice.invoiceNumber}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        invoice.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  };

  const handleRowClick = (challan) => {
    setSelectedInvoice(challan);
    setModalOpen(true);
  };
  // Function to close the modal and reset selected invoice 
  const closeModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };
  function handlePreview(e, invoiceId, row) {
    console.log(invoiceId);
    console.log(row);
    for (var i of fetchInvoice) {
      if (invoiceId == i.invoice_prefix) {
        //   alert(JSON.stringify(invoiceId));
        navigate("/invoice-preview", { state: { data: i } });
      }
    }
  }
  
  function handleEdit(e, invoiceId) {
    console.log(invoiceId);
    console.log(invoiceId);
    console.log(invoiceId);
    for (var i of fetchInvoice) {
      if (invoiceId == i.invoice_prefix) {
        //   alert(JSON.stringify(invoiceId));
        navigate("/invoice-edit", { state: { data: i } });
      }
    }
  }
  // Function to handle checkbox click for generating invoice
  function handleCheckboxClick(e, id) {
    if (!e.target.checked) {
      console.log("checked");
      for (var i of fetchInvoice) {
        if (id == i.invoice_prefix) {
          // alert(JSON.stringify(id));
          console.log(i);
          const updatedRows = [i];
          setMatch(updatedRows);
          setOpen(true);
          navigate("/generate-invoice", { state: { data: updatedRows } });
        }
      }
    } else {
      console.log("unchecked");
    }
  }
  const handleGenerate = (e) => {
    setOpen(false);
    console.log(match);
    navigate("/generate-invoice", { state: { data: match } });
    console.log("generate");
  };
  const handleClose = (e) => {
    setOpen(false);
    console.log("close");
  };
  function handleClick(e,row) {
    console.log("clicked");
    console.log(row);
    handleCheckboxClick(e,row.invoiceNumber);
  }

  return (
    <>
      {loader ? (
        //This is a Skeleton loader that displays while the data is being fetched 
        <div>
          <div className="over bg-gray-100 font-roboto p-2">
            <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
              <Toast ref={toast} />
              <Skeleton width="10rem" className="mb-2"></Skeleton>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Skeleton width="100%" height="150px"></Skeleton>
                <Skeleton width="100%" height="150px"></Skeleton>
                <Skeleton width="100%" height="150px"></Skeleton>
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
                    <Column
                      field="code"
                      header="Date"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column>
                    <Column
                      field="name"
                      header="Invoice Number"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column>
                    <Column
                      field="category"
                      header="Party Name"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column>
                    <Column
                      field="quantity"
                      header="Due In"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column>
                    <Column
                      field="quantity"
                      header="Amount"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column>
                    <Column
                      field="quantity"
                      header="Status"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column>
                    {/* <Column
                      field="quantity"
                      header="Generate-Invoice"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column> */}
                    {/* <Column
                      field="quantity"
                      header="Action"
                      style={{ width: "25%" }}
                      body={<Skeleton />}
                    ></Column> */}
                  </DataTable>
                </div>
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
                      {selectedInvoice.invoiceNumber}
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
          </div>
        </div>
      ) : (
        <div>
          <div className="over bg-gray-100 font-roboto p-2">
            <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
              <Toast ref={toast} />
              <h2 className="text-xl font-bold text-[#2D465B] mb-4">
                Invoice's
              </h2>
              {/* // Display total purchase, paid, and unpaid counts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                  <h3 className="text-lg font-semibold">Total Purchase</h3>
                  {totalPurchase && (
                    <p className="text-3xl font-bold">
                      ₹{totalPurchase.toFixed(2)}
                    </p>
                  )}
                </div>
                <button
                  value="unpaid"
                  className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white"
                  onClick={(e) => setStatusFilter("paid")}
                >
                  <div className="text-start">
                    <h3 className="text-lg font-semibold">Paid</h3>
                    {paid?(<p className="text-3xl font-bold">{paid}</p>):<p className="text-3xl font-bold">{paid}</p>}
                  </div>
                </button>
                <button
                  className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white"
                  onClick={(e) => setStatusFilter("unpaid")}
                >
                  <div className="text-start">
                    <h3 className="text-lg font-semibold">Unpaid</h3>
                    {unPaid && <p className="text-3xl font-bold">{unPaid}</p>}
                  </div>
                </button>
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
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-[#3A5B76] rounded-md transition-colors duration-200"
                  >
                    <option value="unpaid">Show unpaid Invoices</option>
                    <option value="paid">Show paid Invoices</option>
                    <option value="all">Show All Invoices</option>
                  </select>
                </div>

                <div className="sm:flex flex-wrap gap-3 justify-end block">
                  <div
                    className="relative inline-block text-left mr-1"
                    id="dropdownWrapper"
                  >
                    <button
                      disabled
                      onClick={toggleDropdown}
                      className="sm:mt-0 mt-1 disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B] flex items-center"
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
                  {/* // This button is used to navigate to the add invoice page   */}
                  <NavLink to="/add-invoice">
                    <button className="bg-[#3A5B76] sm:mt-0 mt-1 text-white px-4 py-2 rounded hover:bg-[#2D465B]">
                      Create Invoice
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
                      {/* // This is the main table component that displays the invoice data   */}
                <TableComponent
                  onClickRow={handleClick}
                  name="Invoice"
                  column={column}
                  data={filterInvoice()}
                  pageSize={5} // Number of rows per page
                  // actions={(row) => (
                  //   <div className="text-center">
                  //     {/* <button
                  //       className="text-[#3A5B76]"
                  //       onClick={(e) =>
                  //         handlePreview(e, row.invoiceNumber, row)
                  //       }
                  //     >
                  //       <Preview />
                  //     </button> */}
                  //     {/* <button
                  //       className="text-[#3A5B76]"
                  //       onClick={(e) => handleEdit(e, row.invoiceNumber)}
                  //     >
                  //       <ModeEdit />
                  //     </button> */}
                  //     <button
                  //       className="text-red-500"
                  //       onClick={(e) => handledelete(e, row.invoiceNumber)}
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
                      {selectedInvoice.invoiceNumber}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Invoices;
