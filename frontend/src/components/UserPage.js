import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Features from './Features';
import Footer from './Footer';

function UserPage(props) {
    return (<div>
        <Navbar user={props.user}></Navbar>
        <Home></Home>
        <Features></Features>
        <Footer></Footer>
    </div>);
}

export default UserPage;