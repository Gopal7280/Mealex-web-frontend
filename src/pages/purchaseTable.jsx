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
import {Loader} from "../layouts/Loader"
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const PurchaseTable = () => {
    const items = Array.from({ length: 5 }, (v, i) => i);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); //working
    const [statusFilter, setStatusFilter] = useState('unPaid');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [purchase, setPurchase] = useState([]);
    const [fecthPurchase,setFetchPurchase]=useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const navigate=useNavigate();
    const [totalPurchase,setTotalPurchase]=useState(null);
    const [paid,setPaid]=useState(null);
          const [unPaid,setUnpaid]=useState(null);
    const toast = useRef(null);
    const [loader,setLoader]=useState(true);
    const column=["Date","Purchase Number","Party Name","Due In","Amount","Status"];
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await apiGet("/purchase");
                console.log(res);
                const formattedPurchase = res.data.map(purchase => ({
                    date: purchase.purchase_date,
                    purchaseNumber: purchase.purchase_prefix,
                    partyName: purchase.customername,
                    dueIn: purchase.due_date,
                    amount: purchase.total_amount,
                    status: purchase.status,
                }));

                setPurchase(formattedPurchase);
                setFetchPurchase(res.data);

                // Calculate totals
                let total = 0;
                let paidd = 0;
                let unpaidd = 0;
                res.data.forEach(i => {
                    total = parseFloat(i.total_amount) + total;
                    if (i.status === "Paid") {
                        paidd++;
                    }
                    if (i.status === "Unpaid") {
                        unpaidd++;
                    }
                });
                setPaid(paidd);
                setUnpaid(unpaidd);
                setTotalPurchase(total.toFixed(2)); // Ensure it's formatted as string
            } catch (error) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'No purchase details found, please add a purchase.',
                    life: 3000
                });
                console.error("Error fetching purchases:", error);
            } finally {
                setLoader(false); // Loader is hidden after the data has been fetched
            }
        };

        fetchPurchases();
    }, []);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(!dropdownOpen);
    };

    const handleDropdownClick = (action) => {
        console.log(action); // Handle bulk actions here
        setDropdownOpen(false);
    };
            // hi
    const filterPurchase = () => {
        return purchase.filter(purchase => {
            const matchesSearch = `${purchase.partyName} ${purchase.purchaseNumber} ${purchase.amount}`.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || purchase.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedInvoice(null);
    };
    function handlePreview(e,purchaseId,row){
        toast.current.show({ severity: 'secondary', summary: 'Secondary', detail: 'Redirecting to preview', life: 2000 });   
            console.log(purchaseId);
            let dataPreview=null;
            for(var i of fecthPurchase)
                {
                    // console.log(i.purchase_id);
                  if(purchaseId==i.purchase_prefix)
                  {
                    // alert(JSON.stringify(purchaseId));   
                    dataPreview=i; 
                    setTimeout(()=>{
                        navigate("/purchasePreview",{state:{data:dataPreview}});
                    },1000);
                  }
                }
                
    }
    // function handledelete(e,purchaseId){
    //     console.log(purchaseId);
    //     const deleteChallan=async ()=>{
    //         // const res=await apiDelete(`/challan/${challanId}`);
    //         // alert(res);
    //         // window.location.reload();
    //     }
    //     deleteChallan();
    // }


    // function handledelete(e,purchaseId){
    //             console.log(purchaseId);
    //             var id="";
    //             for(var i of fecthPurchase)
    //               {
                      
    //                 if(purchaseId==i.purchase_prefix)
    //                 {
    //                   alert(JSON.stringify(purchaseId));
    //                   id=i.purchase_id;
    //                 }
    //               }
    //               alert(id);
    //               const deleteInvoice=async ()=>{
    //                   const res=await apiDelete(`/purchase/${id}`);
    //                   alert(res);
    //                   window.location.reload();
    //               }
    //               deleteInvoice();
    //         }


    function handleEdit(e,purchaseId){
        toast.current.show({ severity: 'secondary', summary: 'Secondary', detail: 'Redirecting to Edit', life: 2000 });   
                console.log(purchaseId);
                let dataEdit=null;   
            for(var i of fecthPurchase)
                {
                    console.log(i.purchase_prefix);
                  if(purchaseId==i.purchase_prefix)
                  {
                    // alert(JSON.stringify(i));
                    dataEdit=i;
                    setTimeout(()=>{
                        navigate("/purchaseEdit",{state:{data:dataEdit}});
                    },1000);
                  }
                }
    }
    const [match,setMatch]=useState([]);
    function handleCheckboxClick(e,id)
    {
        if(!e.target.checked){
            console.log("checked");
            for(var i of fecthPurchase)
                {  
                  if(id==i.purchase_prefix)
                  {
                    // alert(JSON.stringify(i));
                    console.log(i);
                    const updatedRows=[i];
                    setMatch(updatedRows);
                    navigate("/generate-purchase",{state:{data:updatedRows}});
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
        // navigate("/generate-challan",{state:{data:match}});
        console.log("generate");
      }
      function handleClick(e,row) {
        console.log("clicked");
        console.log(row);
        handleCheckboxClick(e,row.purchaseNumber);
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
                    <Column field="name" header="Purchase Number" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="category" header="Party Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Due In" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Amount" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Status" style={{ width: '25%' }} body={<Skeleton />}></Column>
                    <Column field="quantity" header="Generate-Purchase" style={{ width: '25%' }} body={<Skeleton />}></Column>
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
                                  <p><strong>Purchase Number:</strong> {selectedInvoice.invoiceNumber}</p>
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
                <div className="font-roboto bg-gray-200">
        <div className="bg-gray-100 font-roboto p-3">
        <Toast ref={toast} />
            <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold text-[#2D465B] mb-4">Purchase's</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Total Purchase</h3>
                        {totalPurchase && <p className="text-3xl font-bold">₹{totalPurchase}</p>}
                    </div>
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Paid</h3>
                        <p className="text-3xl font-bold">{paid}</p>
                    </div>
                    <div className="bg-gray-200 text-[#3A5B76] p-4 shadow-md rounded-lg hover:bg-[#3A5B76] hover:text-white">
                        <h3 className="text-lg font-semibold">Unpaid</h3>
                        <p className="text-3xl font-bold">{unPaid}</p>
                    </div>
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
                            <option value="unPaid">Show unpaid purchase</option>
                            <option value="Paid">Show paid purchase</option>
                            <option value="all">Show All purchase</option>
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
                        <NavLink to="/purchaseForm">
                            <button className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]">
                                Create purchase
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
                            name="Purchase's"
                      column={column}
                      data={filterPurchase()}
                      pageSize={3} // Number of rows per page
                    //   generate={(row)=>(
                    //     <div className="flex gap-2">
                    //         <button className="text-red-500" onClick={(e)=>handleCheckboxClick(e,row.purchaseNumber)}><Checkbox {...label}  color="success" /></button>
                    //     </div>
                    //   )}
                    //   actions={(row) => (
                    //     <div className="flex gap-2">
                    //       <button className="text-[#3A5B76]" onClick={(e)=>handlePreview(e,row.purchaseNumber,row)}><Preview/></button>
                    //       <button className="text-[#3A5B76]" onClick={(e)=>handleEdit(e,row.purchaseNumber)}><ModeEdit/></button>
                          
                    //     </div>
                    //   )}
                    />
                    
                </div>
            </div>

            {/* Modal */}
        </div>
      <ConfirmDialog open={open} text="purchase" onClick1={handleGenerate} onClick={handleClose}></ConfirmDialog>
        </div>
            )
        }
        </>
    );
};

export default PurchaseTable;