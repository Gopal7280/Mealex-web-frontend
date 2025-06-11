import { Email, Password } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import brandLogo from '../../assets/img/Bill365Logo.jpg';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../services/api';
import { Button } from 'primereact/button';
export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [error, setError] = useState(false);
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      console.log(values);
      if (values.password == values.confirmPassword) {
        console.log('match');
        setError(false);
        const resetPassword=async ()=>{
           setLoading(true);
           try{
             const res=await apiPost("/auth/forgetPassword",values);
             const showSuccess = () => {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Please wait while Redirecting to Login Page',
            life: 3000,
          });
        };
        showSuccess();
        navigate("/login");
           }
           catch(err)
           {
            console.log(err);
           }
           finally{
            setLoading(false);
           }
        }
        resetPassword();
      } else {
        console.log('error');
        setError(true);
      }
    },
  });
  return (
    <>
    <Toast ref={toast} />
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center align-items-center h-screen bg-cyan-500 bg-gradient-to-b to-red-300"
      >
        <dl className="sm:w-1/2 border border-2 border-amber-300 p-10 rounded-2xl bg-white">
          <div className="text-center">
            <img src={brandLogo} className="h-20" alt="" />
          </div>
          {error && (
            <div className="text-red-500">
              Password and Confirm Password are diffrent please enter same
              password
            </div>
          )}
          <dt className="font-bold text-lg">Email</dt>
          <dd>
            <input
            placeholder='enter email'
              onChange={formik.handleChange}
              required
              className="bg-gray-200 rounded-1xl p-2 w-full"
              autofocus
              type="email"
              name="email"
            />
          </dd>
          <dt>New Password</dt>
          <dd>
            <input
            placeholder='enter password'
              onChange={formik.handleChange}
              required
              className="bg-gray-200 rounded-1xl p-2 w-full"
              type="password"
              name="password"
            />
          </dd>
          <dt>Confirm Password</dt>
          <dd>
            <input
            placeholder='confirm password'
              onChange={formik.handleChange}
              required
              className="bg-gray-200 rounded-1xl p-2 w-full"
              type="password"
              name="confirmPassword"
            />
          </dd>
          <div className="flex flex-wrap justify-content-center gap-3">
            <Button iconPos="right" label="Reset Password" className='!bg-[#3A5B76] py-2 px-2 text-center w-full text-white' style={{borderRadius:"10px"}} icon="pi pi-check" loading={loading}/>
        </div>
        </dl>
      </form>
    </>
  );
}
