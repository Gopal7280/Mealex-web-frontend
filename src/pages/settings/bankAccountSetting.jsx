import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "../../services/api";
import { useFormik } from "formik";
import { ButtonComponent } from "../../components/Button";
import { InputComponent } from "../../components/Input";
import { Dialog } from 'primereact/dialog';
import { SearchComponent } from "../../components/SerachBar";
import { TableComponent } from "../../components/Table";
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from "react-router-dom";
export function BankAccountSetting() {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [run, setRun] = useState(false);
  const column = [
    'S.No',
    'Account Holder Name',
    'Account No',
    'Account Type',
    'IFSC Code',
    'Bank Name',
  ];
  const navigate=useNavigate();
  useEffect(() => {
    const fetchBussiness = async () => {
          try {
            const res = await apiGet('/businessprofile');
            if (res.length === 0) {
              navigate('/profile_form');
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchBussiness();
    const fetchAccount = async () => {
      // setLoader(false); // Start loading
      try {
        const res = await apiGet('/bankaccount');
        console.log(res.data);
        setBankData(res.data);
        for (var i of res.data) {
          if (i.is_active) {
            setChecked1(i.bank_serial_number);
          }
        }
        // setTotal(res.data.length);
        console.log('bank response', res);

        if (res.length === 0) {
          toast.current.show({
            severity: 'info',
            summary: 'Info',
            detail: 'No bank account available. Please add a account.',
            life: 2000,
          });
        }
      } catch (error) {
        console.error('Error fetching bank account:', error);
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch bank account.',
          life: 2000,
        });
      } finally {
        // setLoader(true); // Stop loading
      }
    };

    fetchAccount();
  }, [run]);
  const [search, setSearch] = useState(''); // Search state
  const filteredUsers = bankData.filter(data =>
    `${data.bank_account_name} ${data.bank_account_number} ${data.bank_account_type} ${data.bank_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const dataTable = filteredUsers.map(value => ({
    sNo: value.bank_serial_number,
    name: value.bank_account_name,
    bankAccountNumber: value.bank_account_number,
    accountType: value.bank_account_type,
    ifscCode: value.bank_ifsc_code,
    bankName: value.bank_name,
  }));
  const formik = useFormik({
    initialValues: {
      accountHolderName: '',
      accountNo: '',
      ifscCode: '',
      bankBranchName: '',
      accountType: '',
    },
    onSubmit: values => {
      console.log(values);
      const addBankAccount = async () => {
        try {
          const res = await apiPost('/bankaccount', values);
          setRun(!run);
          setVisible(false);
        } catch (err) {
          console.log(err);
        }
      };
      addBankAccount();
    },
  });
  function handleAccountAtiveStatus(e, aNo, sno) {
    for (var i of bankData) {
      if (sno == i.bank_serial_number) {
        setChecked1(sno);
        const bankAccountId = {
          bankAccountId: i.bank_account_id,
        };
        console.log(bankAccountId);
        const addActiveStatus = async () => {
          try {
            const res = await apiPost('/setting/setbankaccount', bankAccountId);
            setRun(!run);
          } catch (err) {
            console.log(err);
          }
        };
        addActiveStatus();
      }
    }
  }
  return (
    <div>
      <div className="max-w-7xl mt-2 mx-auto bg-white p-5 shadow-lg responsive-head rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-start mb-3">Bank Account Setting</h2>
          <div className="flex space-x-3">
            {/* <button
                        disabled
                        className="disabled:opacity-80 disabled:bg-gray-400 bg-[#3A5B76] text-white me-3 px-4 py-2 rounded hover:bg-[#2D465B]"
                      >
                        Bulk Upload
                      </button> */}
            <div className="button-align">
              <ButtonComponent
                onClick={() => setVisible(true)}
                className="bg-[#3A5B76] text-white px-4 py-2 rounded hover:bg-[#2D465B]"
                label="Add Bank Account"
                value="addAccount"
              ></ButtonComponent>
              <Dialog
                header="Add Bank Account"
                visible={visible}
                className="sm:w-1/2 ms-20"
                onHide={() => {
                  if (!visible) return;
                  setVisible(false);
                }}
              >
                <form className="mt-4" onSubmit={formik.handleSubmit}>
                  <div className="text-bold grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <InputComponent
                        onChange={formik.handleChange}
                        labelName="accountHolderName"
                        classNameLabel="block mb-2 font-semibold text-gray-700"
                        labelInput="Account Holder Name:"
                        type="text"
                        name="accountHolderName"
                        placeholder="enter account holder name"
                        required
                        classNameInput="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                      />
                    </div>
                    <div>
                      <InputComponent
                        onChange={formik.handleChange}
                        labelName="accountNo"
                        classNameLabel=" block mb-2 font-semibold text-gray-700"
                        labelInput="Account No:"
                        type="text"
                        name="accountNo"
                        placeholder="Enter Account no"
                        required
                        classNameInput="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                      />
                    </div>
                    <div>
                      <InputComponent
                        onChange={formik.handleChange}
                        labelName="ifscCode"
                        classNameLabel=" block mb-2 font-semibold text-gray-700"
                        labelInput="IFSC Code:"
                        type="text"
                        name="ifscCode"
                        placeholder="enter ifsc code"
                        required
                        classNameInput="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block mb-2 font-semibold text-gray-700"
                        htmlFor="username"
                      >
                        Account Type
                      </label>
                      <select
                        onChange={formik.handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                        name="accountType"
                        id=""
                      >
                        <option value="notSelected">select</option>
                        <option value="saving">Saving</option>
                        <option value="current">Current</option>
                      </select>
                    </div>
                    <div>
                      <InputComponent
                        onChange={formik.handleChange}
                        labelName="bankBranchName"
                        classNameLabel=" block mb-2 font-semibold text-gray-700"
                        labelInput="Bank and Branch name:"
                        type="text"
                        name="bankBranchName"
                        placeholder="enter bank and branch name"
                        required
                        classNameInput="bg-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                      />
                    </div>
                  </div>
                  <div className="mt-10 text-center">
                    <ButtonComponent
                      value="Submit"
                      type="submit"
                      label="Submit"
                      className="px-30 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
                    ></ButtonComponent>
                  </div>
                </form>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="w-1/4 mb-4">
          <SearchComponent
            className=""
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <TableComponent
          name="bank account"
          column={column}
          data={dataTable}
          pageSize={5} // Number of rows per page
          actions={row => (
            <div className="flex gap-2">
              <span className="">
                <InputSwitch
                  checked={row.sNo == checked1}
                  onChange={e =>
                    handleAccountAtiveStatus(e, row.bankAccountNumber, row.sNo)
                  }
                />
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
}