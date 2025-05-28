import React, { useState, useEffect, useRef } from 'react';
import { SearchComponent } from '../components/SerachBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiDelete, apiGet } from '../services/api'; // Import your API service
import { TableComponent } from '../components/Table';
import Sidebar from '../layouts/Sidebar';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { Toast } from 'primereact/toast';
import { Preview, ModeEdit, DeleteForever } from '@mui/icons-material';
import { ConfirmDialog } from '../components/confirmDialog';
import { data } from 'jquery';
import { Loader } from "../layouts/Loader";
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const DeliveryChallanTable = () => {
    const items = Array.from({ length: 5 }, (v, i) => i);
    const [open, setOpen] = useState(false);
    const [loader,setLoader]=useState(true);
    const [searchTerm, setSearchTerm] = useState(''); //working
    const [statusFilter, setStatusFilter] = useState('open');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [challan, setChallan] = useState([]);
    const [fetchChallan,setFetchChallan]=useState([]);
    const toast=useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const navigate=useNavigate();
    const [totalPurchase,setTotalPurchase]=useState(null);
    const [statusOpen,setStatusOpen]=useState(null);
    const [statusClose,setStatusClose]=useState(null);
    const column=["Date","Challan Number","Party Name","Due In","Amount","Status"];
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await apiGet("/challan");
                console.log(res);
                const formattedInvoices = res.map(challan => ({
                    date: challan.sales_challan_date, 
                    challanNumber: challan.challan_prefix,
                    partyName: challan.customername,
                    dueIn: challan.due_date,
                    amount: challan.total_amount,
                    status: challan.status 
                }));
                setChallan(formattedInvoices);
                setFetchChallan(res);
                let total = 0;
                let openS = 0;
                let closeS = 0;
                for (let i of res) {
                    total = parseFloat(i.total_amount) + total;
                    if (i.status === "close") {
                        closeS = closeS + 1;
                    }
                    if (i.status === "open") {
                        openS = openS + 1;
                    }
                }
                setStatusOpen(openS);
                setStatusClose(closeS);
                setTotalPurchase(total);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoader(false);  // Hide the loader once data fetching is complete
            }
        };
    
        fetchCustomers();
    }, []);  // Runs only once when the component mounts
    

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(!dropdownOpen);
    };

    const handleDropdownClick = (action) => {
        console.log(action); // Handle bulk actions here
        setDropdownOpen(false);
    };
            // hi
    const filterChallan = () => {
        return challan.filter(challan => {
            const matchesSearch = `${challan.partyName} ${challan.challanNumber} ${challan.amount}`.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || challan.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
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
    function handlePreview(e,challanId,row){
            console.log(challanId);
            for(var i of fetchChallan)
                {
                    console.log(i.challan_prefix);
                  if(challanId==i.challan_prefix)
                  {
                    // alert(JSON.stringify(i));
                    navigate("/challan-preview",{state:{data:i}})
                  }
                }
    }
    // function handledelete(e,challanId){
    //     console.log(challanId);
    //     const deleteChallan=async ()=>{
    //         const res=await apiDelete(`/challan/${challanId}`);
    //         alert(res);
    //         window.location.reload();
    //     }
    //     deleteChallan();
    // }

    function handledelete(e, challanPrefix) {
        console.log(challanPrefix);
        const ans=confirm("Are you sure want to delete Challan");
        console.log(ans);
        if(ans==true)
        {
           let id = "";
        // Find the corresponding challan ID
        for (let i of fetchChallan) {
            if (challanPrefix === i.challan_prefix) {
                id = i.challan_id;
            }
        }
    
        // Check if ID is valid
        if (id) {
            const deleteChallan = async () => {
                try {
                    const res = await apiDelete(`/challan/${id}`);
                    // alert("Challan deleted successfully");
                    // Refresh data after deletion
                    setChallan(challan.filter(item => item.challanNumber !== challanPrefix));
                } catch (error) {
                    console.error("Error deleting challan:", error);
                    // alert("Failed to delete challan.");
                }
            };
            deleteChallan();
        } else {
            // alert("Invalid Challan ID");
        } 
        }
        else{
            alert("Challan not deleted")
        }
    }
    

    function handleEdit(e,challanId){
                console.log(challanId);
                console.log(challanId);
            console.log(challanId);
            for(var i of fetchChallan)
                {
                    console.log(i.challan_prefix);
                  if(challanId==i.challan_prefix)
                  {
                    // alert(JSON.stringify(i));
                    navigate("/challan-edit",{state:{data:i}})
                  }
                }
    }
    const [match,setMatch]=useState([]);
    function handleCheckboxClick(e,id)
    {
        if(!e.target.checked){
            console.log("checked");
            for(var i of fetchChallan)
                {
                    
                  if(id==i.challan_prefix)
                  {
                    // alert(JSON.stringify(i));
                    console.log(i);
                    const updatedRows=[i];
                    setMatch(updatedRows);
                    navigate("/generate-challan",{state:{data:updatedRows}});
                    setOpen(true);
                  }
                }
        }
        else{
            console.log("unchecked");
        }
    }
    const handleClose = (e) => {
        setOpen(false);
        console.log("close");
        
      };
      const handleGenerate=(e)=>{
        setOpen(false);
        console.log(match);
        navigate("/generate-challan",{state:{data:match}});
        console.log("generate");
      }
      function handleClick(e,row) {
        console.log("clicked");
        console.log(row);
        handleCheckboxClick(e,row.challanNumber);
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
                    <Column field="name" header="Challan Number" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="category" header="Party Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Due In" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Amount" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Status" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Generate-Challan" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Action" style={{ width: '25%' }} body={<Skeleton />}></Column>
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
              </div>):(<div className="">
            <div className="bg-gray-100 font-roboto p-2">
            <Toast ref={toast} />
                <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold text-[#2D465B] mb-4">Delivery/Challan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                            <h3 className="text-lg font-semibold">Total Purchase</h3>
                            {totalPurchase && <p className="text-3xl font-bold">₹{totalPurchase.toFixed(2)}</p>}
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
                                <option value="Open">Show Open Challans</option>
                                <option value="Close">Show Closed Challans</option>
                                <option value="all">Show All Challans</option>
                            </select>
                        </div>
    
                        <div className="sm:flex flex-wrap gap-3 justify-end block">
                                                 <div className="relative inline-block text-left mr-1" id="dropdownWrapper">
                                                     <button disabled onClick={toggleDropdown} className="sm:mt-0 mt-1 disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B] flex items-center">
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
                                                 <NavLink to="/add-challan">
                                                     <button className="bg-[#3A5B76] sm:mt-0 mt-1 text-white px-4 py-2 rounded hover:bg-[#2D465B]">
                                                         Create Challan
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
                                name="Challan"
                          column={column}
                          data={filterChallan()}
                          pageSize={3} // Number of rows per page
                        //   generate={(row)=>(
                        //     <div className="flex gap-2">
                        //         <button className="text-red-500" onClick={(e)=>handleCheckboxClick(e,row.challanNumber)}><Checkbox {...label}  color="success" /></button>
                        //     </div>
                        //   )}
                          actions={(row) => (
                            <div className="text-center">
                              {/* <button className="text-[#3A5B76]" onClick={(e)=>handlePreview(e,row.challanNumber,row)}><Preview/></button>
                              <button className="text-[#3A5B76]" onClick={(e)=>handleEdit(e,row.challanNumber)}><ModeEdit/></button> */}
                              <button className="text-red-500" onClick={(e) =>handledelete(e,row.challanNumber)}><DeleteForever/></button>
                              
                            </div>
                          )}
                        />
                        
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
          <ConfirmDialog open={open} text="challan" onClick1={handleGenerate} onClick={handleClose}></ConfirmDialog>
            </div>)
        }
        </>
    );
};

export default DeliveryChallanTable;