import React from "react";
import { Link } from "react-router-dom";
import { Badge } from 'antd';
import { useNavigate } from "react-router-dom";


function Admin(props) {
  const navigate = useNavigate();
  const user = props.user;
  function handleClick() {
    localStorage.clear();
    alert('Logged out succesfully');
    navigate('/login');
  }

  return (
    <div className="flex flex-col">
      <div className="h-[10vh] bg-[#58B8E1] flex justify-between items-center">
        <h3 className="text-gray-900 text-md p-2">Admin</h3>
        <div className="p-4">
          <Badge count={user && user.notification.length} style={{ cursor: "pointer" }} onClick={() => { navigate('/notification') }}>
            <i style={{ cursor: "pointer" }} class="fa-solid fa-bell"></i>
          </Badge>
          <button onClick={handleClick} className="ml-4 p-2 rounded-md bg-[#6de2e7] text-sm text-black ">Logout</button>
        </div>
      </div>
      <div className="flex h-[90vh] bg-[#9DD8F8] justify-center items-center">
        <div className="flex flex-col items-center justify-center h-[280px] w-[220px] p-4 m-4 bg-[#9DD8F8] shadow-xs shadow-slate-400 border-solid border-slate-300 rounded-2xl mt-4 mb-6 hover:scale-110 transition duration-500">

          <div className="h-[60px] w-[60px] bg-[#61c5bb] rounded-full flex items-center justify-center"><Link to="/admin/users"><i class="fa-solid fa-user fa-2xl"></i></Link></div>

          <button className="p-4 text-base text-gray-800"><Link to="/admin/users">Users</Link></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[280px] w-[220px] p-4 m-4 bg-[#9DD8F8] shadow-xs shadow-slate-400 border-solid border-slate-300 rounded-2xl mt-4 mb-6 hover:scale-110 transition duration-500">
        <div className="h-[60px] w-[60px] bg-[#61c5bb] rounded-full flex items-center justify-center"><Link to="/admin/doctors"><i class="fa-solid fa-user-doctor fa-2xl"></i></Link></div>
          <button className="p-4 text-base text-gray-800"><Link to="/admin/doctors">Doctors</Link></button>
        </div>



      </div>
    </div>


  );
}

export default Admin;