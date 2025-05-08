import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/layoutFix.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Sidebar from "../layouts/Sidebar";
import { Preview, ModeEdit, DeleteForever, Close } from "@mui/icons-material";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toWords } from "number-to-words";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { ButtonComponent } from "../components/Button";
import { InputComponent } from "../components/Input";
import { apiGet, apiPost, apiPut } from "../services/api";
import { Loader } from "../layouts/Loader";
export function PurchaseEdit() {
  const [purchasePreview, setPurchasePreview] = useState([]);
  const [all, setAll] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [purchaseProduct, setpurchaseProduct] = useState([]);
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [taxable_rate, setTaxable_rate] = useState(0);
  const [gst_amount, set_gst_amount] = useState(0);
  const [total_amount, set_Total_amount] = useState(0);
  const [amount_to_words, setAmountWords] = useState("");
  const [products, setProducts] = useState([]);
  const [businessprofile, setBusinessProfile] = useState([]);
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const dropdownRef = useRef(null);
  const [amountReceipt, setAmountReceipt] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [TaxAmount, setTaxAmount] = useState([]);
  const [productDescription, setProductDescription] = useState(["null"]);
  const [disabl, setdisabl] = useState([]);
  const [productAmount, setProductAmount] = useState([
    {
      amount: "0",
      per: "0",
    },
  ]);
  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: "",
        productName: "",
        hsnCode: "",
        gstRate: "",
        unitPrice: "",
        quantity: "",
        total: "",
        discount_amount: 0,
        taxable_amount: 0,
      },
    ]);
    const updateMe = [...disabl];
    setdisabl([...disabl, 1]);
    setProductDescription([...productDescription, "null"]);
    setTaxAmount([...TaxAmount, 0]);
    setProductAmount([
      ...productAmount,
      {
        amount: "",
        per: "",
      },
    ]);
  };
  const [productRows, setProductRows] = useState([
    {
      id: "",
      productName: "",
      hsnCode: "",
      gstRate: "",
      gstCalculate: "",
      unitPrice: "",
      quantity: "",
      total: "",
      discount_amount: 0,
      discount_amountPer: "0_%",
      productDescription: "",
      taxable_amount: 0,
    },
  ]);
  const handleProductChange = async (index, productName) => {
    setCount(0);
    const updateMe=[...disabl];
    updateMe[index]=0;
    setdisabl(updateMe);
    try {
      const token = localStorage.getItem("token");
      if(productName=="addProduct")
        {
          navigate("/add-product",{state:{data:"FromInvoice"}})
        }
      const res = await apiGet(`products/detail/${productName}`);
      const productDetail = res[0];
      const updatedRows = [...productRows];
      var rate = 100;
      rate = parseInt(res[0].gst_rate) * parseFloat(res[0].selling_price);
      console.log(res);
      rate = rate / 100;
      console.log("gstRate" + rate);
      var calculateTax = 0;
      var calculateGst = 0;
      if (res[0].selling_status == "withGstSelling") {
        console.log("yes");
        console.log(res);
        calculateGst = 1 + parseFloat(res[0].gst_rate / 100);
        calculateTax = parseFloat(res[0].selling_price) / calculateGst;
        calculateTax = calculateTax.toFixed(2);
        calculateGst = 0;
        res[0].gst_rate = 0;
      }
      if (res[0].selling_status == "withoutGstSelling") {
        console.log("no");
        console.log(res);
        calculateGst = (res[0].selling_price * res[0].gst_rate) / 100;
        calculateTax = res[0].selling_price;
        calculateTax = calculateTax.toFixed(2);
        console.log(calculateGst);
      }
      updatedRows[index].quantity="1"
      const updateTax = [...TaxAmount];
      const updateGst = [...gstRateS];
      updateGst[index] = parseFloat(res[0].gst_rate);
      updateTax[index] = calculateGst;
      updatedRows[index] = {
        ...updatedRows[index],
        id: productDetail.product_id,
        productName: productDetail.product_name,
        hsnCode: productDetail.product_hsn_code,
        gstRate: productDetail.gst_rate,
        gstCalculate: rate + parseFloat(res[0].selling_price),
        unitPrice: calculateTax,
        quantity: updatedRows[index].quantity,
        total:calculateGst + calculateTax * parseFloat(updatedRows[index].quantity), // Update total based on quantity
        discount_amount: "0",
        discount_amountPer: "0%",
        taxable_amount: calculateTax * parseFloat(updatedRows[index].quantity),
        productDescription: "",
      };
      console.log(res[0].gst_rate);
      // ////////////////////////////////////////////////
      const update = [...productAmount];
      update[index].amount = 0;
      update[index].per = 0;
      var taxableamount=0;
      var totalAmount=0;
      for (let row of updatedRows) {
        totalAmount += parseFloat(row.total);
         taxableamount += parseFloat(row.taxable_amount);
      }
      const gstSum = parseFloat(
        updateTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
      );
      setGstSu((parseFloat(gstSum)));
      setAddTotal(totalAmount.toFixed(2));
      setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
      setProductAmount(update);
      setGstRateS(updateGst);
      setProductRows(updatedRows);
      setTaxAmount(updateTax);
      console.log(updateTax);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const purchaseData = purchasePreview[0];
  const [addTotal, setAddTotal] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [qty, setQty] = useState(0);
  var qtyy = 0;
  const [AmountWords, setAmountWordss] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      purchaseId: "",
      customerId: "",
      purchaseDate: "",
      purchaseDueDate: "",
      purchasePrefix: "",
      originalInvoiceNumber: "",
      paymentTerms: "",
      cgstAmount: "",
      sgstAmount: "",
      customerName: "",
      taxableAmount: "",
      totalAmount: "",
      purchaseNotes: "",
      businessprofile: [],
      productData: [{}],
      taxAmount: [],
      totalGstAmount: "",
    },
    onSubmit: (values) => {
      values.purchaseId = purchaseData.purchase_id;
      values.purchasePrefix = purchaseData.purchase_prefix;
      values.customerId = purchaseData.customer_id;
      if (values.purchaseDate == "") {
        values.purchaseDate = purchasePreview[0].purchase_date;
      }
      if (values.purchaseDueDate == "") {
        values.purchaseDueDate = purchasePreview[0].due_date;
      }
      if (values.paymentTerms == "") {
        values.paymentTerms = purchasePreview[0].payment_terms;
      }
      if (values.originalInvoiceNumber == "") {
        values.originalInvoiceNumber =
          purchasePreview[0].original_invoice_number;
      }
      if (values.sgst == "") {
        values.sgst = purchasePreview[0].sgst;
      }
      if (values.cgst == "") {
        values.cgst = purchasePreview[0].cgst;
      }
      if (values.customerName == "") {
        values.customerName = purchasePreview[0].customername;
      }
      if (values.taxableAmount == "") {
        values.taxableAmount = purchasePreview[0].taxable_amount;
      }
      if (values.totalAmount == "") {
        values.totalAmount = purchasePreview[0].total_amount;
      }
      if (values.purchaseNotes == "") {
        values.purchaseNotes = purchasePreview[0].add_notes;
      }
      values.purchasePrefix = purchaseData.purchase_prefix;
      values.businessprofile = businessprofile;
      values.productData = productRows;
      values.cgstAmount = gstAmount != null ? gstAmount / 2 : purchaseData.cgst;
      values.sgstAmount = gstAmount != null ? gstAmount / 2 : purchaseData.sgst;
      values.totalGstAmount =
        gstAmount != null ? gstAmount : purchaseData.tax_amount;
      values.taxableAmount =
        taxableAmount != null ? taxableAmount : purchaseData.taxable_amount;
      values.totalAmount =
        addTotal != null ? addTotal : purchaseData.total_amount;
      values.taxAmount = TaxAmount.length > 0 ? TaxAmount : [0];
      console.log(values.cgstAmount);
      setAll(values);
      const EditPurchase = async () => {
        const res = await apiPut(`/purchase`, values);
        setOpen(true);
        setTimeout(() => {
          navigate("/purchase-table");
        }, 3000);
        console.log(values);
      };
      EditPurchase();
      // console.log(values.productData);
    },
  });
  var gstSum = 0;
  const [gstSu, setGstSu] = useState(0); //hui
  const [gstRateS, setGstRateS] = useState([]);
  const [showRupee, setShowRupee] = useState(false);
  const [showPer, setPer] = useState(false);
  const [taxableAmount, setTaxableAmount] = useState(null);
  const [gstAmount, setGstAmount] = useState(null);
  const [count, setCount] = useState(0);
  const [gstAmountPer, setGstAmountPer] = useState(0);
  function handleChange(e, item, index, quantity, getNotify) {
    // Create copies of the current state
    let updatedRows = [...productRows];
    let updatedTax = [...TaxAmount];
    let totalAmount = 0;
    let taxableamount = 0;
    let gstSumAmount = 0;
    // Handle GST change
    if (getNotify === "gstChange") {
      setCount(1);
      let gstSumPer = 0;
      // Ensure discount_amountPer is defined and is a string
      const discountAmountPer = updatedRows[index].discount_amountPer;
      updatedRows[index].discount_amountPer =
        updatedRows[index].discount_amountPer + "_%";
      console.log(updatedRows[index].discount_amountPer);
      if (discountAmountPer !== "0_%" && discountAmountPer !== "0") {
        console.log("working");
        const spl = updatedRows[index].discount_amountPer.split("_");
        const spl1 = spl[0];
        updatedRows[index].discount_amountPer = spl1;
        // console.log(spl1);
        const term = e.target.value.split("_");
        const gstRate = parseFloat(term[1]);

        // console.log(gstRate);
        const a1 =
          parseFloat(updatedRows[index].quantity) *
          parseFloat(updatedRows[index].unitPrice);
        console.log(a1);
        const a2 =
          (parseFloat(updatedRows[index].quantity) *
            parseFloat(updatedRows[index].unitPrice) *
            parseFloat(spl1)) /
          100;
        console.log(a2);
        const discount = a1 - a2;
        updatedRows[index].taxable_amount = (parseFloat(discount)).toFixed(2);
        console.log(discount);
        const discount_amount = a1 - discount;
        console.log(discount_amount);
        const tax_amount = (discount * gstRate) / 100;
        console.log(tax_amount);
        updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2);
        console.log(updatedRows[index].total);
        updatedRows[index].gstRate = term[1];
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var j = 0; j < updatedRows.length; j++) {
          if (updatedRows[j].gstRate == term[1]) {
            gstSumPer += 1;
          }
        }
        console.log(gstSumPer);
        console.log("sum");
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }
        console.log(updatedTax);

        // Calculate the total GST amount
        const gstSum = parseFloat(
          updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
        );
        const gstR=[...gstRateS];
        gstR[index]=term[1];

        // Update state
        console.log(gstSumAmount);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setGstAmountPer((parseFloat(gstSumPer)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setGstRateS((parseFloat(gstR)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
        // const discount_amount=((updatedRows[index].quantity * updatedRows[index].unitPrice)-updatedRows[index].discount_amount);
      } else {
        const term = e.target.value.split("_");
        const gstRate = parseFloat(term[1]);
        console.log(updatedRows[index].discount_amount);

        const discount_amount =
          updatedRows[index].quantity * updatedRows[index].unitPrice -
          updatedRows[index].discount_amount;
        // setTaxableAmount(discount_amount);
        updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
        console.log(discount_amount);
        const tax_amount =
          ((item.quantity * item.unitPrice -
            updatedRows[index].discount_amount) *
            gstRate) /
          100;
        // Update the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)
        updatedRows[index].gstRate = term[1];
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

        // Calculate the total amount for all rows
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var j = 0; j < updatedRows.length; j++) {
          if (updatedRows[j].gstRate == term[1]) {
            gstSumPer += 1;
          }
        }
        console.log(gstSumPer);
        console.log("sum");
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // Calculate the total GST amount
        const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);
        const gstR=[...gstRateS];
        gstR[index]=term[1];
        // Update state
        // setGstAmount(gstSumAmount);
        // setGstAmountPer(gstSumPer);
        // setTaxableAmount(taxableamount);
        // setGstRateS(gstR);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setGstAmountPer((parseFloat(gstSumPer)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setGstRateS((parseFloat(gstR)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }

    // Handle quantity change
    if (getNotify === "qtyChange") {
      // Update the quantity for the current row
      if (updatedRows[index].discount_amountPer != "0_%") {
        if (updatedRows[index].discount_amountPer != "0") {
          const updateDiscountAmount = [...productAmount];
          console.log("working discount per");
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          console.log(quantity);
          updateDiscountAmount[index].amount =
            (parseFloat(updateDiscountAmount[index].per) *
              quantity *
              updatedRows[index].unitPrice) /
            100;
          console.log(updateDiscountAmount);
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = spl1;
          updatedRows[index].quantity = quantity;
          console.log(updatedRows[index].quantity);
          const a1 =
            parseFloat(updatedRows[index].quantity) *
            parseFloat(updatedRows[index].unitPrice);
          console.log(a1);
          const a2 =
            (parseFloat(updatedRows[index].quantity) *
              parseFloat(updatedRows[index].unitPrice) *
              parseFloat(spl1)) /
            100;
          console.log(a2);
          const discount = a1 - a2;
          updatedRows[index].taxable_amount = (parseFloat(discount)).toFixed(2)
          const tax_amount = (discount * currentGstRate) / 100;
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)
          console.log(updatedRows[index].total);
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
            taxableamount += parseFloat(row.taxable_amount);
          }
          console.log(taxableamount);
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
         const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        } else {
          console.log("else block executingg");
          updatedRows[index].quantity = quantity;
          const updateDiscountAmount = [...productAmount];
          console.log(updatedRows[index].quantity);
          if (updatedRows[index].discount_amountPer == "0") {
            updatedRows[index].discount_amountPer =
              updatedRows[index].discount_amountPer + "_%";
            const spl = updatedRows[index].discount_amountPer.split("_");
            const spl1 = spl[0];
            console.log(spl1);
            console.log("spl");
            updatedRows[index].discount_amountPer = spl1;
          }
          // Get the current GST rate for the row
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          const discount_amount =
            quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount;
          updateDiscountAmount[index].per =
            ((parseFloat(updateDiscountAmount[index].amount)).toFixed(2) /
              (quantity * (parseFloat(updatedRows[index].unitPrice))).toFixed(2)) *
            100;
          updateDiscountAmount[index].amount =
            (parseFloat(updatedRows[index].discount_amount)).toFixed(2);
          console.log(updateDiscountAmount);
          // setTaxableAmount(discount_amount);
          updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
          // Recalculate the tax amount based on the new quantity
          const tax_amount =
            ((quantity * updatedRows[index].unitPrice -
              updatedRows[index].discount_amount) *
              currentGstRate) /
            100;
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
             taxableamount += parseFloat(row.taxable_amount);
          }
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
          const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductAmount(updateDiscountAmount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductAmount(updateDiscountAmount);
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        }
      } else {
        console.log("else block executing");
        const updateDiscountAmount = [...productAmount];
        updatedRows[index].quantity = quantity;
        console.log(updatedRows[index].quantity);
        if (updatedRows[index].discount_amountPer == "0_%") {
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = spl1;
        }
        if (updatedRows[index].discount_amount == "") {
          updatedRows[index].discount_amount = "0";
          updateDiscountAmount[index].amount = "0";
        }
        // Get the current GST rate for the row
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const discount_amount =
          quantity * updatedRows[index].unitPrice -
          updatedRows[index].discount_amount;
        // updateDiscountAmount[index].per =
        //   (updateDiscountAmount[index].amount /
        //     (quantity * updatedRows[index].unitPrice)) *
        //   100;
        updateDiscountAmount[index].per =
        ((parseFloat(updateDiscountAmount[index].amount)).toFixed(2) /
          (quantity * (parseFloat(updatedRows[index].unitPrice))).toFixed(2)) *
        100;
        console.log(updateDiscountAmount);
        // setTaxableAmount(discount_amount);
        updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
        // Recalculate the tax amount based on the new quantity
        const tax_amount =
          ((quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount) *
            currentGstRate) /
          100;
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

        // Recalculate the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

        // Calculate the total amount for all rows
        totalAmount = 0; // Reset totalAmount before recalculating
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // Calculate the total GST amount
        const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

        // Update state
        // setGstAmount(gstSumAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }

    // Handle row removal
    if (getNotify === "remove") {
      const updatedRows = [...productRows];
      const updatedTax = [...TaxAmount];

      // Log the index and the row being removed for debugging
      console.log("Deleting row at index:", index);
      console.log("Row details before deletion:", updatedRows[index]);

      // Remove the row and corresponding tax amount
      updatedRows.splice(index, 1);
      updatedTax.splice(index, 1);
      console.log("Updated rows after deletion:", updatedRows);

      // Calculate the total amount for all remaining rows
      let totalAmount = 0; // Reset totalAmount before recalculating
      let taxableAmount = 0; // Reset taxableAmount before recalculating

      for (let row of updatedRows) {
        totalAmount += parseFloat(row.total) || 0; // Ensure to handle NaN
        taxableAmount += (parseFloat(row.taxable_amount)).toFixed(2) || 0; // Ensure to handle NaN
      }

      // Calculate GST sum from the updated tax array
      const gstSum = updatedTax.reduce(
        (accumulator, currentValue) =>
          accumulator + (parseFloat(currentValue) || 0),
        0
      );

      // Update state with the new values
      setTaxableAmount(taxableAmount);
      setGstSu(gstSum);
      setProductRows(updatedRows); // This will not immediately reflect in productRows
      setTaxAmount(updatedTax);
      setAddTotal(totalAmount.toFixed(2)); // Format totalAmount to two decimal places

      // Log the updated state (this will not show the updated state immediately)
      console.log(
        "Product rows after update (may not reflect immediately):",
        productRows
      );
    }

    // To see the updated productRows, you can use a useEffect hook
    if (getNotify == "discount") {
      if (e.target.name == "rupe") {
        const updateDiscountAmount = [...productAmount];
        setShowRupee(true);
        setPer(false);
        // const term = e.target.value.split("_");
        // const gstRate = parseFloat(term[1]);
        updatedRows[index].discount_amountPer = "0";
        const discount_amount = e.target.value != isNaN ? e.target.value : 0;
        updatedRows[index].discount_amount = (parseFloat(discount_amount)).toFixed(2);
        updateDiscountAmount[index].per =
          (parseFloat((discount_amount / (item.quantity * item.unitPrice)) * 100)).toFixed(2);
        updateDiscountAmount[index].amount = (parseFloat(discount_amount)).toFixed(2);
        console.log(updateDiscountAmount);
        console.log("calculating");
        const disamount = item.quantity * item.unitPrice - discount_amount;
        // setTaxableAmount(disamount);
        updatedRows[index].taxable_amount = (parseFloat(disamount)).toFixed(2);
        console.log(disamount);
        console.log(gstRateS);
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const tax_amount = (disamount * currentGstRate) / 100;
        console.log(currentGstRate);
        console.log(tax_amount);

        // Update the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + disamount)).toFixed(2)
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);
        // updatedRows[index].gstRate = term[1];

        // Calculate the total amount for all rows
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // // Calculate the total GST amount
       const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

        // // Update state
        // setGstRateS([...gstRateS, term[1]]);
        // setProductAmount(updateDiscountAmount);
        // setGstAmount(gstSumAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setProductAmount(updateDiscountAmount);
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
      if (e.target.name == "per") {
        setPer(true);
        setShowRupee(false);
        const add = e.target.value + "_%";
        console.log(add);
        const spli = add.split("_");
        const spl1 = spli[0];
        const updateDiscountAmount = [...productAmount];
        const discount_amount = spl1;
        if (e.target.value == "") {
          updatedRows[index].discount_amountPer = "0_%";
          updateDiscountAmount[index].amount = "0";
        } else {
          updatedRows[index].discount_amountPer = (parseFloat(spl1)).toFixed(2);
          updateDiscountAmount[index].amount =
            (parseFloat((spl1 * item.quantity * item.unitPrice) / 100)).toFixed(2);
          updateDiscountAmount[index].per = (parseFloat(spl1)).toFixed(2);
          console.log(updateDiscountAmount);
          updatedRows[index].discount_amount = "0";
        }
        console.log(updatedRows[index].discount_amountPer);
        const disamount =
          item.quantity * item.unitPrice -
          (item.quantity * item.unitPrice * discount_amount) / 100;
        updatedRows[index].taxable_amount = (parseFloat(disamount)).toFixed(2);
        // updatedRows[index].discount_amount=disamount;
        console.log(disamount);
        console.log(gstRateS);
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const tax_amount = (disamount * currentGstRate) / 100;
        console.log(currentGstRate);
        console.log(tax_amount);

        // Update the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + disamount)).toFixed(2)
        updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);
        // updatedRows[index].gstRate = term[1];

        // Calculate the total amount for all rows
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // // Calculate the total GST amount
        const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

        // // Update state
        // setGstRateS([...gstRateS, term[1]]);
        // setGstAmount(gstSumAmount);
        // setProductAmount(updateDiscountAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setProductAmount(updateDiscountAmount);
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }
    if (getNotify == "unitchange") {
      console.log(e.target.value);
      console.log("unit Price working");
      if (updatedRows[index].discount_amountPer != "0_%") {
        if (updatedRows[index].discount_amountPer != "0") {
          const updateDiscountAmount = [...productAmount];
          console.log("working discount per");
          updatedRows[index].unitPrice = e.target.value;
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          console.log(quantity);
          updateDiscountAmount[index].amount =
            (parseFloat((parseFloat(updateDiscountAmount[index].per) *
              updatedRows[index].quantity *
              updatedRows[index].unitPrice) /
            100)).toFixed(2);
          console.log(updateDiscountAmount);
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = (parseFloat(spl1)).toFixed(2);
          console.log(updatedRows[index].unitPrice);
          const a1 =
            parseFloat(updatedRows[index].quantity) *
            parseFloat(updatedRows[index].unitPrice);
          console.log(a1);
          const a2 =
            (parseFloat(updatedRows[index].quantity) *
              parseFloat(updatedRows[index].unitPrice) *
              parseFloat(spl1)) /
            100;
          console.log(a2);
          const discount = a1 - a2;
          updatedRows[index].taxable_amount = (parseFloat(discount)).toFixed(2)
          const tax_amount = (discount * currentGstRate) / 100;
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)
          console.log(updatedRows[index].total);
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
             taxableamount += parseFloat(row.taxable_amount);
          }
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
          const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        } else {
          console.log("else block executingg");
          const quantity = parseFloat(updatedRows[index].quantity);
          updatedRows[index].unitPrice = e.target.value;
          const updateDiscountAmount = [...productAmount];
          console.log(updatedRows[index].unitPrice);
          if (updatedRows[index].discount_amountPer == "0") {
            updatedRows[index].discount_amountPer =
              updatedRows[index].discount_amountPer + "_%";
            const spl = updatedRows[index].discount_amountPer.split("_");
            const spl1 = spl[0];
            console.log(spl1);
            console.log("spl");
            updatedRows[index].discount_amountPer = spl1;
          }
          // Get the current GST rate for the row
          const currentGstRate = gstRateS[index]
            ? parseFloat(updatedRows[index].gstRate)
            : 0;
          const discount_amount =
            quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount;
          updateDiscountAmount[index].per =
            (parseFloat(updateDiscountAmount[index].amount /
              (quantity * updatedRows[index].unitPrice)) *
            100).toFixed(2);
          updateDiscountAmount[index].amount =
            (parseFloat(updatedRows[index].discount_amount)).toFixed(2);
          console.log(updateDiscountAmount);
          // setTaxableAmount(discount_amount);
          updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
          // Recalculate the tax amount based on the new quantity
          const tax_amount =
            ((quantity * updatedRows[index].unitPrice -
              updatedRows[index].discount_amount) *
              currentGstRate) /
            100;
            updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

          // Recalculate the total for the current row
          updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

          // Calculate the total amount for all rows
          totalAmount = 0; // Reset totalAmount before recalculating
          for (let row of updatedRows) {
            totalAmount += parseFloat(row.total);
             taxableamount += parseFloat(row.taxable_amount);
          }
          for (var i = 0; i < updatedTax.length; i++) {
            gstSumAmount += parseFloat(updatedTax[i]);
          }

          // Calculate the total GST amount
         const gstSum = parseFloat(
  updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
);

          // Update state
          // setGstAmount(gstSumAmount);
          // setTaxableAmount(taxableamount);
          // setProductAmount(updateDiscountAmount);
          // setProductRows(updatedRows);
          // setTaxAmount(updatedTax);
          // setAddTotal(totalAmount.toFixed(2));
          // setGstSu(gstSum);
          setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
          setProductAmount(updateDiscountAmount);
          setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
          setProductRows(updatedRows);
          setTaxAmount(updatedTax);
          setAddTotal(totalAmount.toFixed(2));
          setGstSu((parseFloat(gstSum)));
        }
      } else {
        console.log("else block executing");
        const updateDiscountAmount = [...productAmount];
        const quantity = parseFloat(updatedRows[index].quantity);
        updatedRows[index].unitPrice = e.target.value;
        console.log(updatedRows[index].unitPrice);
        if (updatedRows[index].discount_amountPer == "0_%") {
          updatedRows[index].discount_amountPer =
            updatedRows[index].discount_amountPer + "_%";
          const spl = updatedRows[index].discount_amountPer.split("_");
          const spl1 = spl[0];
          console.log(spl1);
          console.log("spl");
          updatedRows[index].discount_amountPer = spl1;
        }
        if (updatedRows[index].discount_amount == "") {
          updatedRows[index].discount_amount = "0";
          updateDiscountAmount[index].amount = "0";
        }
        // Get the current GST rate for the row
        const currentGstRate = gstRateS[index]
          ? parseFloat(updatedRows[index].gstRate)
          : 0;
        const discount_amount =
          quantity * updatedRows[index].unitPrice -
          updatedRows[index].discount_amount;
        updateDiscountAmount[index].per =
          ((parseFloat(updateDiscountAmount[index].amount /
            (quantity * updatedRows[index].unitPrice)) *
          100)).toFixed(2);
        console.log(updateDiscountAmount);
        // setTaxableAmount(discount_amount);
        updatedRows[index].taxable_amount = (parseFloat(discount_amount)).toFixed(2);
        // Recalculate the tax amount based on the new quantity
        const tax_amount =
          ((quantity * updatedRows[index].unitPrice -
            updatedRows[index].discount_amount) *
            currentGstRate) /
          100;
          updatedTax[index] = (parseFloat(tax_amount)).toFixed(2);

        // Recalculate the total for the current row
        updatedRows[index].total = (parseFloat(tax_amount + discount_amount)).toFixed(2)

        // Calculate the total amount for all rows
        totalAmount = 0; // Reset totalAmount before recalculating
        for (let row of updatedRows) {
          totalAmount += parseFloat(row.total);
           taxableamount += parseFloat(row.taxable_amount);
        }
        for (var i = 0; i < updatedTax.length; i++) {
          gstSumAmount += parseFloat(updatedTax[i]);
        }

        // Calculate the total GST amount
        const gstSum = parseFloat(
          updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
        );

        // Update state
        // setGstAmount(gstSumAmount);
        // setTaxableAmount(taxableamount);
        // setProductRows(updatedRows);
        // setTaxAmount(updatedTax);
        // setAddTotal(totalAmount.toFixed(2));
        // setGstSu(gstSum);
        setGstAmount((parseFloat(gstSumAmount)).toFixed(2));
        setTaxableAmount((parseFloat(taxableamount)).toFixed(2));
        setProductRows(updatedRows);
        setTaxAmount(updatedTax);
        setAddTotal(totalAmount.toFixed(2));
        setGstSu((parseFloat(gstSum)));
      }
    }
  }
  useEffect(() => {
    console.log("Updated productRows:", productRows);
  }, [productRows]);
  const handleDeleteRow = (index) => {
    // Create copies of the current state to avoid direct mutation
    const updatedRows = [...productRows];
    const updatedTax = [...TaxAmount];
    const updateddisp = [...disabl];
    const updatedProductAmount = [...productAmount];

    // Log the index and the row being removed for debugging
    console.log("Deleting row at index:", index);
    if (updatedRows.length == 1) {
      console.log("worked");
      setdisabl([1]);
    }
    console.log("Row details before deletion:", updatedRows[index]);

    for (var k = 0; k < updatedRows.length; k++) {
      if (updatedRows[k].quantity == "") {
        updatedRows[k].quantity = "0";
      }
    }

    // Remove the row and corresponding tax amount
    if (index >= 0 && index < updatedRows.length) {
      updatedRows.splice(index, 1);
      updateddisp.splice(index, 1);
      updatedTax.splice(index, 1);
      updatedProductAmount.splice(index, 1);
    } else {
      console.error("Index out of bounds:", index);
    }

    // Calculate the total amount for all remaining rows
    let totalAmount = 0; // Reset totalAmount before recalculating
    let taxableAmount = 0; // Reset taxableAmount before recalculating
    let gstSumAmount = 0;

    for (let row of updatedRows) {
      totalAmount += parseFloat(row.total) || 0; // Ensure to handle NaN
      taxableAmount += parseFloat(row.taxable_amount) || 0; // Ensure to handle NaN
    }
    for (var i = 0; i < updatedTax.length; i++) {
      gstSumAmount += parseFloat(updatedTax[i]) || 0;
    }
    if (!updatedRows.length) {
      console.log(gstAmountPer);
      setGstAmountPer(gstAmountPer + 1);
    } else {
      setGstAmountPer(gstAmountPer - 1);
    }
    // Calculate GST sum from the updated tax array
    const gstSum = parseFloat(
      updatedTax.reduce((acc, val) => acc + parseFloat(val || 0), 0).toFixed(2)
    );

    // Update state with the new values
    setdisabl(updateddisp);
    setProductAmount(updatedProductAmount);
    setGstAmount(gstSumAmount);
    setTaxableAmount(taxableAmount);
    setGstSu(gstSum);
    setProductRows(updatedRows);
    setTaxAmount(updatedTax);
    setAddTotal(totalAmount.toFixed(2)); // Format totalAmount to two decimal places
  };
  function handleFocus(e, index, name) {
    if (name == "qty") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].quantity = "";
      setProductRows(updatedRows);
    }
    if (name == "rupe") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].discount_amount = "";
      setProductRows(updatedRows);
    }
    if (name == "proD") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].productDescription = "";
      setProductRows(updatedRows);
    }
    if (name == "dis") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].discount_amountPer = "0_%";
      setProductRows(updatedRows);
    }
    if (name == "unitChange") {
      console.log("working");
      const updatedRows = [...productRows];
      updatedRows[index].unitPrice = "";
      console.log(e.target.value);
      setProductRows(updatedRows);
    }
  }
  const [isEditable, setIsEditable] = useState(false);
  useEffect(() => {
    const dt = new Date();
    setDate(dt.toLocaleDateString());
    //  setDueDate(dt.getDate()+7+"/"+date.getMonth()+"/"+date.getFullYear());
    console.log(dt.toLocaleDateString());
    const getBussinessProfile = async () => {
      const responseb = await apiGet("/businessprofile");
      console.log(responseb);
      setBusinessProfile(responseb);
    };
    getBussinessProfile();
    const fetchProduct = async () => {
      const res = await apiGet("/products/productName");
      setProducts(res);
      const res1 = await apiGet("/customers");
      //   const updateState = (prevCustomers) => {
      //     return [...prevCustomers, ...res1]; // Spread the previous customers and add new ones
      // };

      setCustomer(res1);
      console.log(res1);
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    const number = location.state?.data?.mobile_no; // Use optional chaining
    const id = location.state?.data?.purchase_id; // Use optional chaining
    console.log(number);
    console.log(id);
    console.log(location.state.data);
    setPurchasePreview([location.state.data]);

    const fetchPurchaseProduct = async () => {
      const res = await apiGet(`/purchase/${id}`);
      console.log(res.data);
      // Clear existing product rows before setting new ones
      const updatedRows = res.data.map((item) => ({
        id: item.product_id, // or use a unique identifier from the item if available
        productName: item.productname,
        hsnCode: item.hsncode,
        gstRate: item.gstrate,
        unitPrice: item.unitprice,
        quantity: item.quantity,
        total: item.total,
        discount_amount: item.discount_amount,
        discount_amountPer: item.discount_amount_per,
        taxable_amount: item.taxableamount,
        productDescription: item.productdescription,
      }));
      const updateMe = res.data.map((item) => 0);
      setdisabl(updateMe);
      const updated = res.data.map((item) => ({
        amount: item.discount_amount,
        per: item.discount_amount_per,
      }));
      const updateTax = res.data.map((item) => item.calculatedgst);
      const updateGst = res.data.map((item) => item.gstrate);
      console.log(updated);
      console.log("working");
      setProductAmount(updated);
      console.log(updateGst);
      setGstRateS(updateGst);
      setTaxAmount(updateTax);
      setProductRows(updatedRows);
      setpurchaseProduct(res.data);
    };

    fetchPurchaseProduct();
  }, [location.state]);

  // Check if challanPreview has data before rendering
  if (!purchasePreview.length) {
    return <Loader />;
  }

  // Assuming the first element contains the necessary data
  function fetchAmountToWord(totall) {
    console.log(totall);
    console.log("i am totall");
    let result = ""; // Initialize result as an empty string
    const units = ["", " lakh", " crore"]; // Units for Indian numbering system
    if (totall >= 10000000) {
      // Check if num is 10 million or more
      console.log("working");
      const crores = Math.floor(totall / 10000000); // crores = 1
      result += toWords(crores) + units[2]; // result = "1 crore"
      totall %= 10000000; // num = 5000000
      setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
    }

    // Handle lakhs
    if (totall >= 100000) {
      // Check if num is 100,000 or more
      const lakhs = Math.floor(totall / 100000); // lakhs = 5
      result += (result ? " " : "") + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
      totall %= 100000; // num = 0
      setAmountWords(result.toUpperCase() + " RUPEES ONLY/-");
      console.log("totall remaining" + totall);
    }
    // Handle thousands and below
    if (totall > 0) {
      // Check if num is greater than 0
      const word = toWords(parseFloat(totall, 10));
      setAmountWords(
        result.toUpperCase() + " " + word.toUpperCase() + " RUPEES ONLY/-"
      );
    }
  }
  function handleEditable() {
    console.log("execute");
    setIsEditable(true);
  }
  function handleInvoiceChange(e) {
    console.log(all);
  }
  function handleDescriptionAdd(e, index) {
    const updateDescription = [...productRows];
    updateDescription[index].productDescription = e.target.value;
    setProductRows(updateDescription);
    console.log(updateDescription);
  }
  return (
    <div className="">
      <div
        className="over sm:flex sm:justify-center block"
        style={{ overflow: "scroll", height: "99vh" }}
      >
        <div className="py-6">
          <div className="w-full max-w-7xl p-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
            Update Details
            </h2>

            <NavLink
              to="/purchase-table"
              className="text-white text-decoration-none"
            >
              <ButtonComponent
                type="button"
                className=" bg-[#3A5B76] float-end px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
                value="close"
                children={<Close />}
              />
            </NavLink>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div>
                  <InputComponent
                    labelName="purchaseDate"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Sales Purchase Date:"
                    onChange={formik.handleChange}
                    type="text"
                    name="purchaseDate"
                    placeholder="date.month.year"
                    onFocus={handleEditable}
                    {...(isEditable
                      ? {}
                      : { value: purchaseData.purchase_date })} // Use optional chaining)}
                    required
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="purchaseDate"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Due Purchase Date:"
                    onChange={formik.handleChange}
                    type="text"
                    name="purchaseDueDate"
                    placeholder="date.month.year"
                    onFocus={handleEditable}
                    {...(isEditable ? {} : { value: purchaseData.due_date })} // Use optional chaining)}
                    required
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="purchasePrefix"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Purchase Prefix Date:"
                    onChange={formik.handleChange}
                    type="text"
                    name="purchasePrefix"
                    placeholder="purchase Prefix"
                    onFocus={handleEditable}
                    {...(isEditable
                      ? {}
                      : { value: purchaseData.purchase_prefix })} // Use optional chaining)}
                    readOnly
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="paymentTerms"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Payment Terms:"
                    onChange={formik.handleChange}
                    type="text"
                    name="paymentTerms"
                    placeholder="payment terms"
                    readOnly
                    onFocus={handleEditable}
                    {...(isEditable
                      ? {}
                      : { value: purchaseData.payment_terms })} // Use optional chaining)}
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="originalInvoiceNumber"
                    onChange={formik.handleChange}
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Original Invoice Number"
                    onFocus={handleEditable}
                    {...(isEditable
                      ? {}
                      : { value: purchaseData.original_invoice_number })} // Use optional chaining)}
                    type="text"
                    name="originalInvoiceNumber"
                    placeholder="Enter original invoice number"
                    required
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="customerName"
                    onChange={formik.handleChange}
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Customer Name"
                    onFocus={handleEditable}
                    {...(isEditable
                      ? {}
                      : { value: purchaseData.customername })} // Use optional chaining)}
                    type="text"
                    name="customerName"
                    placeholder="Enter Customer name"
                    required
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                {/* <div>
                  <InputComponent
                    labelName="reference"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Reference"
                    type="text"
                    value={purchaseData?.reference || ''} // Use optional chaining
                    name="references"
                    placeholder="Enter Reference details"
                    required
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div> */}
              </div>
              <div className="mb-6 overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-200 text-[#2D465B]">
                    <tr>
                      <th className="p-2 border">S.No</th>
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
                            onChange={formik.handleChange}
                            type="number"
                            name="sNo"
                            value={index + 1}
                            readOnly
                            classNameInput="w-10 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          />
                        </td>
                        <td className="w-80">
                          <select
                            disabled={disabl!=null && disabl[index]==0}
                            className="w-80 p-2 border border-gray-300 hover:bg-gray-200"
                            name="productdetail"
                            onChange={(e) =>
                              handleProductChange(index, e.target.value)
                            }
                            value={product.productName}
                          >
                            <option value="">Select</option>
                            {products.map((product) => (
                              <option
                                key={product.product_name}
                                value={product.product_name}
                              >
                                {product.product_name}
                              </option>
                            ))}
                            <option value="addProduct" className="bg-[#2D465B] text-white">Add Product</option>
                          </select>
                        </td>
                        <td className="w-30">
                          <InputComponent
                            onChange={formik.handleChange}
                            type="text"
                            name="HSNCode"
                            value={product.hsnCode}
                            min="0"
                            classNameInput="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          />
                        </td>
                        <td className="w-20">
                          <InputComponent
                            onChange={formik.handleChange}
                            type="number"
                            min="0"
                            name="quantity"
                            onFocus={(e) => handleFocus(e, index, "qty")}
                            {...(product.quantity != ""
                              ? { value: product.quantity }
                              : {})}
                            onBlur={(e) =>
                              handleChange(
                                e,
                                product,
                                index,
                                e.target.value,
                                "qtyChange"
                              )
                            }
                            classNameInput="w-20 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                            placeholder="Quantity"
                          />
                        </td>
                        <td className="w-40">
                          <InputComponent
                            type="number"
                            step="any"
                            name="unitPrice"
                            onFocus={(e) => handleFocus(e, index, "unitChange")}
                            {...(product.unitPrice != ""
                              ? { value: product.unitPrice }
                              : {})}
                            onBlur={(e) =>
                              handleChange(
                                e,
                                product,
                                index,
                                e.target.value,
                                "unitchange"
                              )
                            }
                            min="0"
                            classNameInput="w-40 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          />
                        </td>
                        <td className="w-30">
                          <InputComponent
                            type="number"
                            name="rupe"
                            step="any"
                            min="0"
                            onFocus={(e) => handleFocus(e, index, "rupe")}
                            {...(product.discount_amount != ""
                              ? { value: productAmount[index].amount }
                              : {})}
                            onBlur={(e) =>
                              handleChange(e, product, index, 0, "discount")
                            }
                            placeholder="₹"
                            classNameInput="w-30 p-2 border border-gray-300  hover:bg-gray-200"
                          />
                        </td>
                        <td className="w-40">
                          <select
                            onChange={(e) =>
                              handleChange(e, product, index, 0, "gstChange")
                            }
                            // value={product.gstRate}
                            className="w-40 border d-inline-block border-gray-300 rounded-md p-2"
                          >
                            <option className="bg-gray" readOnly value={"gst_"}>{count==0?product.gstRate:(productRows.length?product.gstRate:"")}</option>
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
                        </td>
                        <td className="w-40">
                          <InputComponent
                            onChange={formik.handleChange}
                            type="number"
                            step="any"
                            name="taxableAmount"
                            value={product.taxable_amount}
                            min="0"
                            readOnly
                            classNameInput="w-40 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          />
                        </td>
                        <td>
                          <ButtonComponent
                            type="button"
                            className="p-1 m-auto w-100 text-white bg-red-500 rounded hover:bg-red-600"
                            value="remove"
                            onClick={() => handleDeleteRow(index)}
                          >
                            <DeleteForever />
                          </ButtonComponent>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={4}>
                          <textarea
                            onFocus={(e) => handleFocus(e, index, "proD")}
                            {...(product.productDescription != ""
                              ? { value: product.productDescription }
                              : {})}
                            onBlur={(e) => handleDescriptionAdd(e, index)}
                            name="productDescription"
                            placeholder="Enter product description"
                            className="bg-white w-full border border-gray-300 hover:bg-gray-200"
                            id=""
                          ></textarea>
                        </td>
                        <td className="w-30">
                          <InputComponent
                            onBlur={(e) =>
                              handleChange(e, product, index, 0, "discount")
                            }
                            type="number"
                            step="any"
                            min="0"
                            max="100"
                            name="per"
                            placeholder="%"
                            onFocus={(e) => handleFocus(e, index, "dis")}
                            {...(product.discount_amountPer != "0_%"
                              ? { value: productAmount[index].per }
                              : {})}
                            classNameInput="w-30 mb-2 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          />
                        </td>
                        <td className="w-40">
                          {TaxAmount[index] !== "NaN" ? (
                            <div>
                              <input
                                className="w-40 mb-2 p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                                // value={"Rs." + TaxAmount[index]}
                                value={TaxAmount[index]!=undefined?("₹" + TaxAmount[index]):("₹ 0.00")}
                              ></input>
                            </div>
                          ) : (
                            <span className="w-40">0.00</span>
                          )}
                        </td>
                        <td></td>
                      </tr>
                    </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="relative w-full p-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                <button
                  type="button"
                  className="mt-3 px-2 border rounded border-[#3A5B76] text-[#3A5B76] font-semibold rounded hover:bg-[#2E4A62] hover:text-white"
                  onClick={handleAddProductRow}
                >
                  +ADD ITEM
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div>
                  <InputComponent
                    labelName="sgst"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="SGST:"
                    type="number"
                    name="sgst"
                    onChange={formik.handleChange}
                    readOnly
                    value={addTotal == null ? purchaseData.sgst : gstAmount / 2}
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="cgst"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="CGST:"
                    type="number"
                    name="cgst"
                    onChange={formik.handleChange}
                    readOnly
                    value={addTotal == null ? purchaseData.cgst : gstAmount / 2}
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="subTotal"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Taxable Amount:"
                    type="number"
                    onChange={formik.handleChange}
                    name="taxableAmount"
                    readOnly
                    value={
                      taxableAmount == null
                        ? purchaseData.taxable_amount
                        : taxableAmount
                    } // Use optional chaining
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="totalGstAmount"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Tax Amount:"
                    type="number"
                    onChange={formik.handleChange}
                    name="totalGstAmount"
                    readOnly
                    value={
                      gstAmount == null ? purchaseData.tax_amount : gstAmount
                    } // Use optional chaining
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
                <div>
                  <InputComponent
                    labelName="totalAmount"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Total Amount:"
                    type="number"
                    name="totalAmount"
                    onChange={formik.handleChange}
                    readOnly
                    value={
                      addTotal == null ? purchaseData.total_amount : addTotal
                    }
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
                <div>
                  <InputComponent
                    labelName="Amountinwords"
                    classNameLabel="block mb-2 font-semibold text-gray-700"
                    labelInput="Amount in Words:"
                    type="text"
                    name="Amountinwords"
                    readOnly
                    value={amount_to_words}
                    classNameInput="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  />
                </div>
              </div> */}

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                {purchaseData.add_notes ? (
                  <div>
                    <label
                      htmlFor="challanNotes"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Notes:
                    </label>
                    <textarea
                      id="purchaseNotes"
                      {...(!isEditable
                        ? { value: purchaseData?.add_notes || "" }
                        : {})}
                      name="purchaseNotes"
                      onFocus={isEditable}
                      onChange={formik.handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                      placeholder="Any additional notes..."
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-10 text-end">
                <ButtonComponent
                  value="Submit"
                  type="submit"
                  label="Update"
                  className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                ></ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        style={{ position: "absolute", bottom: "75%", left: "40%" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Purchase updated succesfully
        </Alert>
      </Snackbar>
    </div>
  );
}
