import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { InputComponent } from "../components/Input";
import { ButtonComponent } from "../components/Button";
import { useFormik } from "formik";
import { Preview, ModeEdit, DeleteForever,Close } from "@mui/icons-material";
import { apiGet, apiPut } from "../services/api";
import "../styles/layoutFix.css"
import Sidebar from '../layouts/Sidebar';
export function Product_edit() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
    const [loader, setLoader] = useState(true);
      const [unitSelected, setUnitSelected] = useState([]);
       const [productUnit, setProductUnuit] = useState("");
  useEffect(() => {
     const fetchUnit = async () => {
          setLoader(true);
          try {
            const res = await apiGet("products/units");
            console.log(res.data);
            setUnitSelected(res.data);
          } catch (err) {
            console.log(err);
          } finally {
            setLoader(false);
          }
        };
    
        fetchUnit();
    console.log(location.state.data);
    setProductUnuit(location.state.data.product_unit);
    setData(location.state.data);
    console.log(data);
    console.log("execute");
  }, []);
  function handleClick() {
    console.log(data);
  }
  function handleEdit() {
    setIsEdit(true);
  }
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      product_id: "",
      product_name: "",
      product_type: "",
      product_unit: "",
      product_category: "",
      selling_price: "",
      generate_barcode: "",
      purchase_price: "",
      product_hsn_code: "",
      gst_rate: "",
      product_img: null,
      product_description: "",
      custom_field: "",
    },
    onSubmit: async (values) => {
      values.product_id = data.product_id;
      if (values.product_name == "") {
        values.product_name = data.product_name;
      }
      if (values.product_type == "") {
        values.product_type = data.product_type;
      }
      if (values.product_unit == "") {
        values.product_unit = data.product_unit;
      }
      if (values.generate_barcode == "") {
        values.generate_barcode = data.generate_barcode;
      }
      if (values.product_category == "") {
        values.product_category = data.category;
      }
      if (values.selling_price == "") {
        values.selling_price = data.selling_price;
      }
      if (values.purchase_price == "") {
        values.purchase_price = data.purchase_price;
      }
      if (values.product_hsn_code == "") {
        values.product_hsn_code = data.product_hsn_code;
      }
      if (values.gst_rate == "") {
        values.gst_rate = data.gst_rate;
      }
      if (values.product_img == "") {
        values.product_img = data.product_image;
      }
      if (values.product_description == "") {
        values.product_description = data.product_description;
      }
      if (values.custom_field == "") {
        values.custom_field = data.custom_field;
      }
      values.product_unit=productUnit;
      console.log(values);
      // alert(JSON.stringify(values));
      const res = await apiPut("/products", values);
      navigate("/products")
      // alert(JSON.stringify(res));
    },
  });
  function handleChangeUnit(e) {
    console.log(e.target.value);
    setProductUnuit(e.target.value);
  }
  return (
    <div>
      <div className="over max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-md">
        <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-center mb-6">
        Update Details
        </h1>
        
          <NavLink to="/products" className="text-white text-decoration-none">
          <ButtonComponent
              type="button"
              className=" bg-[#3A5B76]  px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
              value="close"
              children={<Close/>}
            />
          </NavLink>
          </div>
        <form onSubmit={formik.handleSubmit} id="ProductForm" className="mt-6">
          <div className="md:grid md:grid-cols-2 md:gap-6 inline-block">
            <div>
              <InputComponent
                onChange={formik.handleChange}
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.product_name })}
                name="product_name"
                labelInput="Product Name"
                type="text"
                placeholder="Enter Product Name"
              ></InputComponent>
            </div>
            <div>
              <div>
              <label className="block text-gray-600">Product Type</label>
              <select
                onChange={formik.handleChange}
                {...(isEdit ? {} : { value: data.product_type })}
                name="product_type"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.product_type}
              >
                <option disabled value="">
                  {data.product_type != "" ? data.product_type : "select"}
                </option>
                <option>service</option>
                <option>product</option>
              </select>
            </div>
            </div>
            <div className="">
                      <label className="block mt-2 text-gray-600">
                        Product Unit
                      </label>
                      <select
                        onChange={(e) => handleChangeUnit(e)}
                        onFocus={handleEdit}
                        {...(isEdit ? {} : { value: data.product_unit })}
                        className="w-full  p-2 border rounded"
                      >
                         <option disabled value="">
                  {data.product_unit != "" ? data.product_unit : "select"}
                </option>
                        {unitSelected.length > 0 ? (
                          unitSelected.map((item) => (
                            <option value={item.unit_name}>
                              {item.unit_name}
                            </option>
                          ))
                        ) : (
                          <option value="no load">Loading..</option>
                        )}
                      </select>
                    </div>
            <div>
              <label className="block text-gray-600">Product Category</label>
              <select
                onChange={formik.handleChange}
                {...(isEdit ? {} : { value: data.category })}
                name="product_category"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.product_category}
              >
                <option disabled value="">
                  {data.category != "" ? data.category : "select"}
                </option>
                <option value="Electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="food">Food</option>
              </select>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                name="selling_price"
                labelInput="Selling Price"
                type="text"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.selling_price })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Purchase Price"
                type="text"
                name="purchase_price"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.purchase_price })}
              ></InputComponent>
            </div>
            <div>
              <InputComponent
                onChange={formik.handleChange}
                labelInput="Product HSN / SAC Code"
                type="text"
                name="product_hsn_code"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.product_hsn_code })}
              ></InputComponent>
            </div>
            <div>
              <label className="block text-gray-600">Gst Rate</label>
              <select
                onChange={formik.handleChange}
                {...(isEdit ? {} : { value: data.gst_rate })}
                name="gst_rate"
                className="w-full p-2 border rounded mt-1"
                value={formik.values.gst_rate}
              >
                <option disabled value="">
                  {data.gst_rate != "" ? data.gst_rate : "select"}
                </option>
                 <option value="0">0%</option>
                        <option value="0.1">0.1%</option>
                        <option value="0.25">0.25%</option>
                        <option value="1.5">1.5%</option>
                        <option value="3">3%</option>
                        <option value="5">5%</option>
                        <option value="6">6%</option>
                        <option value="12">12%</option>
                        <option value="13.8">13.8%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
              </select>
            </div>
            {/* <div>
              <InputComponent
                onChange={formik.handleChange}
                name="generate_barcode"
                labelInput="Generate Barcode"
                type="text"
                onFocus={handleEdit}
                {...(isEdit ? {} : { value: data.generate_barcode })}
              ></InputComponent>
            </div> */}
            {/* <div>
              <InputComponent
                onChange={formik.handleChange}
                name="product_img"
                labelInput="Product Image (PDF)"
                type="text"
                //   value={data.opening_value}
              ></InputComponent>
            </div> */}
          </div>
          <div>
            <label htmlFor="" className="block text-gray-600 mt-4">
              Product Description
            </label>
            <textarea
              onChange={formik.handleChange}
              name="product_description"
              onFocus={handleEdit}
              {...(isEdit ? {} : { value: data.product_description })}
              className="w-full p-2 border rounded mt-1"
            ></textarea>
          </div>
          <div>
            <label disabled htmlFor="" className="block text-gray-600 mt-4">
              Add Custom Field
            </label>
            <textarea
            disabled
              onChange={formik.handleChange}
              name="custom_field"
              onFocus={handleEdit}
              {...(isEdit ? {} : { value: "Functionality coming soon.." })}
              className="w-full p-2 border rounded mt-1"
            ></textarea>
          </div>
          <div class="text-end mt-6">
            <ButtonComponent
              label="Update"
              type="submit"
              className="bg-[#3A5B76] text-white px-8 py-2 rounded hover:bg-[#2E4A63]"
            ></ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
}
