
import React, {Component, useState} from "react";
import { Link, NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/registration-login.css";
import { withRouter } from 'react-router-dom';
    

class Login extends Component {


    constructor(props) {

        super(props);
        this.state={
            Email: '',
            Password: ''

        }
        
        
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleLoginStudent = e => {
        fetch('api/student/studentlogin', {
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
                localStorage.setItem('email', this.state.Email)
                
                localStorage.setItem('role', 'student')
                

            } else {
                alert('Wrong Username or Password')
            }
        });
    }
    handleLoginTeacher = e => {
        fetch('api/teacher/teacherlogin', {
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
                localStorage.setItem('email', this.state.Email)
                localStorage.setItem('role', 'teacher')
                

            } else {
                alert('Wrong Username or Password')
            }
        });
    }


    render() {
        const { Email,  Password } = this.state
  return (
      <div className="login-section">
          <marquee><p id="moving-text">নতুন রেজিস্ট্রেশনে প্রথম যেকোন কোর্স enroll-এ থাকছে বিশেষ ছাড়!</p></marquee>
        <Form className= "loginform">
        
            <h2 className="text-center mt-1 mb-1">Login</h2>  
            <FormGroup>
              <Label className="font-weight-bold mt-2 mb-1">Email</Label>
                  <Input type="email" name="Email" value={Email} onChange={this.changeHandler} placeholder="Email"/>

              <Label className="font-weight-bold sm-3 mt-2 mb-1">Password</Label>
                  <Input type="password" name="Password" value={Password} onChange={this.changeHandler} placeholder="Password"/>


                  
                      <button onClick={this.handleLoginTeacher}  className="btn-lg btn-warning btn-block mt-5 mb-3">
                          Log in as Teacher
                </button>
                  

                  
                  <button onClick={ this.handleLoginStudent} className="btn-lg btn-warning btn-block mt-5 mb-3">
                          Log in as Student
                </button>
                  


             

              <div id="dont-have-acc" className="text-center pt-3 mt-3 mb-3">
                <p>Don't have an account..?</p>
              </div>

              <Link className="text-link" to="/registration" style={{textDecoration:'none'}}>
                <button className= "btn-lg btn-success btn-block"> 
                  Register Now!
                </button> 
              </Link>
              
            </FormGroup>
        
      </Form>
      </div> 
    );
    
  }
  
}

export default Login;
