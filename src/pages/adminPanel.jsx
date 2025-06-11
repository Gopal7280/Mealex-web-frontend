// Description: Admin panel to view all users and their profile status
import React, { useState, useEffect } from "react";
import { apiGet } from "../services/api";
import { Loader } from "../layouts/Loader";

export function AdminPanel() {
  const [users, setUsers] = useState([]); // Array to hold user data
  const [loader,setLoader]=useState(false); // Loader state to show loading spinner
  // Fetch users from the API when the component mounts
  // and set the users state with the response data.
  useEffect(() => {
    setLoader(true);
    const fetchUsers = async () => {
      try{
            const res=await apiGet("/sup_admin");
            console.log(res.data);
            setUsers(res.data);
      }
      catch(err)
      {
        console.log(err);
      }
      finally{
        setLoader(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    {
      !loader?(
        // Render the admin panel with user data
        <div className="h-screen bg-white py-6">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Admin Panel</h3>
        <div className="bg-white shadow-lg rounded-lg">
          <div className="h-[80vh] overflow-x-auto mt-10">
            <table className="min-w-full table-auto border-collapse">
              <thead className="sticky top-0">
                <tr className="bg-gray-200">
                  <th className="p-4 text-left text-sm font-medium text-gray-700">S.no</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">Profile Status</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-700">Creation Time</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.length>0?(
                    <>{users.map((user,index) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-800">{index+1}</td>
                    <td className="p-4 text-sm text-gray-800">{user.name}</td>
                    <td className="p-4 text-sm text-gray-800">{user.email}</td>
                    <td className="p-4 text-sm text-gray-800">{user.vendor_profile_status}</td>
                    <td className="p-4 text-sm text-gray-800">{user.create_at}</td>
                  </tr>
                ))}</>
                  ):(
                    <></>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      ):(
        // Show loader while fetching data
        <Loader/>
      )
    }
    </>
  );
};
