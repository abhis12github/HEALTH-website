import React,{useEffect} from "react";
import axios from "axios";
import Admin from "./Admin";
import UserPage from "./UserPage";
import {useSelector} from "react-redux";

function HomePage() {

    const {user}=useSelector((state)=>state.user);
    const getUserData=async()=>{
        try{
            const res=await axios.post('/api/v1/user/getUserData',{},{
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("token"),
                },
            })

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getUserData();
    },[]);
    
    return (
            <div>
            {user?.isAdmin?<Admin user={user}></Admin>:<UserPage user={user}></UserPage>}   
            </div>
    );
}

export default HomePage;