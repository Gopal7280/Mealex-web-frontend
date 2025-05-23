import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { apiPost } from "../services/api";
import { setToken } from "../services/authService";
import imgLogo from "../assets/Bill365Logo.jpg"
import emailjs from '@emailjs/browser';
import { Loader } from "../layouts/Loader";
import { Skeleton } from 'primereact/skeleton';
const LoginRegister = ({ setAuth }) => {
    const [loader, setLoader] = useState(false);
    const [formType, setFormType] = useState("login");
    const [email, setEmail] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setLoader(true);
            const response=await apiPost("/auth/login",{email,password})
            console.log(response.data.token);
            console.log(response.data);
            console.log("i am response");
            if (response.data.token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
                    setToken(response.data.token);
                    setAuth(true);
                    navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.message || "Login failed. Try again!");
        }
        finally{
            setLoader(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        console.log(email);
        const sendEmail=async ()=>{
            const templateParams = {
                to_name: 'Bill365', // Must match variable in your template
                email: email, // Optional, if used in your template
                message: 'Welcome to our app! Let us know if you have any questions.', // Match variable name in template
              };
              emailjs.send(
                'service_s4es4n8',    // Replace with your actual Service ID
                'template_31jd2hh',   // Replace with your actual Template ID
                 templateParams,
                '-1wolPEfuWi750zxX'     // Replace with your actual Public Key
              )
              .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                console.log('Welcome email sent successfully!');
              })
              .catch((error) => {
                console.error('FAILED...', error);
                console.log('Failed to send welcome email.');
              });
        }
        sendEmail();
        try {
            setLoader(true);
            const response=await apiPost("/auth/signUp",{username,email,password});
            console.log(response);
            const response1=await apiPost("/auth/login",{email,password});
            if(response1.data.token!=undefined && response)
            {
                setToken(response1.data.token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + response1.data.token;
            setAuth(true);
            navigate("/dashboard");
            }
           else{
                console.log("no token found");
           }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed!");
        }
        finally{
            setLoader(false);
        }
    };

    return (
        <>
        {
            loader?(<div className="bg-white">
        <div className="flex-1 p-6">
            <Skeleton className="mb-4" width="100%" height="10vh"></Skeleton>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Skeleton width="100%" height="150px"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
        </div>

        {/* Charts */}
        <Skeleton width="100%" height="100vh"></Skeleton>
      </div>
      </div>):(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                {/* <h2 className="text-center text-2xl font-semibold text-gray-700 mb-5">Bill<span className="text-green-600">●</span>365</h2> */}
                <img src={imgLogo} alt="" />
                <div className="flex bg-gray-200 p-1 rounded-full mt-6">
                    <button
                        className={`w-1/2 py-2 font-semibold focus:outline-none ${formType === "login" ? "bg-[#3A5B76] text-white" : "bg-white text-gray-700"}`}
                        style={{borderRadius:"20px"}}
                        onClick={() => setFormType("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 font-semibold focus:outline-none ${formType === "register" ? "bg-[#3A5B76] text-white" : "bg-white text-gray-700"}`}
                        style={{borderRadius:"20px"}}
                        onClick={() => setFormType("register")}
                    >
                        Register
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                {formType === "login" ? (
                    <form onSubmit={handleLogin} className="mt-5">
                        <label className="block text-sm font-semibold text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="block mt-3 text-sm font-semibold text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => {
                                const input = document.querySelector('input[type="password"]');
                                input.type = input.type === "password" ? "text" : "password";
                            }} className="absolute right-3 top-3 cursor-pointer text-gray-500">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            {/* <label className="flex items-center">
                                <input type="checkbox" className="mr-1" /> Remember me
                            </label> */}
                            {/* <a href="#" className="text-blue-500 text-sm">Forgot Password?</a> */}
                        </div>
                        <button style={{borderRadius:"8px"}} className="w-full bg-[#3A5B76] text-white py-2  mt-4 hover:bg-[#2E4A5D] transition">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="mt-5">
                        <label className="block text-sm font-semibold text-gray-600">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your User name"
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label className="block mt-3 text-sm font-semibold text-gray-600">Email ID</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="block mt-3 text-sm font-semibold text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => {
                                const input = document.querySelector('input[type="password"]');
                                input.type = input.type === "password" ? "text" : "password";
                            }} className="absolute right-3 top-3 cursor-pointer text-gray-500">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                        <label className="block mt-3 text-sm font-semibold text-gray-600">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Confirm your Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => {
                                const input = document.querySelector('input[type="password"]');
                                input.type = input.type === "password" ? "text" : "password";
                            }} className="absolute right-3 top-3 cursor-pointer text-gray-500">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                        <button style={{borderRadius:"8px"}} className="w-full bg-[#3A5B76] text-white py-2 mt-4 hover:bg-[#2E4A5D] transition">Register</button>
                    </form>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                    By logging in, you agree to Bill 365's <a href="#" className="text-blue-500">Terms & Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
                </p>
            </div>
        </div>
      )
        }
        </>
    );
};

export default LoginRegister;