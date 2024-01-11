import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

function Doctors(){
  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus=async(record,status)=>{
    try{
      const res=await axios.post('/api/v1/admin/approveDoctor',{doctorId:record._id,userId:record.userId,status:status},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        }
      });
      if(res.data.success){
        alert(res.data.message);
      }
    }catch(err){
      console.log(err);
    }

  }
  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=>handleAccountStatus(record,"approved")}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </div>
  );
};

export default Doctors;