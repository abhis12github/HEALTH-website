import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/Features/alertSlice";
import { Link, useNavigate } from "react-router-dom";

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
   
function LogIn() {

    const [data,setData]=useState({email:"",password:""});
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function handleChange(event){
      const {name,value} = event.target;
      setData((prevData)=>({...prevData,[name]:value}));
    }
    async function handleSubmit(event){
      try{
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/login',data);
        dispatch(hideLoading());
        if(res.data.success){
          localStorage.setItem("token",res.data.token);
          alert(res.data.message);
          navigate('/');
        }else{
          alert(res.data.message);
        }
      }catch(err){
        dispatch(hideLoading());
        console.log(err);
      }
    }

    return (
      <div className="flex justify-center items-center h-[90vh] ">
        <Card color="transparent" shadow={false} className="shadow-sm shadow-gray-400 p-5">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Sign In.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              name="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.email}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Not a user?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>

      </div>
 
    );
}

export default LogIn;