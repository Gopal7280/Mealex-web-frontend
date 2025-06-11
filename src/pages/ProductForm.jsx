// ProductForm.jsx
// This component allows users to add a new product with various details like name, category, price, etc.
// It uses Formik for form handling and validation, and Axios for API requests.
// It also includes a dialog for adding a new category if the user selects "Other Category".
// It integrates with a sidebar layout and uses PrimeReact components for UI elements like Toast, Dialog, and Loader.

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Preview, ModeEdit, DeleteForever, Close } from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/Button';
import { InputComponent } from '../components/Input';
import { apiGet, apiPost } from '../services/api';
import '../styles/layoutFix.css';
import Sidebar from '../layouts/Sidebar';
import { Toast } from 'primereact/toast';
import { Loader } from '../layouts/Loader';
import { Skeleton } from 'primereact/skeleton';

import '../styles/ProductForm.css';
// import { BarcodeComp } from "../components/QrCode";
import { Dialog } from 'primereact/dialog';
const ProductForm = () => {
  const [loader, setLoader] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // useNavigate hook
  const [producttype, setProducttype] = useState(''); // State to manage product type
  const [customField, setCustomField] = useState(['']); // State to manage custom fields
  const [gstSelected, setGstSelected] = useState(['']); // State to manage selected GST rate
  const [unitSelected, setUnitSelected] = useState([]); // State to manage selected units
  const [locations, setLocationS] = useState(''); // State to manage locations
  const location = useLocation(); // Get the current location
  const [visible, setVisible] = useState(false); // State to manage visibility of the dialog for adding a new category
  const toast = useRef(null); // Reference for the Toast component
  const [addCategory, setAddCategory] = useState(''); // State to manage the new category name
  // Default values for selling and purchase prices
  const [gstSet, setGstSet] = useState({
    sellingPrice: 'withGstSelling',
    purchasePrice: 'withGstPurchase',
  });
  const [productUnit, setProductUnuit] = useState(''); // State to manage selected product unit

  useEffect(() => {
    // If the business profile is not found, redirect to the profile form page
    const fetchBussiness = async () => {
      try {
        const res = await apiGet('/businessprofile');
        if (res.length === 0) {
          navigate('/profile_form');
        }
      } catch (err) {
        console.log('working');
        console.log(err);
      }
    };
    fetchBussiness();
    // Fetch units from the API when the component mounts
    // This will populate the unitSelected state with available units
    const fetchUnit = async () => {
      setLoader(true);
      try {
        const res = await apiGet('products/units');
        console.log(res.data);
        setUnitSelected(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };

    fetchUnit();
  }, []);

  // Function to handle product type change
  function handleProductChange(e) {
    console.log(e.target.value);
    setProducttype(e.target.value);
  }

  // Function to handle category change
  // If the user selects "Other Category", show the dialog to add a new category
  function handleCategoryChange(e) {
    setAddCategory('');
    if (e.target.value == 'otherCategory') {
      setVisible(true);
      return;
    }
    console.log(e.target.value);
    setProduct_category(e.target.value);
  }

  // Function to handle adding a new custom field
  // It appends an empty string to the customField state, allowing the user to input a new field
  function handleCustomField() {
    setCustomField(prevCustomField => [...prevCustomField, '']);
  }

  // Function to handle changes in custom fields
  function handleCustomFieldChange(index, value) {
    const updatedFields = [...customField];
    updatedFields[index] = value;
    setCustomField(updatedFields);
  }
  const [product_category, setProduct_category] = useState(''); // State to manage product category
 
  // Formik setup for handling form submission and validation
  // It initializes the form values and handles the submission logic
  const formik = useFormik({
    initialValues: {
      product_name: '',
      product_category: '',
      // product_id: "",
      product_unit: '',
      // productType:"",
      selling_price: 0,
      purchase_price: 0,
      hsn_sac_code: '',
      product_description: '',
      custom_field: '',
      generate_barcode: '',
      product_type: '',
      gst_rate: '',
      product_image_pdf: null, // Added for file input
      gstWithWithout: {},
    },
    onSubmit: async values => {
      setLoader(true);
      if (values.purchase_price == '') {
        values.purchase_price = 0;
      }
      if (values.selling_price == '') {
        values.selling_price = 0;
      }

      values.product_unit = productUnit;
      values.gstWithWithout = gstSet;
      values.gst_rate = gstSelected == '' ? 0 : gstSelected;
      values.product_type = producttype;
      const keyValuePairs = customField.map(field => {
        const [key, value] = field.split('/').map(item => item.trim());
        return { key, value };
      });

      values.custom_field = keyValuePairs;
      // values.custom_field=JSON.parse(customField);
      values.product_category = product_category;
      // alert(JSON.stringify(values));
      console.log(values);

      // API call to add the product
      // It uses the apiPost function to send a POST request to the '/products' endpoint
      const addProduct = async () => {
        try {
          setLoader(true);
          const res = await apiPost('/products', values);
          if (location.state?.data == 'FromInvoice') {
            navigate('/add-invoice');
          }
          if (location.state?.data === 'FromProduct') {
            navigate('/products');
          }
          if (location.state?.data == 'FromPurchase') {
            navigate('/purchaseForm');
          }
          if (location.state?.data == 'FromChallan') {
            console.log('working');
            navigate('/add-challan');
          }
          if (location.state?.data == 'FromQuotation') {
            navigate('/add-quotation');
          }
          if (location.state?.data == undefined) {
            navigate('/products');
          }
          // else{
          //   if(location.state?.data=="FromChallanTo"){
          //     console.log("working");
          //     navigate("/add-challan");
          //   }
          //   else{
          //       navigate("/products");
          //     }
          //   }
        } catch (err) {
          console.log(err.status);
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Please enter all fields',
            life: 3000,
          });
        } finally {
          setLoader(false);
        }
      };
      addProduct();
    },
  });
  const [gvalue, setGvalue] = useState('');

  function handleBarcodeGenerate(e) {
    setGvalue(e.target.value);
  }

  // Function to handle the selection of GST rates
  // It updates the gstSet state based on whether the user selects "with GST" or "without GST"
  function handleGstSelect(e, name) {
    console.log(gstSet);
    if (name == 'selling') {
      if (e.target.value == 'withGst') {
        console.log(e.target.value);
        setGstSet({
          sellingPrice: 'withGstSelling',
          purchasePrice:
            gstSet.purchasePrice != undefined
              ? gstSet.purchasePrice
              : 'withGstPurchase',
        });
      }
      if (e.target.value == 'withoutGst') {
        console.log(e.target.value);
        setGstSet({
          sellingPrice: 'withoutGstSelling',
          purchasePrice:
            gstSet.purchasePrice != undefined
              ? gstSet.purchasePrice
              : 'withGstPurchase',
        });
      }
    }
    if (name == 'purchase') {
      if (e.target.value == 'withGst') {
        console.log(e.target.value);
        setGstSet({
          sellingPrice:
            gstSet.sellingPrice != undefined
              ? gstSet.sellingPrice
              : 'withGstSelling',
          purchasePrice: 'withGstPurchase',
        });
      }
      if (e.target.value == 'withoutGst') {
        console.log(e.target.value);
        setGstSet({
          sellingPrice:
            gstSet.sellingPrice != undefined
              ? gstSet.sellingPrice
              : 'withGstSelling',
          purchasePrice: 'withoutGstPurchase',
        });
      }
    }
  }

  // Function to handle changes in the GST selection dropdown
  // It updates the gstSelected state with the selected value
  function handleChange(e) {
    console.log(e.target.value);
    setGstSelected(e.target.value);
  }

  // Function to handle changes in the product unit selection dropdown
  // It updates the productUnit state with the selected value
  function handleChangeUnit(e) {
    console.log(e.target.value);
    setProductUnuit(e.target.value);
  }

  // Function to handle adding a new product category
  // It retrieves the value from the input field, updates the product_category state, and closes the dialog
  function handleProductCategoryAdd(e) {
    const newCategory = document.getElementById('newCategory').value;
    // formik.values.product_category=newCategory;
    setAddCategory(newCategory);
    setProduct_category(newCategory);
    // console.log(formik.values.product_category);
    setVisible(false);
  }
  return (
    <>
      {loader ? (
        <>
          {/* // Display a loader while data is being fetched or processed */}
          <Loader />
        </>
      ) : (
        <div>
          {/* //this is the dialog for adding a new product category */}
          <Dialog
            header="Add Category"
            visible={visible}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
            style={{ width: '50vw' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
          >
            <dl>
              <dt className="mb-2 mt-2">Category Name</dt>
              <dd>
                <input
                  id="newCategory"
                  type="text"
                  className="p-[0.76rem] w-full border-1 border-[#d1d5db] rounded-[6px]"
                  placeholder="Enter Product category"
                />
              </dd>
            </dl>
            <ButtonComponent
              onClick={e => handleProductCategoryAdd(e)}
              label="Add"
              type="submit"
              className="bg-[#3A5B76] text-white px-8 py-2 rounded hover:bg-[#2E4A63]"
            ></ButtonComponent>
          </Dialog>
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="">
              <div className="">
                <Toast ref={toast} />
                <h1 className="text-2xl font-semibold text-gray-700 text-center">
                  Add Product
                </h1>
                {/* <button className="btn btn-primary float-end"><NavLink to="/products" className="text-white text-decoration-none">close</NavLink></button> */}
                <NavLink to="/products">
                  <ButtonComponent
                    type="button"
                    className="bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
                    value="close"
                    children={<Close />}
                  />
                </NavLink>
                <form
                  className="mt-10"
                  id="product_Form"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="md:grid md:grid-cols-2 md:gap-6 inline-block">
                    <div className="">
                      <InputComponent
                        labelInput="Product Name"
                        type="text"
                        name="product_name"
                        placeholder="Enter Product Name"
                        onChange={formik.handleChange}
                        required
                      ></InputComponent>
                    </div>
                    <div>
                      <label className="block text-gray-600"></label>
                      <div className="lg:flex items-center space-x-4 mt-1 md:block">
                        <label className="flex items-center">
                          Product Type:
                        </label>
                        <input
                          type="radio"
                          onChange={handleProductChange}
                          value="product"
                          name="product_type"
                          className="mr-2"
                        ></input>
                        <span> Product</span>
                        <label class="flex items-center">
                          <input
                            type="radio"
                            onChange={handleProductChange}
                            name="product_type"
                            value="service"
                            className="lg:mr-2 md:mr-5"
                          ></input>
                          <span>Service </span>
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <label className="block mt-2 text-gray-600">
                        Product Unit
                      </label>
                      <select
                        onChange={e => handleChangeUnit(e)}
                        className="w-full  p-2 border rounded"
                      >
                        {unitSelected.length > 0 ? (
                          unitSelected.map(item => (
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
                      <label class="block mt-2 text-gray-600">
                        Product Category
                      </label>
                      <select
                        onChange={handleCategoryChange}
                        class="w-full p-2 border rounded"
                      >
                        <option readOnly value="select">
                          select category
                        </option>
                        <option value="Electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="food">Food</option>
                        <option
                          value="otherCategory"
                          className="bg-[#3A5B76] text-white"
                        >
                          {addCategory == '' ? 'add category' : addCategory}
                        </option>
                      </select>
                    </div>
                    <div className="lg:grid grid-cols-2 gap-3 sm:grid mt-2 block">
                      <div>
                        <InputComponent
                          labelInput="Selling Price"
                          type="number"
                          min="0"
                          name="selling_price"
                          value={formik.values.selling_price}
                          onChange={formik.handleChange}
                          placeholder="Enter Product Selling Price"
                        />
                      </div>
                      <div>
                        <label class="block text-gray-600">
                          Select with/without gst
                        </label>
                        <select
                          onChange={e => handleGstSelect(e, 'selling')}
                          class="w-full p-2 border rounded"
                        >
                          <option value="withGst">With GST</option>
                          <option value="withoutGst">Without GST</option>
                        </select>
                      </div>
                    </div>
                    <div className="lg:grid grid-cols-2 gap-3 sm:grid mt-2 block">
                      <div>
                        <InputComponent
                          labelInput="Purchase Price"
                          type="number"
                          min="0"
                          name="purchase_price"
                          value={formik.values.purchase_price}
                          onChange={formik.handleChange}
                          placeholder="Enter Product Purchase Price"
                        />
                      </div>
                      <div>
                        <label class="block text-gray-600">
                          Select with/without gst
                        </label>
                        <select
                          onChange={e => handleGstSelect(e, 'purchase')}
                          class="w-full p-2 border rounded"
                        >
                          <option value="withGst">With GST</option>
                          <option value="withoutGst">Without GST</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <InputComponent
                        labelInput="Product HSN / SAC Code"
                        type="number"
                        min="0"
                        step="any"
                        name="hsn_sac_code"
                        value={formik.values.hsn_sac_code}
                        onChange={formik.handleChange}
                        required
                        placeholder="Product HSN/SAC code"
                      />
                    </div>
                    <div>
                      <label class="block mt-2 text-gray-600">
                        GST Category
                      </label>
                      <select
                        onChange={e => handleChange(e)}
                        class="w-full p-2 border rounded"
                      >
                        <option value="0">Select</option>
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
                    <div>
                      <button
                        disabled
                        className="mt-2 px-4 py-2 bg-blue-500 disabled:opacity-80 disabled:bg-gray-400 text-white rounded"
                      >
                        Generate Barcode
                      </button>
                    </div>
                    <div className="mt-2">
                      <InputComponent
                        labelInput="Product Image (PDF)"
                        type="file"
                        accept=".pdf"
                        name="product_image_pdf"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-gray-600">
                        Product Description
                      </label>
                      <textarea
                        name="product_description"
                        onChange={formik.handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter Product Description"
                      ></textarea>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label className="block text-gray-600">
                        Custom Fields
                      </label>
                      {customField.map((field, index) => (
                        <input
                          key={index}
                          type="text"
                          disabled
                          value={field}
                          onChange={e =>
                            handleCustomFieldChange(index, e.target.value)
                          }
                          className="w-full p-2 border rounded mt-1"
                          placeholder="Enter custom field detail in format key/value"
                        />
                      ))}
                      <button
                        onClick={handleCustomField}
                        type="button"
                        disabled
                        className="mt-2 px-4 py-2 bg-blue-500 disabled:opacity-80 disabled:bg-gray-400 text-white rounded"
                      >
                        + Add Field
                      </button>
                    </div>
                  </div>
                  <div class="text-end mt-6">
                    <ButtonComponent
                      label="Save"
                      type="submit"
                      className="bg-[#3A5B76] text-white px-8 py-2 rounded hover:bg-[#2E4A63]"
                    ></ButtonComponent>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
