import React from 'react';
import { DeleteForever } from '@mui/icons-material'; // Adjust the import based on your icon library
import { InputComponent } from './Input';
import { ButtonComponent } from './Button';

const ProductTable = ({ productRows, products,onProductChange, formik, onFocusChange, onBlurHandle, onChanges,onDelete,onDescriptionChange, TaxAmount }) => {
    return (
        <table className="w-full border border-gray-300">
                       <thead className="bg-gray-200 text-[#2D465B]">
                         <tr>
                           <th className=" border">S.No</th>
                           <th className="p-2 border">Item/ Services</th>
                           <th className="p-2 border">HSN Code</th>
                           <th className="p-2 border">QTY</th>
                           <th className="p-2 border">Price/ Item</th>
                           <th className="p-2 border">Discount</th>
                           <th className="p-2 border">TAX</th>
                           <th></th>
                           <th className="p-2 border">Action</th>
                         </tr>
                       </thead>
                       <tbody>
          
               {productRows.map((product, index) => (
                 <React.Fragment key={index}>
                     <tr>
                         <td className="w-10">
                             <InputComponent
                                 onChange={formik}
                                 type="number"
                                 name="sNo"
                                 value={index + 1}
                                 readOnly
                                 classNameInput="w-10 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                             />
                         </td>
                         <td className="w-80">
                             <select
                                 name="productdetail"
                                 className="w-80 p-2 border border-gray-300 hover:bg-gray-200"
                                 onChange={(e) => onProductChange(index, e.target.value)}
                                 value={product.productName}
                             >
                                 <option value="">Select</option>
                                 {products.map((product) => (
                                     <option key={product.product_name} value={product.product_name}>
                                         {product.product_name}
                                     </option>
                                 ))}
                             </select>
                         </td>
                         <td className="w-30">
                             <InputComponent
                                 onChange={formik}
                                 type="text"
                                 name="HSNCode"
                                 value={product.hsnCode}
                                 min="0"
                                 classNameInput="w-30 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                             />
                         </td>
                         <td className="w-20">
                             <InputComponent
                                 onChange={formik}
                                 type="number"
                                 min="0"
                                 name="quantity"
                                 onFocus={(e)=>onFocusChange(e,index)}
                                 {...(product.quantity!=""?{value:product.quantity}:{})}
                                 onBlur={(e) => onBlurHandle(e, product, index, e.target.value, "qtyChange")}
                                 classNameInput="w-20 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                                 placeholder="Quantity"
                             />
                         </td>
                         <td className="w-40">
                             <InputComponent
                                 onChange={formik}
                                 type="number"
                                 name="unitPrice"
                                 value={product.unitPrice}
                                 min="0"
                                 readOnly
                                 classNameInput="w-40 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                             />
                         </td>
                         <td className="w-30">
                             <InputComponent
                                 type="number"
                                 name="rupe"
                                 min="0"
                                 onChange={(e) => onChanges(e, product, index, 0, "discount")}
                                 placeholder="₹"
                                 classNameInput="w-30 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                             />
                         </td>
                         <td colSpan={2}>
              <select onChange={(e) => onChanges(e, product, index, 0, "gstChange")} className="w-50 border d-inline-block border-gray-300 rounded-md p-2">
                                 <option value="gst_0">0%</option>
                                 <option value="gst_0.1">0.1%</option>
                                 <option value="gst_0.25">0.25%</option>
                                 <option value="gst_1.5">1.5%</option>
                                 <option value="gst_3">3%</option>
                                 <option value="gst_5">5%</option>
                                 <option value="gst_6">6%</option>
                                 <option value="gst_12">12%</option>
                                 <option value="gst_13.8">13.8%</option>
                                 <option value="gst_18">18%</option>
                                 <option value="gst_28">GST @ 28%</option>
                             </select>
                             {TaxAmount[index] !== "NaN" ? (
                                 <span className="w-40">{TaxAmount[index]}</span>
                             ) : (
                                 <span className="w-40">0.00</span>
                             )}
                         </td>
                         <td>
                             <ButtonComponent
                                 type="button"
                                 className="p-1 m-auto w-100 text-white bg-red-500 rounded hover:bg-red-600"
                                 value="remove"
                                 onClick={() => onDelete(index)}
                             >
                                 <DeleteForever />
                             </ButtonComponent>
                         </td>
                     </tr>
                     <tr>
                         <td></td>
                         <td colSpan={4}><textarea onBlur={(e) => onDescriptionChange(e,index)}  name="productDescription" placeholder="Enter product description" className="bg-white w-full border border-gray-300 hover:bg-gray-200" id=""></textarea></td>
                         <td className="w-30">
                             <InputComponent
                                 onChange={(e) => onChanges(e, product, index, 0, "discount")}
                                 type="number"
                                 min="0"
                                 name="per"
                                 placeholder="%"
                                 classNameInput="w-30 mb-2 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                             />
                         </td>
                         <td></td>
                         <td></td>
                     </tr>
                 </React.Fragment>
             ))} 
             </tbody>
                     </table>
    );
};

export default ProductTable;