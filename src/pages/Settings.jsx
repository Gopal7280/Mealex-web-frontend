import React, { useEffect, useRef, useState } from 'react';
// import Sidebar from '../container/Sidebar';
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import { pink } from '@mui/material/colors';
import { InputSwitch } from 'primereact/inputswitch';
import Checkbox from '@mui/material/Checkbox';
import {
  Preview,
  ModeEdit,
  DeleteForever,
  Close,
  Dashboard,
} from '@mui/icons-material';
import '../styles/layoutFix.css';
import '../styles/setting.css';
import { InputComponent } from '../components/Input';
import { InvoiceSampleA4 } from '../layouts/a4SizeInvoiceLayout';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/Button';
import { InvoiceSampleA5 } from '../layouts/a5SizeInvoiceLayout';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
// prime react
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { apiGet, apiPost } from '../services/api';
import { set } from 'lodash';
import { ChallanSampleA4 } from '../layouts/a4SizeChallanLayout';
import { ChallanSampleA5 } from '../layouts/a5SizeChallanLayout';
import { TableComponent } from '../components/Table';
import { SearchComponent } from '../components/SerachBar';

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState('Home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'PrefixSettingInvoice':
        return <PrefixSettingInvoice />;
      case 'ThemeSettingInvoice':
        return <ThemeSettingInvoice />;
      case 'BankAccountSettingInvoice':
        return <BankAccountSettingInvoicentact />;
      case 'ReciversSignatureInvoice':
        return <></>;
      case 'AuthorizedSignatureInvoice':
        return <AuthorizedSignatureInvoice />;
      // challan
      case 'PrefixSettingChallan':
        return <PrefixSettingChallan />;
      case 'ThemeSettingChallan':
        return <ThemeSettingChallan />;
      case 'BankAccountSettingChallan':
        return <BankAccountSettingChallan />;
      case 'ReciversSignatureChallan':
        return <Dashboard />;
      case 'AuthorizedSignatureChallan':
        return <AuthorizedSignatureChallan />;
      default:
        return <PrefixSettingInvoice />;
    }
  };
  return (
    <div>
      <div className="">
        <div className="app over">
          <Sidebar1 className="" setActiveComponent={setActiveComponent} />
          <div>
            <div className="content p-1">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Sidebar1 = ({ setActiveComponent }) => {
  const navigate=useNavigate();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  console.log(checked);
  console.log(checked1);
  useEffect(()=>{
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
    },[])
  return (
    <div className="sidebar-1">
      <h2>Setting's Tab</h2>
      <ul>
        <li>
          Invoice Setting
          <ul>
            <li onClick={() => setActiveComponent('PrefixSettingInvoice')}>
              → Pefix Setting
            </li>
            <li onClick={() => setActiveComponent('ThemeSettingInvoice')}>
              → Theme Setting
            </li>
            <li onClick={() => setActiveComponent('BankAccountSettingInvoice')}>
              → Bank Account Setting
            </li>
            <li onClick={() => setActiveComponent('ReciversSignatureInvoice')}>
              → Reciver's Signature Setting
              <span className="">
                <InputSwitch
                  checked={checked}
                  onChange={e => setChecked(e.value)}
                />
              </span>
            </li>
            <li
              onClick={() => setActiveComponent('AuthorizedSignatureInvoice')}
            >
              → Authorized Signature Setting
            </li>
          </ul>
        </li>
        <li>
          Challan Setting
          <ul>
            <li onClick={() => setActiveComponent('PrefixSettingChallan')}>
              → Prefix Setting
            </li>
            <li onClick={() => setActiveComponent('ThemeSettingChallan')}>
              → Theme Setting
            </li>
            <li onClick={() => setActiveComponent('BankAccountSettingChallan')}>
              → Bank Account Setting
            </li>
            <li onClick={() => setActiveComponent('ReciversSignatureInvoice')}>
              → Reciver's Signature Setting
              <span className="">
                <InputSwitch
                  checked={checked1}
                  onChange={e => setChecked1(e.value)}
                />
              </span>
            </li>
            <li
              onClick={() => setActiveComponent('AuthorizedSignatureChallan')}
            >
              → Authorized Signature Setting
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export function PrefixSettingInvoice() {
  const [prefix, setPrefix] = useState({
    invoicePrefix: '',
  });
  useEffect(() => {
    const getInvoicePrefix = async () => {
      try {
        const res = await apiGet('/setting/invoicePrefix');
        console.log(res);
        setPrefix({
          invoicePrefix: res.data[0].setting_invoice_prefix,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getInvoicePrefix();
  }, []);
  function handleChangePrefix(e) {
    // setPrefix("");
    console.log(e.target.value);
    setPrefix({
      invoicePrefix: e.target.value,
    });
  }
  function handlePrefixSubmit(e) {
    console.log(prefix);
    const postPrefix = async () => {
      try {
        const res = await apiPost('/setting/invoicePrefix', prefix);
      } catch (err) {
        console.log(err);
      }
    };
    postPrefix();
    const getInvoicePrefix = async () => {
      try {
        const res = await apiGet('/setting/invoicePrefix');
        console.log(res);
        setPrefix({
          invoicePrefix: res.data[0].setting_invoice_prefix,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getInvoicePrefix();
  }
  function handleEdit() {
    setPrefix('');
  }
  return (
    <div>
      <h2 className="text-center">Invoice Prefix Setting</h2>
      <div className="text-center mt-8">
        <input
          type="text"
          placeholder="Set Invoice Prefix"
          onChange={handleChangePrefix}
          // {...(prefix!=""?{value:prefix}:{})}
          value={prefix.invoicePrefix}
          className="px-20 bg-white rounded-2 rounded-e-none py-3"
        />
        <button
          onClick={handlePrefixSubmit}
          className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export function ThemeSettingInvoice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previwSet, setPreviewSet] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  function handleClickPreviewA4() {
    setIsModalOpen(true); // Open the modal
    setPreviewSet(true);
  }

  function closeModal() {
    setIsModalOpen(false); // Close the modal
  }
  const navigate = useNavigate();
  function handleClickPreviewA5(e) {
    setIsModalOpen(true); // Open the modal
    setPreviewSet(false);
  }
  function handleCheckboxClick(e) {
    if (e.target.checked) {
      if (e.target.value == 'a4') {
        console.log(1);
        setCheck1(true);
        setCheck2(false);
        alert(e.target.value);
      }
      if (e.target.value == 'a5') {
        console.log(2);
        setCheck1(false);
        setCheck2(true);
        alert(e.target.value);
      }
    }
  }
  return (
    <div>
      <h2 className="text-center">Invoice Theme Settings</h2>
      <div className="preview">
        <section>
          <div onClick={handleClickPreviewA4} className="preview-1">
            <span className="">
              Click here to see
              <br />
              Invoice Preview for <br />
              A4 size
            </span>
          </div>
          <p>
            Want to go with A4 size{' '}
            <button value="a4" onClick={handleCheckboxClick}>
              <span>
                <Checkbox checked={check1} value="a4" color="secondary" />
              </span>
            </button>
          </p>
        </section>
        <section>
          <div onClick={handleClickPreviewA5}>
            <span className="">
              Click here to see
              <br />
              Invoice Preview for <br />
              A5 size
            </span>
          </div>
          <p>
            Want to go with A5 size{' '}
            <button value="a5" onClick={handleCheckboxClick}>
              <span>
                <Checkbox checked={check2} value="a5" color="secondary" />
              </span>
            </button>
          </p>
        </section>
      </div>

      {/* Modal for A4 Invoice Preview */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ButtonComponent
              onClick={closeModal}
              type="button"
              className="close-button px-4"
              value="close"
              children={<Close />}
            />
            <div className="show-preview">
              {previwSet ? <InvoiceSampleA4 /> : <InvoiceSampleA5 />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BankAccountSettingInvoicentact() {
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
  useEffect(() => {
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
export function ReciversSignatureInvoice() {
  const [signature, setSignature] = useState(null);
  const toast = useRef(null);
  const handleSignatureChange = event => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        setSignature(e.target.result);
        localStorage.setItem('imageSign', e.target.result);
      };
      reader.readAsDataURL(file);
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: 'Message Content',
      });
    }
  };
  return (
    <div>
      <h2 className="text-center">Uplaoad Reciver's Signature Invoice</h2>
      <div className="mt-6 text-center">
        <Toast ref={toast} />
        <div>
          <input
            type="file"
            id="logoUpload"
            accept="image/*"
            className="p-1 border rounded mt-1 bg-white "
            onChange={handleSignatureChange}
          />
        </div>
        {signature && (
          <img
            src={signature}
            alt="Logo Preview"
            className="w-2xs h-40 object-cover border rounded mt-2"
          />
        )}
      </div>
    </div>
  );
}
export function AuthorizedSignatureInvoice() {
  const [signatureOwner, setSignatureOwner] = useState(null);
  const [check, setCheck] = useState();
  const [signature, setSignature] = useState(null);
  const toast = useRef(null);
  const handleSignatureChange = event => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        setSignatureOwner(e.target.result);
        localStorage.setItem('imageSign', e.target.result);
      };
      reader.readAsDataURL(file);
      toast.current.show();
    }
  };
  useEffect(() => {
    const getBussinessProfile = async () => {
      const responseb = await apiGet('/businessprofile');
      console.log(responseb);
      setSignatureOwner(responseb[0].vendor_signature_box);
    };
    getBussinessProfile();
  }, []);
  function handleCheckboxChange(e) {
    if (e.target.checked) {
      setCheck('Yes');
    } else {
      setCheck('no');
      console.log('no check');
      const getBussinessProfile = async () => {
        const responseb = await apiGet('/businessprofile');
        console.log(responseb);
        setSignatureOwner(responseb[0].signature_box);
      };
      getBussinessProfile();
    }
  }
  return (
    <div>
      <h2 className="text-center">Authorized Signature Setting</h2>
      <div className="flex justify-content-center">
        {signatureOwner && (
          <Image src={signatureOwner} alt="Image" width="250" preview />
        )}
      </div>
      <div>
        <h4 className="text-center mt-2">
          Want to Change the Signature
          <Checkbox
            onChange={handleCheckboxChange}
            value="a5"
            color="secondary"
          />
        </h4>
        {check == 'Yes' && (
          <div className="text-center">
            <Toast ref={toast} />
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              className="p-3 border rounded mt-1 bg-white "
              onChange={handleSignatureChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export function PrefixSettingChallan() {
  const [prefix, setPrefix] = useState({
    challanPrefix: '',
  });
  useEffect(() => {
    const getChallanPrefix = async () => {
      try {
        const res = await apiGet('/setting/challanPrefix');
        console.log(res);
        setPrefix({
          challanPrefix: res.data[0].setting_challan_prefix,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getChallanPrefix();
  }, []);
  function handleChangePrefix(e) {
    // setPrefix("");
    console.log(e.target.value);
    setPrefix({
      challanPrefix: e.target.value,
    });
  }
  function handlePrefixSubmit(e) {
    console.log(prefix);
    const postPrefix = async () => {
      try {
        const res = await apiPost('/setting/challanPrefix', prefix);
      } catch (err) {
        console.log(err);
      }
    };
    postPrefix();
    const getChallanPrefix = async () => {
      try {
        const res = await apiGet('/setting/challanPrefix');
        console.log(res);
        setPrefix({
          challanPrefix: res.data[0].setting_challan_prefix,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getChallanPrefix();
  }
  function handleEdit() {
    setPrefix('');
  }
  return (
    <div>
      <h2 className="text-center">Challan Prefix Setting</h2>
      <div className="text-center mt-8">
        <input
          type="text"
          value={prefix.challanPrefix}
          placeholder="Set Challan Prefix"
          onChange={handleChangePrefix}
          autoFocus
          className="px-20 bg-white rounded-2 rounded-e-none py-3"
        />
        <button
          onClick={handlePrefixSubmit}
          className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export function ThemeSettingChallan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previwSet, setPreviewSet] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  function handleClickPreviewA4() {
    setIsModalOpen(true); // Open the modal
    setPreviewSet(true);
  }

  function closeModal() {
    setIsModalOpen(false); // Close the modal
  }
  const navigate = useNavigate();
  function handleClickPreviewA5(e) {
    setIsModalOpen(true); // Open the modal
    setPreviewSet(false);
  }
  function handleCheckboxClick(e) {
    if (e.target.checked) {
      if (e.target.value == 'a4') {
        console.log(1);
        setCheck1(true);
        setCheck2(false);
        alert(e.target.value);
      }
      if (e.target.value == 'a5') {
        console.log(2);
        setCheck1(false);
        setCheck2(true);
        alert(e.target.value);
      }
    }
  }
  return (
    <div>
      <h2 className="text-center">Challan Theme Settings</h2>
      <div className="preview">
        <section>
          <div onClick={handleClickPreviewA4} className="preview-1">
            <span className="">
              Click here to see
              <br />
              Challan Preview for <br />
              A4 size
            </span>
          </div>
          <p>
            Want to go with A4 size{' '}
            <button value="a4" onClick={handleCheckboxClick}>
              <span>
                <Checkbox checked={check1} value="a4" color="secondary" />
              </span>
            </button>
          </p>
        </section>
        <section>
          <div onClick={handleClickPreviewA5}>
            <span className="">
              Click here to see
              <br />
              Challan Preview for <br />
              A5 size
            </span>
          </div>
          <p>
            Want to go with A5 size{' '}
            <button value="a5" onClick={handleCheckboxClick}>
              <span>
                <Checkbox checked={check2} value="a5" color="secondary" />
              </span>
            </button>
          </p>
        </section>
      </div>

      {/* Modal for A4 Invoice Preview */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ButtonComponent
              onClick={closeModal}
              type="button"
              className="close-button px-4"
              value="close"
              children={<Close />}
            />
            <div className="show-preview">
              {previwSet ? <ChallanSampleA4 /> : <ChallanSampleA5 />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export function BankAccountSettingChallan() {
  const formik = useFormik({
    initialValues: {
      accountHolderName: '',
      accountNo: '',
      ifscCode: '',
      bankBranchName: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <div>
      <h2 className="text-center">Bank Account Setting</h2>
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
    </div>
  );
}
export function ReciversSignatureChallan() {
  const [signature, setSignature] = useState(null);
  const toast = useRef(null);
  const handleSignatureChange = event => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        setSignature(e.target.result);
        localStorage.setItem('imageSign', e.target.result);
      };
      reader.readAsDataURL(file);
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: 'Message Content',
      });
    }
  };
  return (
    <div>
      <h2 className="text-center">Uplaoad Reciver's Signature Challan</h2>
      <div className="mt-6 text-center">
        <Toast ref={toast} />
        <div>
          <input
            type="file"
            id="logoUpload"
            accept="image/*"
            className="p-1 border rounded mt-1 bg-white "
            onChange={handleSignatureChange}
          />
        </div>
        {signature && (
          <img
            src={signature}
            alt="Logo Preview"
            className="w-2xs h-40 object-cover border rounded mt-2"
          />
        )}
      </div>
    </div>
  );
}
export function AuthorizedSignatureChallan() {
  const [signatureOwner, setSignatureOwner] = useState(null);
  const [check, setCheck] = useState();
  const [signature, setSignature] = useState(null);
  const toast = useRef(null);
  const handleSignatureChange = event => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        setSignatureOwner(e.target.result);
        localStorage.setItem('imageSign', e.target.result);
      };
      reader.readAsDataURL(file);
      toast.current.show();
    }
  };
  useEffect(() => {
    const getBussinessProfile = async () => {
      const responseb = await apiGet('/businessprofile');
      console.log(responseb);
      setSignatureOwner(responseb[0].vendor_signature_box);
    };
    getBussinessProfile();
  }, []);
  function handleCheckboxChange(e) {
    if (e.target.checked) {
      setCheck('Yes');
    } else {
      setCheck('no');
      console.log('no check');
      const getBussinessProfile = async () => {
        const responseb = await apiGet('/businessprofile');
        console.log(responseb);
        setSignatureOwner(responseb[0].vendor_signature_box);
      };
      getBussinessProfile();
    }
  }
  function handleChangeUpload(e) {
    console.log('i will make upload');
  }
  return (
    <div>
      <h2 className="text-center">Authorized Signature Setting</h2>
      <div className="flex justify-content-center">
        {signatureOwner && (
          <Image src={signatureOwner} alt="Image" width="250" preview />
        )}
      </div>
      <div>
        <h4 className="text-center mt-2">
          Want to Change the Signature
          <Checkbox
            onChange={handleCheckboxChange}
            value="a5"
            color="secondary"
          />
        </h4>
        {check == 'Yes' && (
          <div className="text-center">
            <Toast ref={toast} />
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              className="p-3 border rounded mt-1 bg-white "
              onChange={handleSignatureChange}
            />
            <div className="mt-10 text-center">
              <ButtonComponent
                value="Submit"
                type="submit"
                label="Submit"
                onClick={handleChangeUpload}
                className="px-20 py-3 bg-[#3A5B76] text-white font-bold rounded hover:bg-[#2E4A62]"
              ></ButtonComponent>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Settings;
