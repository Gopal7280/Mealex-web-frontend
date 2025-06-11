import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { apiPost, apiPut } from '../../services/api';
import { ButtonComponent } from '../../components/Button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Preview, ModeEdit, DeleteForever, Close } from '@mui/icons-material';
import { FaEdit } from 'react-icons/fa';

export function ExpenseView() {
  const navigate = useNavigate();
  const [addCategory, setAddCategory] = useState('');
  const [expenseCategory, setExepenseCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const location = useLocation();
  const [fieldEdit, setFieldEdit] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  useEffect(() => {
    console.log(location?.state);
    setExpenseData(location?.state?.data);
  }, [location.state]);
  const formik = useFormik({
    initialValues: {
      expenseId:"",
      employeName: location?.state?.data.expense_employee_name,
      expenseAmount: location?.state?.data.expense_amount,
      date: location?.state?.data.expense_date,
      categoryOfPayment: location?.state?.data.expense_payment_mode,
      expenseCategory: location?.state?.data.expense_category_name,
      expenseDescription: location?.state?.data.expense_description,
    },
    onSubmit: values => {
      values.expenseId=expenseData.expense_id;
      if (expenseCategory != '') {
        values.expenseCategory = expenseCategory;
      }
      console.log(values);
      const updateExpense = async () => {
        try {
          const res = await apiPut('/expenses',values);
          navigate('/expenseManager');
        } catch (err) {
          console.log(err);
        }
      };
      updateExpense();
    },
  });
  function handleEdit(e) {
    setVisible(true);
  }
  function handleExpenseCategoryAdd(e) {
    const newCategory = document.getElementById('newCategory').value;
    // formik.values.product_category=newCategory;
    setAddCategory(newCategory);
    setExepenseCategory(newCategory);
    // console.log(formik.values.product_category);
    setVisibleCategory(false);
  }
  function handleCategoryChange(e) {
    setAddCategory('');
    if (e.target.value == 'otherCategory') {
      setVisibleCategory(true);
      return;
    }
    console.log(e.target.value);
    setExepenseCategory(e.target.value);
  }
  function handleEditField(e) {
    setFieldEdit(true);
  }
  return (
    <>
      <div className="border border-1 p-4 rounded-2xl bg-white mt-3">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-center mb-6">View Details</h1>
          <div className="flex justify-between">
            <button className="" onClick={handleEdit}>
              <FaEdit className="iconSize" />
            </button>
            <Dialog
              header="Update expense details"
              visible={visible}
              className="sm:w-1/2 mt-2"
              onHide={() => {
                if (!visible) return;
                setVisible(false);
                setFieldEdit(false);
              }}
            >
              <div className="border border-1 p-4 rounded-2xl">
                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="employeName">Employee Name</label>
                      <InputText
                        onFocus={handleEditField}
                        {...(fieldEdit
                          ? {}
                          : { value: expenseData.expense_employee_name })}
                        onChange={formik.handleChange}
                        id="employeName"
                        name="employeName"
                        placeholder="Enter user name"
                        aria-describedby="username-help"
                      />
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor="amount">Amount</label>
                      <InputText
                        onFocus={handleEditField}
                        {...(fieldEdit
                          ? {}
                          : { value: expenseData.expense_amount })}
                        type="number"
                        onChange={formik.handleChange}
                        id="expenseAmount"
                        name="expenseAmount"
                        placeholder="Amount (INR)"
                        aria-describedby="username-help"
                      />
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor="date">Date</label>
                      <input
                        name="date"
                        onFocus={handleEditField}
                        {...(fieldEdit
                          ? { type: 'date' }
                          : { value: expenseData.expense_date, type: 'date' })}
                        onChange={formik.handleChange}
                        className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                      />
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor="expenseCategory">Select Category</label>
                      <select
                        onFocus={handleEditField}
                        onChange={handleCategoryChange}
                        name="expenseCategory"
                        className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                        id=""
                      >
                        <option value="notDescribed">
                          {expenseData.expense_category_name}
                        </option>
                        <option value="travel">Travel</option>
                        <option value="officeSupplies">Office Supplies</option>
                        <option
                          value="otherCategory"
                          className="bg-[#3A5B76] text-white"
                        >
                          {addCategory == '' ? 'add category' : addCategory}
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor="paymentMode">Select Payment Mode</label>
                      <select
                        onFocus={handleEditField}
                        onChange={formik.handleChange}
                        name="categoryOfPayment"
                        className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                        id=""
                      >
                        <option value="notDescribed">
                          {expenseData.expense_payment_mode}
                        </option>
                        <option value="cash">CASH</option>
                        <option value="upi">UPI</option>
                        <option value="bank">BANK</option>
                        <option value="cheque">CHEQUE</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea
                      onFocus={handleEditField}
                      {...(fieldEdit
                        ? {}
                        : { value: expenseData.expense_description })}
                      onChange={formik.handleChange}
                      name="expenseDescription"
                      placeholder="description"
                      className="w-full mt-5 p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                      id=""
                    ></textarea>
                  </div>
                  <ButtonComponent
                    value="Submit"
                    type="submit"
                    label="Save"
                    className="px-20 mt-2 w-full py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                  ></ButtonComponent>
                </form>
              </div>
            </Dialog>
            <NavLink
              to="/expenseManager"
              className="text-white text-decoration-none mt-3"
            >
              <ButtonComponent
                type="button"
                className=" bg-[#3A5B76] px-2 py-1 text-white font-bold rounded hover:bg-[#2E4A62]"
                value="close"
                children={<Close />}
              />
            </NavLink>
          </div>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-column gap-2">
              <label htmlFor="employeName">Employee Name</label>
              <InputText
                readOnly
                value={expenseData.expense_employee_name}
                id="employeName"
                name="employeName"
                placeholder="Enter user name"
                aria-describedby="username-help"
              />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="amount">Amount</label>
              <InputText
                type="text"
                value={expenseData.expense_amount}
                readOnly
                id="expenseAmount"
                name="expenseAmount"
                placeholder="Amount (INR)"
                aria-describedby="username-help"
              />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="text">Date</label>
              <input
                value={expenseData.expense_date}
                name="date"
                className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                type="date"
              />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="expenseCategory">Expense Category</label>
              <select
                readOnly
                disabled
                name="expenseCategory"
                className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                id=""
              >
                <option value="notDescribed">
                  {expenseData.expense_category_name}
                </option>
                <option value="travel">Travel</option>
                <option value="officeSupplies">Office Supplies</option>
              </select>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="paymentMode">Select Payment Mode</label>
              <select
                disabled
                onChange={formik.handleChange}
                name="categoryOfPayment"
                className="p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
                id=""
              >
                <option value="notDescribed">
                  {expenseData.expense_payment_mode}
                </option>
                <option value="cash">CASH</option>
                <option value="upi">UPI</option>
                <option value="bank">BANK</option>
                <option value="cheque">CHEQUE</option>
              </select>
            </div>
          </div>
          <div>
            <textarea
              readOnly
              value={expenseData.expense_description}
              name="expenseDescription"
              placeholder="description"
              className="w-full mt-5 p-[0.76rem] border-1 border-[#d1d5db] rounded-[6px]"
              id=""
            ></textarea>
          </div>
        </form>
        {/* dialog for add new category */}
        <Dialog
          header="Add Category"
          visible={visibleCategory}
          onHide={() => {
            if (!visibleCategory) return;
            setVisibleCategory(false);
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
                placeholder="Enter expense category"
              />
            </dd>
          </dl>
          <ButtonComponent
            onClick={e => handleExpenseCategoryAdd(e)}
            label="Add"
            type="submit"
            className="bg-[#3A5B76] text-white px-8 py-2 rounded hover:bg-[#2E4A63]"
          ></ButtonComponent>
        </Dialog>
      </div>
    </>
  );
}
