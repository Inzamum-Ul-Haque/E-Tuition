
import React, { Component, useState } from "react";
import { Link, NavLink, Route,withRouter, Redirect} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/registration-login.css";


class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Email: '',
            Phone: '',
            Password: '',
            Address: '',
            Age: '',
            Institution: '',
            ConfirmPassword: ''
        };

    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {


        console.log(this.state)
        console.log(JSON.stringify(this.state))

        if (this.state.Password == this.state.ConfirmPassword) {
            fetch('api/student/studentregister', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)

            }).then(r => r.json()).then(res => {
                let a = res;
                if (!a == '') {
                    localStorage.setItem('auth', a)
                    console.log(a)


                    localStorage.setItem('role', 'student')
                    localStorage.setItem('email', this.state.Email)


                } else {
                    alert('Email Already Exists')
                }

            });



        }
        else { alert('password does not match') }
    }
  


    render() { 


        const { Name, Email, Phone, Password, Address, Age, Institution,ConfirmPassword } = this.state

        
        return (
            
            <div className="registration-section">
                <marquee><p id="moving-text">নতুন রেজিস্ট্রেশনে প্রথম যেকোন কোর্স enroll-এ থাকছে বিশেষ ছাড়!</p></marquee>
            <Form className="registrationform" onSubmit={this.submitHandler}>

            <h2 id="register-heading"className="text-center mt-1 mb-1">Create your Account!</h2>  
            <FormGroup>

              <Label className="font-weight-bold mt-2 mb-1">User Name</Label>
                        <Input type="text" placeholder="Full Name" name="Name"  value={Name} onChange={this.changeHandler}/>  
              
              <Label className="font-weight-bold mt-2 mb-1">Your Email</Label>
                        <Input type="email" placeholder="Email" name="Email"  value={Email} onChange={ this.changeHandler}/>

              <Label className="font-weight-bold mt-2 mb-1">Phone Number</Label>
                        <Input type="text" placeholder="Mobile No" name="Phone" value={Phone} onChange={this.changeHandler}/>

              <Label className="font-weight-bold sm-3 mt-2 mb-1">Set your Password</Label>
                        <Input type="password" placeholder="Password" name="Password" value={Password} onChange={this.changeHandler}/>

              <Label className="font-weight-bold sm-3 mt-2 mb-1">Confirm your Password</Label>
                        <Input type="password" placeholder="Confirm Password" name="ConfirmPassword" value={ConfirmPassword} onChange={this.changeHandler}/>

              <Label className="font-weight-bold mt-2 mb-1">Present Address </Label>
                        <Input type="text" placeholder="Address" name="Address" value={Address} onChange={this.changeHandler}/>

              <Label className="font-weight-bold mt-2 mb-1">Your Age</Label>
                        <Input type="text" placeholder="Age" name="Age" value={Age} onChange={this.changeHandler}/>

              <Label className="font-weight-bold mt-2 mb-1">Name of Current Institution</Label>
                        <Input type="text" placeholder="Current Institute" name="Institution" value={Institution} onChange={this.changeHandler}/>

              
              <Button id="register-btn" className="btn-lg btn-warning btn-block" > 
                Register
              </Button> 
                  

            </FormGroup>
        
        </Form>
    </div>
    );
    
  }
  
}

export default Registration;