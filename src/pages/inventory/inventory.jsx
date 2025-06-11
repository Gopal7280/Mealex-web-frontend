import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../components/Button";
import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { apiGet, apiPost } from "../../services/api";
import { SearchComponent } from "../../components/SerachBar";
import { TableComponent } from "../../components/Table";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
export function Inventory() {
  const items = Array.from({ length: 5 }, (v, i) => i);
  const column = ["Sno", "Name", "Quantity"];
  const [serarchRow, setSearchRow] = useState(""); // serarchRow state
  const [inventoryData,setInventoryData]=useState([]);
  const [total,setTotal]=useState([]);
  const [visible, setVisible] = useState(false);
  const [load,setLoad]=useState(false);
  const [loader,setLoader]=useState(true);
  const navigate=useNavigate();
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
    const fetchStock = async () => {
      // setLoader(false); // Start loading
      try {
        setLoader(false);
        const res = await apiGet("/inventory");
        console.log(res);
        setInventoryData(res.data);
        setTotal(res.data.length);
        console.log("inventory", res);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      } finally {
        setLoader(true); // Stop loading
      }
    };

    fetchStock();
  }, [load]);
  const filteredStock = inventoryData.filter((inventoryData) =>
    `${inventoryData.inventory_number} ${inventoryData.inventory_status} ${inventoryData.item_name}`
      .toLowerCase()
      .includes(serarchRow.toLowerCase())
  );
  const dataTable = filteredStock.map((value,index) => ({
    sno: value.inventory_number==undefined?index+1:index+1,
    name: value.item_name,
    quantity: value.inventory_quantity,
  }));
//   const formik=useFormik({
//     initialValues:{
//         employeName:"",
//         expenseAmount:"",
//         date:"",
//         categoryOfPayment:"",
//         expenseCategory:"",
//         expenseDescription:"",
//     },
//     onSubmit:(values)=>{
//       console.log(values);
//       const addExpenseData=async ()=>{
//           try{
//             const res=apiPost("/expenses",values);
//             console.log(res);
//             setLoad(!load);
//             setVisible(false);
//           }
//       catch(err)
//       {
//         console.log(err);
//       }
    
//     }
//     addExpenseData();
//     }
//   })
  return (
    <>
      {
        loader?(
           <div className="bg-white mt-3 p-10">
      <div className="gop">
                <div className="max-w-7xl mx-auto bg-white p-2 shadow-lg responsive-head rounded-lg">
                  <div className="flex justify-between items-center responsive-header mb-4">
                    <h2 className="text-xl font-semibold">
                      Inventory Details
                      <span className="bg-gray-400 ms-2 text-white px-3 py-1 rounded-full text-sm">
                        Total {total}
                      </span>
                    </h2>
                    <SearchComponent onChange={(e) => setSearchRow(e.target.value)} />
                      {/* <ButtonComponent
                                          onClick={() => setVisible(true)}
                                          className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]"
                                          label="Add Expense Data"
                                          value="addExpense"
                                        ></ButtonComponent> */}
                                        {/* <Dialog
                    header="Add expense"
                    visible={visible}
                    className="sm:w-1/2 mt-2"
                    onHide={() => {
                      if (!visible) return;
                      setVisible(false);
                    }}
                  >
      <div className="border border-1 p-4 rounded-2xl">
        <form action="" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-column gap-2">
          <label htmlFor="employeName">Employee Name</label>
          <InputText onChange={formik.handleChange} id="employeName" name="employeName"  placeholder="Enter user name" aria-describedby="username-help" />
          </div>
          <div className="flex flex-column gap-2">
          <label htmlFor="amount">Amount</label>
          <InputText type="number" onChange={formik.handleChange} id="expenseAmount" name="expenseAmount" placeholder="Amount (INR)" aria-describedby="username-help" />
          </div>
          <div className="flex flex-column gap-2">
          <label htmlFor="date">Date</label>
          <input onChange={formik.handleChange} name="date" className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]" type="date"/>
          </div>
          <div className="flex flex-column gap-2">
          <label htmlFor="expenseCategory">Select Category</label>
          <select onChange={formik.handleChange} name="expenseCategory" className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]" id="">
            <option value="notDescribed">Select</option>
            <option value="travel">Travel</option>
            <option value="officeSupplies">Office Supplies</option>
          </select>
          </div>
          <div className="flex flex-column gap-2">
          <label htmlFor="paymentMode">Select Payment Mode</label>
          <select onChange={formik.handleChange} name="categoryOfPayment" className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]" id="">
            <option value="notDescribed">Select</option>
            <option value="cash">CASH</option>
            <option value="upi">UPI</option>
            <option value="bank">BANK</option>
            <option value="cheque">CHEQUE</option>
          </select>
          </div>
      </div>
      <div>
        <textarea onChange={formik.handleChange} name="expenseDescription" placeholder="description" className="w-full mt-5 p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]" id=""></textarea>
      </div>
      <ButtonComponent
                  value="Submit"
                  type="submit"
                  label="Save"
                  className="px-20 mt-2 w-full py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                  ></ButtonComponent>
                  </form>
      </div>
                  </Dialog> */}
                    <div className="flex space-x-3">
                      {/* <button
                        disabled
                        className="disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]"
                      >
                        Bulk Upload
                      </button> */}
                    </div>
                  </div>
                  {/* <TableComponent column={column} data={dataTable}></TableComponent> */}
      
                  <TableComponent
                    name="User's"
                    column={column}
                    data={dataTable}
                    pageSize={5} // Number of rows per page
                    // actions={(row) => (
                    //   <div className="flex gap-2">
                    //     <button
                    //       className="text-[#3A5B76]"
                    //       onClick={(e) => handlePreview(e, row.Contact)}
                    //     >
                    //       <Preview />
                    //     </button>
                    //     <button
                    //       className="text-[#3A5B76]"
                    //       onClick={(e) => handleEdit(e, row.Contact)}
                    //     >
                    //       <ModeEdit />
                    //     </button>
                    //     <button
                    //       className="text-red-500"
                    //       onClick={(e) => handledelete(e, row.Contact)}
                    //     >
                    //       <DeleteForever />
                    //     </button>
                    //   </div>
                    // )}
                  />
      
                  {/* <TableComponent
        column={column}
        data={dataTable}
        pageSize={3} // Number of rows per page
        actions={(row) => (
          <div className="flex gap-2">
            <button onClick={() => alert(`Edit ${row.Name}`)}>Edit</button>
            <button onClick={() => alert(`Delete ${row.Name}`)}>Delete</button>
          </div>
        )}
      /> */}
                </div>
              </div>
      </div>
        ):(
          <div className="gop">
                    <div className="max-w-7xl mt-3 mx-auto bg-white p-5 shadow-lg responsive-head rounded-lg">
                      <Skeleton width="100%" height="50px" className="mb-2"></Skeleton>
                      {/* <TableComponent column={column} data={dataTable}></TableComponent> */}
          
                      <div className="card">
                        <DataTable value={items} className="p-datatable-striped">
                          <Column
                            field="code"
                            header="S.no"
                            style={{ width: "25%" }}
                            body={<Skeleton />}
                          ></Column>
                          <Column
                            field="name"
                            header="Name"
                            style={{ width: "25%" }}
                            body={<Skeleton />}
                          ></Column>
                          <Column
                            field="quantity"
                            header="quantity"
                            style={{ width: "25%" }}
                            body={<Skeleton />}
                          ></Column>
                        </DataTable>
                      </div>
          
                      {/* <TableComponent
            column={column}
            data={dataTable}
            pageSize={3} // Number of rows per page
            actions={(row) => (
              <div className="flex gap-2">
                <button onClick={() => alert(`Edit ${row.Name}`)}>Edit</button>
                <button onClick={() => alert(`Delete ${row.Name}`)}>Delete</button>
              </div>
            )}
          /> */}
                    </div>
                  </div>
        )
      }
    </>
  );
}
