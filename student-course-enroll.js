import React, { Component } from 'react';
import "../css/createNewCourse.css";
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class StudentCourseEnroll extends Component{

    constructor(props) {
        super(props);
        this.state = {

            UserName: localStorage.getItem('name'),
            Email: localStorage.getItem('email'),
            Phone: localStorage.getItem('phone'),
            CourseName: localStorage.getItem('coursename'),
            CourseFee: localStorage.getItem('cprice'),
            PaymentMethod: 'None',
            TransactionID: '',
            TeacherId: localStorage.getItem('ctid'),
            CourseId: localStorage.getItem('courseid'),
            StudentId: localStorage.getItem('id')
            
        };

    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handlePurchase = e => {

        console.log(this.state)
        console.log(JSON.stringify(this.state))

        

        fetch('api/course/purchasecourse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state
            )

        }).then(r => r.json()).then(res => {
            let a = res;
            if (!a == '') {

                alert('Payment Checking')

            } else {
                alert('Already Pending')
            }
        });

    }

    render() {

        const { UserName, Email, Phone, CourseName,CourseFee, PaymentMethod, TransactionID } = this.state

        return (
            <div className="specialcourse-section">
                <h2 id="register-heading" className="text-center text-white font-weight-bold mt-1 mb-1">Enroll Course</h2>
                <div className="reg-form" class="container">
                    <form name="myForm" class="form-group" onSubmit={this.handleEnroll}>
                        <div class="row jumbotron">

                            <div class="col-md-8  text-dark font-weight-bold">
                                <label for="inputname">User name :</label>
                                <input type="text" class="form-control" readOnly placeholder="" name="UserName" value={UserName} onChange={this.changeHandler} />  
                            </div>
                            <p></p>
                            <div class="col-md-6  text-dark font-weight-bold">
                                <label for="inputname">User email :</label>
                                <input type="text" class="form-control" readOnly placeholder="" name="Email" value={Email} onChange={this.changeHandler} />  
                            </div>

                            <div class="col-md-6  text-dark font-weight-bold">
                                <label for="inputname">Phone number :</label>
                                <input type="text" class="form-control" placeholder="" name="Phone" value={Phone} onChange={this.changeHandler} />  
                            </div>

                            
                            <p></p>
                            <div class="col-md-6  text-dark font-weight-bold">
                                <label for="inputname">Course name :</label>
                                <input type="text" class="form-control" readOnly placeholder="" name="CourseName" value={CourseName} onChange={this.changeHandler} />  
                            </div>
                            <div class="col-md-3  text-dark font-weight-bold">
                                <label for="inputname" aria-readonly>Total Fee:</label>
                                <input type="text" class="form-control" readOnly placeholder="" name="CourseFee" value={CourseFee} onChange={this.changeHandler}></input>
                            </div>
                            <p></p>

                            <div class="col-md-6 text-dark font-weight-bold">
                                <label for="inputname">Payment Method (We only accept through BKash/ROCKET)* :</label>
                                <select class="browser-default custom-select" name="PaymentMethod" value={PaymentMethod} onChange={this.changeHandler} >
                                    <option value="None">None</option>
                                    <option Value="BKash">BKash</option>
                                    <option Value="ROCKET">ROCKET</option>
                                </select>
                            </div>

                            <div class="col-md-6  text-dark font-weight-bold">
                                <label for="inputname">Transaction ID :</label>
                                <input type="text" class="form-control" placeholder="" name="TransactionID" value={TransactionID} onChange={this.changeHandler} />
                            </div>

                           <p></p>

                            <div id="submit-btn" class="col-md-12  text-dark font-weight-bold">
                                <Link className="text-link" to="./student-home" >
                                    <button id="create-course-btn" class="col-md-12" className="r-btn btn-lg btn-warning btn-block" onClick={this.handlePurchase}>
                                        Pay to Enroll the Course!
                            </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );

    }
    
}

export default StudentCourseEnroll;