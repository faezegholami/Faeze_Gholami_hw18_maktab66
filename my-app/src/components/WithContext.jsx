import React, { Component, useContext } from "react";
import { UserContext } from "../context/UserContext";
import SignIn from "./SignIn";

const WithContext = (Component)=>{
const WithHoc=()=>{
    const {isSignin} = useContext(UserContext)
    console.log(isSignin)
    return(
        <div>
{isSignin?<Component/>:<SignIn/>}
        </div>
    )
}
return WithHoc
}

export default WithContext