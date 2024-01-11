import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Badge } from 'antd';

function Navbar(props) {
  const user = props.user;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    localStorage.clear();
    alert('Logged out succesfully');
    navigate('/login');
  }

  return (
    <nav className="flex items-center justify-between flex-wrap pt-2 lg:p-2 bg-[#58B8E1] h-[10vh] w-[100%]">
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
        <h4 className="text-[#19494a] font-semibold ml-4">Medial</h4>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-2 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-2 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-2 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
      >
        <div className="text-md lg:flex-grow bg-[#58B8E1]">
          <a href="#" className="block pt-1 lg:inline-block lg:mt-0 text-white-200 lg:mr-4 text-gray-800">
            Home
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 lg:mr-4 text-gray-800">
            Features
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 lg:mr-4 text-gray-800">
            Contact us
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 lg:mr-4 text-gray-800">
            Support
          </a>
        </div>
        <Badge style={{cursor:"pointer"}} count={user && user.notification.length} onClick={() => { navigate('/notification') }}>
          <i style={{cursor:"pointer"}} class="fa-solid fa-bell"></i>
        </Badge>
        <button onClick={handleClick} className="p-2 rounded-md bg-[#6de2e7] text-sm text-black ml-4">Logout</button>

      </div>
    </nav>
  );
}

export default Navbar;