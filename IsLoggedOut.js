
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function IsLoggedOut(props) {

    const CMP = props.cmp;
    var auth = localStorage.getItem('auth');
    if (auth)
        return <div> < CMP /> </div>
    else return <div> <Redirect to='/' /> </div>

}


export default IsLoggedOut;
