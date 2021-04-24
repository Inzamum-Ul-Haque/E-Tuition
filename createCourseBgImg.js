import React, { Component, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


import { withRouter } from 'react-router-dom';
import "../css/createCourseBgImg.css";

class CreateCourseBgImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Password: '',
            TeachingExp:'None',
            Facebook: '',
            Linkedin: '',
            AboutDetails: '',
            ConfirmPassword: '',
            cv:'',
            selectedFile: null
        };

    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        
    }
    
    handleFile = (event) => {
        
        
        let file = event.target.files;
        console.log(`File ${file}`);
        
        let errMessage = [];
        
        this.setState({
            selectedFile: file[0]
        });
        
    };
    

    submitHandler = e => {

        
        console.log(this.state)
        console.log(JSON.stringify(this.state))

        if (this.state.Password == this.state.ConfirmPassword) {

            //
            
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 15; i++) {
                this.state.cv += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            this.state.cv = this.state.cv + ".pdf";
            //

            fetch('api/teacher/teacherregister', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)

            }).then(r => r.json()).then(res => {
                let a = res;
                if (!a == '') {
                    localStorage.setItem('role', 'teacher')
                    localStorage.setItem('auth', a)
                    console.log(a)
                    localStorage.setItem('email', this.state.Email)
                    


                } else {
                    alert('Email Already Exists')
                }

            });
            //
            


            const formData = new FormData();
            formData.append('file', this.state.selectedFile,this.state.cv);
            

            axios.post("https://localhost:44393/api/FileUpload/UploadCv", formData)
                .then((response) => {
                    this.setState({ status: `upload success ${response.data}` });
                })
                .catch((error) => {
                    this.setState({ status: `upload failed ${error}` });
                })



            //
        } else{ alert('Password does not match') }



    }

    


    render() {

        

        const { FirstName, LastName, Email, Phone, Password, TeachingExp, Facebook, Linkedin, AboutDetails,ConfirmPassword } = this.state
        return (

            <div className="createcoursebg-section">
                <div id="intro" class="view hm-black-strong">
                    <div className="full-bg-image">
                        <h1 className="display-heading">
                            Create Courses on E-Tuition
                     </h1>
                        <p className="sub-heading">
                            Become a teacher. Sharpen your teaching skills and earn handsome amount of money.
                    </p>
                        <div className="apply-now">

                        </div>
                    </div>
                </div>

                <h1 className="text-center text-white ">Apply To Be An Instructor</h1>
                <h3 className="text-center text-white">Personal Information</h3>
                <div className="reg-form" class="container">
                    <form name="myForm" class="form-group">
                        <div class="row jumbotron">
                            <div class="col-md-6">
                                <label for="inputname">First Name*</label>
                                <input type="text" class="form-control" placeholder="First Name" name="FirstName" value={FirstName} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label for="inputname">Last Name*</label>
                                <input type="text" class="form-control" placeholder="Last Name" name="LastName" value={LastName} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label for="email">E-Mail*</label>
                                <input type="e-mail" class="form-control" placeholder="E-mail" name="Email" value={Email} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-4">
                                <label for="mobilenumber">Mobile*</label>
                                <input type="text" class="form-control" placeholder="Mobile Number" name="Phone" value={Phone} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label for="setPwd">Set Password*</label>
                                <input type="password" class="form-control" placeholder="Set Password" name="Password" value={Password} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label for="confirmPwd">Confirm Password*</label>
                                <input type="password" class="form-control" placeholder="Confirm Password" name="ConfirmPassword" value={ConfirmPassword} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-8">
                                <label for="onlineTeachingExperience">Online Teaching/Training Experience*</label>
                                <select class="browser-default custom-select" name="TeachingExp" value={TeachingExp} onChange={this.changeHandler}>
                                    <option value="None">None</option>
                                    <option Value="6 Months">6 Months</option>
                                    <option value="12 Months">12 Months</option>
                                    <option value="More than 1 year">More than 1 year</option>
                                    <option value="More than 2 years">More than 2 years</option>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <label for="addResume">Add Your CV here*(PDF)</label>
                                <input type="file" class="form-control-file" onChange={this.handleFile}></input>
                            </div>

                            <div class="col-md-8">
                                <label for="linkedinUrl">LinkedIn Profile Url</label>
                                <input type="text" class="form-control" name="Linkedin" value={Linkedin} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-8">
                                <label for="fbProfileUrl">Facebook Profile Url</label>
                                <input type="text" class="form-control" name="Facebook" value={Facebook} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-8">
                                <label for="plans">Tell us a bit about your teaching experience and plans*</label>
                                <textarea class="form-control" name="AboutDetails" value={AboutDetails} onChange={this.changeHandler}></textarea>
                            </div>
                            

                            <div id="submit-btn" class="col-md-12">
                                <button type="submit" onClick={this.submitHandler } class="btn btn-primary" >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default CreateCourseBgImg;