import React from "react";
import { Tabs } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/Features/alertSlice";
import axios from "axios";

function Notification() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.user);
    async function handleMarkAllRead(){
        try{    
            dispatch(showLoading());
            const res=await axios.post('/api/v1/user/getallnotification',{userId:user._id,},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(hideLoading());
            if(res.data.success){
                alert(res.data.message);
            }else{
                console.log('error in changing notification');
            }
        }catch(err){
            console.log("something went wrong");
        }
    }
    async function handledeleteAllRead(){
        try{
            dispatch(showLoading());
            const res=await axios.post("/api/v1/user/deleteallnotification",{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());

            if(res.data.success){
                alert(res.data.message);
            }else{
                console.log(res.data.message);
            }
        }catch(err){
            console.log(err);
        }

    }
    return (
        <div>
            <h1 className="text-center">Notifications</h1>
            <div className="p-2 m-2">
            <Tabs>
                    <Tabs.TabPane tab="UnRead" key={0}>
                    <div className="flex justify-end p-4 w-[100%]">
                        <button onClick={handleMarkAllRead} className="bg-blue-400 p-2 rounded-md">Mark all as read</button>
                    </div>
                    {
                        user?.notification.map((notificationMessage)=>(
                            <div onClick={navigate(notificationMessage.onClickPath)} className="m-4 p-2 shadow-sm shadow-gray-400">
                                {notificationMessage.message}
                            </div>
                        ))
                    }
          
                    </Tabs.TabPane>
                
                    <Tabs.TabPane tab="Read" key={1}>
                    <div className="flex justify-end p-4 w-[100%]">
                        <button onClick={handledeleteAllRead} className="bg-red-400 p-2 rounded-md">Delete all read</button>
                    </div>
                    {
                        user?.seennotification.map((notificationMessage)=>(
                            <div onClick={navigate(notificationMessage.onClickPath)} className="m-4 p-2 shadow-sm shadow-gray-400">
                                {notificationMessage.message}
                            </div>
                        ))
                    }

                    </Tabs.TabPane>
            </Tabs>
         

            </div>
              
        </div>

    )

}

export default Notification;