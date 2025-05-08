import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { InputComponent } from "../components/Input";
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { ButtonComponent } from "../components/Button";
import "../styles/layoutFix.css"
import Sidebar from '../layouts/Sidebar';
export function Product_detail(){
    const location = useLocation();
    const [data, setData] = useState({});
    useEffect(() => {
      console.log(location.state.data);
      setData(location.state.data);
      console.log(data);
      console.log("execute");
    }, []);
    function handleClick() {
      console.log(data);
    }
    return(
        <div>
            <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">
      View Details
      </h1>
      <NavLink to="/products" className="text-white text-decoration-none">
      <ButtonComponent
              type="button"
              className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
            />
        </NavLink>
      <form id="ProductForm" className="mt-6">
        <div className="sm:grid grid-cols-2 gap-6 block">
          <div>
            <InputComponent
            readOnly
              labelInput="Product Name"
              type="text"
              placeholder="Enter Product Name"
              value={data.product_name}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Type"
              type="text"
              value={data.product_type}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Unit"
              type="text"
              value={data.product_unit}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product Category"
              type="text"
              value={data.category}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Selling Price"
              type="text"
              value={data.selling_price}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Purchase Price"
              type="text"
              value={data.purchase_price}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="Product HSN / SAC Code"
              type="text"
              value={data.product_hsn_code}
            ></InputComponent>
          </div>
          <div>
            <InputComponent
            readOnly
              labelInput="GST Rate"
              type="text"
              value={data.gst_rate}
            ></InputComponent>
          </div>
          {/* <div>
            <InputComponent
            readOnly
              labelInput="Product Image (PDF)"
              type="text"
             
            ></InputComponent>
          </div> */}
          </div>
        <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Product Description
              </label>
              <textarea  
              readOnly
                // value={data.notes}
                className="w-full p-2 border rounded mt-1"
                value={data.product_description}
              ></textarea>
          </div>
          <div>
          <label
                htmlFor=""
                className="block text-gray-600 mt-4"
              >
                Add Custom Field
              </label>
              <textarea 
              readOnly 
                value="Functionality coming soon..."
                disabled  
                className="w-full p-2 border rounded mt-1"
                
              ></textarea>
          </div>
      </form>
    </div>
        </div>
    )
}