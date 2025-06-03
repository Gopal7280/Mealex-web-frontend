import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { apiGet, apiPost } from '../../services/api';
import { useEffect, useState } from 'react';
import { InputSwitch } from "primereact/inputswitch";
import { useNavigate } from 'react-router-dom';
export function InvoiceSetting() {
    const [receiverChecked, setReceiverChecked] = useState(true);
    const [authorizedChecked, setAuthorizedChecked] = useState(true);
    const [prefix, setPrefix] = useState({
    invoicePrefix: '',
  });
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
  function handleReceiverSetting(e) {
    if(!receiverChecked)
    {
        setReceiverChecked(!receiverChecked);
        console.log("checked");
    }
    else{
        setReceiverChecked(!receiverChecked);
    }
  }
  function handleAuthorizedSetting(e) {
    if(!authorizedChecked)
    {
        setAuthorizedChecked(!authorizedChecked);
        console.log("checked");
    }
    else{
        setAuthorizedChecked(!authorizedChecked);
    }
  }

  return (
    <>
      <div className="max-w-7xl mt-3 mx-auto  bg-white p-5 responsive-head shadow-lg rounded-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
          Invoice Setting
        </h2>
        <main className="mt-3">
          <div className="">
            <div className="w-50">
              <div className="flex flex-column gap-2">
                <h6 htmlFor="invoicePrefix">Invoice Prefix</h6>
                <div className="p-inputgroup flex-1">
                  <InputText onChange={handleChangePrefix}
                     value={prefix.invoicePrefix} placeholder="Enter invoice prefix" />
                  <Button onClick={handlePrefixSubmit} label="Submit" />
                </div>
              </div>
            </div>
            <div className="w-50 mt-3">
              <div className="flex flex-column gap-2">
                <h6 htmlFor="receiverSignature">Receiver's Signature</h6>
                <p className=''>Want to show  reciever signature Box? <InputSwitch checked={receiverChecked} onChange={(e) => handleReceiverSetting(e)} /></p>
              </div>
            </div>
            <div className="w-50 mt-3">
              <div className="flex flex-column gap-2">
                <h6 htmlFor="authorizedSignature">Authorized's Signature</h6>
                <p className=''>Want to show authorized signature? <InputSwitch checked={authorizedChecked} onChange={(e) => handleAuthorizedSetting(e)} /></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
