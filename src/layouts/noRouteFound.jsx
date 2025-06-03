import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoRouteMatch = () => {
  function handleLogout(e){
         localStorage.removeItem("token");
                  localStorage.removeItem("isAuthenticated");
                  localStorage.removeItem("mkddr");
                  navigate("/login");
                  window.location.reload();
  }
    const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={(e)=>handleLogout(e)}
        style={{borderRadius:"16px"}}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Go Back to Login
      </button>
    </div>
  );
};

export default NoRouteMatch;
