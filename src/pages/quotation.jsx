import React, { useState, useEffect, useRef } from 'react';
import { SearchComponent } from '../components/SerachBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { TableComponent } from '../components/Table';
import { Preview, ModeEdit, DeleteForever } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { ConfirmDialog } from '../components/confirmDialog';
import { apiDelete, apiGet } from '../services/api';
import Sidebar from '../layouts/Sidebar';
import { Toast } from 'primereact/toast';
import {Loader} from "../layouts/Loader"
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const QuotationTable = () => {
    const items = Array.from({ length: 5 }, (v, i) => i);
    const [loader,setLoader]=useState(true);
    const [searchTerm, setSearchTerm] = useState('');
         const [statusFilter, setStatusFilter] = useState('open');
        const [fetchQuotation,setFetchQuotation]=useState([]);
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [quotation, setQuotation] = useState([]);
        const [modalOpen, setModalOpen] = useState(false);
         const [open, setOpen] = useState(false);
         const toast=useRef();
              const [match,setMatch]=useState([]);
        const [selectedInvoice, setSelectedInvoice] = useState(null);
        const navigate=useNavigate();
        const [totalPurchase,setTotalPurchase]=useState(null);
        const [statusOpen,setStatusOpen]=useState(null);
        const [statusClose,setStatusClose]=useState(null);
        const column=["Date","Quotation Number","Party Name","Due In","Amount","Status"];
        useEffect(() => {
            const fetchQuotations = async () => {
                setLoader(true); // Show the loader when the data fetching starts
        
                try {
                    const res = await apiGet("/quotation");
                    console.log(res);
                    if (res && res.length > 0) {
                        const formattedQuotation = res.map((quotation) => ({
                            date: quotation.sales_quotation_date, 
                            quotationNumber: quotation.quotation_prefix,
                            partyName: quotation.customername,
                            dueIn: quotation.due_date, 
                            amount: quotation.total_amount, 
                            status: quotation.status 
                        }));
                        
                        let total = 0;
                        let openStatusCount = 0;
                        let closeStatusCount = 0;
        
                        res.forEach((quotation) => {
                            total += parseFloat(quotation.total_amount);
                            if (quotation.status === "close") closeStatusCount++;
                            if (quotation.status === "open") openStatusCount++;
                        });
        
                        setFetchQuotation(res);
                        setQuotation(formattedQuotation);
                        setTotalPurchase(total.toFixed(2));
                        setStatusOpen(openStatusCount);
                        setStatusClose(closeStatusCount);
                    } else {
                        toast.current.show({
                            severity: "info",
                            summary: "Info",
                            detail: "No quotations found. Please create some.",
                            life: 1500
                        });
                    }
                } catch (error) {
                    console.error("Error fetching quotations:", error);
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "There was an issue fetching quotations.",
                        life: 1500
                    });
                } finally {
                    setLoader(false); // Hide the loader once the data is fetched or error occurs
                }
            };
        
            fetchQuotations();
        }, []);  // Empty dependency array ensures this effect runs only once after the component mounts
        
        const toggleDropdown = (event) => {
            event.stopPropagation();
            setDropdownOpen(!dropdownOpen);
        };
    
        const handleDropdownClick = (action) => {
            console.log(action); // Handle bulk actions here
            setDropdownOpen(false);
        };
    
        const filterQuotation = () => {
            return quotation.filter(quotation => {
                const matchesSearch = `${quotation.partyName} ${quotation.quotationNumber} ${quotation.amount}`.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || quotation.status.toLowerCase() === statusFilter.toLowerCase();
                return matchesSearch && matchesStatus;
            });
        };
    
        const handleRowClick = (quotation) => {
            setSelectedInvoice(quotation);
            setModalOpen(true);
        };
    
        const closeModal = () => {
            setModalOpen(false);
            setSelectedInvoice(null);
        };
        function handlePreview(e,quotationId,row){
                console.log(quotationId);
            for(var i of fetchQuotation)
                {
                    console.log(i.quotation_id);
                  if(quotationId==i.quotation_prefix)
                  {
                    // alert(JSON.stringify(i));
                    navigate("/quotation-preview",{state:{data:i}})
                  }
                }
                // handleRowClick(row);
        }
        // function handledelete(e,quotationId){
        //         console.log(quotationId);
        //         const deleteQuotation=async ()=>{
        //             const res=await apiDelete(`/quotation/${quotationId}`);
                    
        //             window.location.reload();
        //         }
        //         deleteQuotation();
        // }

        function handledelete(e,quotationId){
            console.log(quotationId);
            const ans=confirm("Are you sure want to delete Quotation");
            console.log(ans);
            if(ans==true)
            {
                var id="";
                for(var i of fetchQuotation)
                  {
                      
                    if(quotationId==i.quotation_prefix)
                    {
                    //   alert(JSON.stringify(quotationId));
                      id=i.quotation_id;
                    }
                  }
                //   alert(id);
                  const deleteInvoice=async ()=>{
                      const res=await apiDelete(`/quotation/${id}`);
                    //   alert(res);
                      window.location.reload();
                  }
                  deleteInvoice();
            }
            else{
                alert("Quotation not deleted")
            }
        }

        function handleEdit(e,quotationId){
            console.log(quotationId);
        for(var i of fetchQuotation)
            {
                console.log(i.quotationId);
              if(quotationId==i.quotation_prefix)
              {
                // alert(JSON.stringify(i));
                navigate("/quotation-edit",{state:{data:i}})
              }
            }
        }
        function handleCheckboxClick(e,id)
    {
        if(!e.target.checked){
            console.log("checked");
            for(var i of fetchQuotation)
                {
                    
                  if(id==i.quotation_prefix)
                  {
                    // alert(JSON.stringify(i));
                    console.log(i);
                    const updatedRows=[i];
                    setMatch(updatedRows);
                    navigate("/generate-quotation",{state:{data:updatedRows}});
                    setOpen(true);
                  }
                }
        }
        else{
            console.log("unchecked");
        }
    }
    const handleGenerate=(e)=>{
        setOpen(false);
        console.log(match);
        navigate("/generate-quotation",{state:{data:match}});
        console.log("generate");
      }
      const handleClose = (e) => {
        setOpen(false);
        console.log("close");
        
      };
      function handleClick(e,row) {
        console.log("clicked");
        console.log(row);
        handleCheckboxClick(e,row.quotationNumber);
      }
    
        return (
          <>
          {
            loader?(<div>
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
                    <Column field="code" header="Date" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="name" header="Quotation Number" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="category" header="Party Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Due In" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Amount" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Status" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Generate-Quotation" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Actions" style={{ width: '25%' }} body={<Skeleton />}></Column>
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
            <div className="over bg-gray-100 font-roboto p-3">
            <Toast ref={toast} />
                <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold text-[#2D465B] mb-4">Quotation/estimates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Total Estimates Price</h3>
                        {totalPurchase && <p className="text-3xl font-bold">₹{totalPurchase}</p>}
                    </div>
                    <button
                  className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white"
                  onClick={(e) => setStatusFilter("Open")}
                >
                  <div className="text-start">
                    <h3 className="text-lg font-semibold">Open</h3>
                     <p className="text-3xl font-bold">{statusOpen}</p>
                  </div>
                </button>
                        <button
                  className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white"
                  onClick={(e) => setStatusFilter("Close")}
                >
                  <div className="text-start">
                    <h3 className="text-lg font-semibold">Close</h3>
                    <p className="text-3xl font-bold">{statusClose}</p>
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
                                <option value="Open">Show Open Quotation</option>
                            <option value="Close">Show Closed Quotation</option>
                            <option value="all">Show All Quotation</option>
                            </select>
                        </div>
    
                        <div className="flex flex-wrap gap-3 justify-end">
                            <div className="relative inline-block text-left" id="dropdownWrapper">
                                <button disabled onClick={toggleDropdown} className="disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B] flex items-center">
                                    Bulk Actions
                                    <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            <a href="#" onClick={() => handleDropdownClick('Bulk Edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3A5B76] hover:text-white">Bulk Edit</a>
                                            <a href="#" onClick={() => handleDropdownClick('Bulk Download')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3A5B76] hover:text-white">Bulk Download</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <NavLink to="/add-quotation">
                                <button className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]">
                                    Create Quotation
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
                         <TableComponent
                         onClickRow={handleClick}
                                name="Quotation"
                          column={column}
                          data={filterQuotation()}
                          pageSize={3} // Number of rows per page
                        //   generate={(row)=>(
                        //                               <div className="flex gap-2">
                        //                                   <button className="text-red-500" onClick={(e)=>handleCheckboxClick(e,row.quotationNumber)}><Checkbox  color="success" /></button>
                        //                               </div>
                        //                             )}
                          actions={(row) => (
                            <div className="text-center">
                                {/* flex gap-2 */}
                              {/* <button className="text-[#3A5B76]" onClick={(e)=>handlePreview(e,row.quotationNumber,row)}><Preview/></button>
                              <button className="text-[#3A5B76]" onClick={(e)=>handleEdit(e,row.quotationNumber)}><ModeEdit/></button> */}
                              <button className="text-red-500" onClick={(e) =>handledelete(e,row.quotationNumber)}><DeleteForever/></button>
                            </div>
                          )}
                        />
                        
                    </div>
                </div>
    
                {/* Modal */}
                {/* {modalOpen && (
                    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg relative">
                            <button onClick={closeModal} className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500">&times;</button>
                            <h3 className="text-xl font-bold mb-4 text-[#2D465B]">Quotation Details</h3>
                            <div className="space-y-2 text-[#3A5B76] text-sm">
                                <p><strong>Date:</strong> {selectedInvoice.date}</p>
                                <p><strong>Quotation Number:</strong> {selectedInvoice.quotationNumber}</p>
                                <p><strong>Party Name:</strong> {selectedInvoice.partyName}</p>
                                <p><strong>Due In:</strong> {selectedInvoice.dueIn}</p>
                                <p><strong>Amount:</strong> {selectedInvoice.amount}</p>
                                <p><strong>Status:</strong> {selectedInvoice.status}</p>
                            </div>
                        </div>
                    </div>
                )} */}
                <ConfirmDialog text="quotation" open={open} onClick1={handleGenerate} onClick={handleClose}></ConfirmDialog>
            </div>
            </div>
            )
          }
          </>
        );
};

export default QuotationTable;