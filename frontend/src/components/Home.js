import React from "react";
import doctor from "../images/1636_U1RVRElPIEtBVCAzNjctMDU.jpg";
import { Link } from "react-router-dom";
function Home(){
    return (<div className="h-[90vh] w-[100%] bg-[#9DD8F8] flex">
    <div className="flex flex-col w-[35%] justify-center p-6">   
        {/* <img src={stetchoscope} className="h-[110px] w-[110px] self-start" ></img> */}
        <h1 className="text-2xl font-semibold ml-4 text-[#33748f] font-"> Health is a priceless wealth<br></br> Invest while you can.</h1>
        <div className="ml-4 mt-2">
            {/* <button className="bg-[#2aacb0] p-3 rounded-md hover:bg-[#3fd1d6] mr-3" ><Link to="/LogIn">Sign In</Link></button>
            <button className="p-3 rounded-md  outline-[#229CA1] outline-1 hover:bg-[#4ddfe4] outline"><Link to="/Register">Sign Up</Link></button> */}
            
        </div>
    </div>
    <div className="flex items-center justify-center w-[65%] ">
        {/*  <img src={injection} className="h-[120px] w-[120px] self-end pb-2"></img> */}
        <img src={doctor} className="h-[100%] w-[100%]"></img>

    </div>
    </div>

    );
}

export default Home;