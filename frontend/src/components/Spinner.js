import React from "react";
import { Spinner } from "@material-tailwind/react";
 
function DefaultSpinner() {

  return <div className="h-[100vh] flex justify-center items-center" >
    <Spinner></Spinner>
  </div>;
}

export default DefaultSpinner;