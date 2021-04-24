
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function IsLoggedIn(props) {

    const CMP = props.cmp;
    var auth = localStorage.getItem('auth');
    var role = localStorage.getItem('role');
    if (auth) {
        if(role =='student')
            return <div> <Redirect to='./student-home' /> </div>
        else if (role == 'teacher') return <div> <Redirect to='./teacher-home' /> </div>
        else if (role == 'admin') return <div> <Redirect to='./admin-home' /> </div>
    }else return <div> < CMP /> </div>
    
    
}


export default IsLoggedIn;
