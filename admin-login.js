import React, { Component } from "react"
import "../admin/admin-login.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, NavLink} from 'react-router-dom'
import { extend } from "jquery";

class AdminLogin extends Component{

    constructor(props) {

        super(props);
        this.state = {
            Email: '',
            Password: ''

        }


    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLoginAdmin = e => {
        fetch('api/admin/adminlogin', {
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
                localStorage.setItem('role', 'admin')


            } else {
                alert('Wrong Username or Password')
            }
        });
    }



    render() {

        const { Email, Password } = this.state
        return (
            <div class="admin-login">
                <div class="center">
                    <h1>Login</h1>
                    <form>
                        <div class="login-txt-field">
                            <input type="email" required name="Email" value={Email} onChange={this.changeHandler} placeholder="Email"/>
                            <label>Email</label>
                        </div>
                        <div class="login-txt-field">
                            <input type="password" required name="Password" value={Password} onChange={this.changeHandler} placeholder="Password"/>
                            <label>Password</label>
                        </div>
                        
                        <input class="admin-submit" onClick={this.handleLoginAdmin}type="submit" value="Login" />
                        
                    </form>
                </div>
            </div>
        );

    }
}

export default AdminLogin;