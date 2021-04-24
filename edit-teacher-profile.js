import React, {Component, useState} from "react";
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/edit-teacher-profile.css";
import axios from "axios";
    

class EditTeacherProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {

            sInfo: [],
            FirstName: localStorage.getItem('fname'),
            LastName: localStorage.getItem('lname'),
            Email: localStorage.getItem('email'),
            Phone: localStorage.getItem('phone'),
            Password: localStorage.getItem('password'),
            TeachingExp: localStorage.getItem('teachingexp'),
            Facebook: localStorage.getItem('fb'),
            Linkedin: localStorage.getItem('li'),
            AboutDetails: localStorage.getItem('aboutdetails'),
            ImgName:'',
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

            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 15; i++) {
                this.state.ImgName += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            this.state.ImgName = this.state.ImgName + ".jpg";


            fetch('api/teacher/teacherupdate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)

            }).then(r => r.json()).then(res => {
                let a = res;
                if (!a == '') {

                    console.log(a)
                    localStorage.setItem('fname', this.state.FirstName)
                    localStorage.setItem('lname', this.state.LastName)
                    localStorage.setItem('phone', this.state.Phone)
                    localStorage.setItem('teachingexp', this.state.TeachingExp)
                    localStorage.setItem('password', this.state.Password)
                    localStorage.setItem('fb', this.state.Facebook)
                    localStorage.setItem('li', this.state.Linkedin)
                    localStorage.setItem('aboutdetails', this.state.AboutDetails)
                    localStorage.setItem('ImgName', this.state.ImgName)
                    alert('Successful')

                } else {
                    alert('Unsuccessful')
                }

            });


            const formData = new FormData();
            formData.append('file', this.state.selectedFile, this.state.ImgName);


            axios.post("https://localhost:44393/api/FileUpload/uploadphoto", formData)
                .then((response) => {
                    this.setState({ status: `upload success ${response.data}` });
                })
                .catch((error) => {
                    this.setState({ status: `upload failed ${error}` });
                })



        }
        else { alert('password does not match') }
    }


    handleFile = (event) => {


        let file = event.target.files;
        console.log(`File ${file}`);

        let errMessage = [];

        this.setState({
            selectedFile: file[0]
        });

    };



    render() { 

        var { FirstName, LastName, Email, Phone, Password, TeachingExp, Facebook, Linkedin, AboutDetails, ConfirmPassword, ImgName } = this.state 

  return (
    <div className="teacherprofile-section">
          <Form className="teacherprofileform" onSubmit={this.submitHandler}>

            <h2 id="register-heading"className="text-center mt-1 mb-1">Edit your Profile</h2>  
            <FormGroup>
                

                <div className="teacherprofile-form" class="container">
                    <form name="teacherprofileForm" class="form-group">
                        <div class="row jumbotron">
                              <div class="teacherprofilephoto-section mt-2 mb-2">
                                  <img src={localStorage.getItem('img')} />
                         </div>
                        <div class="col-md-6">
                             <label for="profilePhoto">Upload Photo</label>
                             <input type="file" class="form-control-file" onChange={this.handleFile}></input>
                        </div> 

                            <div class="col-md-6">
                                <label className= "text-dark font-weight-bold" for="inputname">Edit First Name</label>
                                  <input type="text" class="form-control" name="FirstName" value={FirstName} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label className= "text-dark font-weight-bold" for="inputname">Edit Last Name</label>
                                  <input type="text" class="form-control" name="LastName" value={LastName} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label className= "text-dark font-weight-bold" for="email">Edit E-Mail*</label>
                                  <input type="e-mail" class="form-control" name="Email" value={Email} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-4">
                                <label className= "text-dark font-weight-bold" for="mobilenumber">Edit Mobile*</label>
                                  <input type="text" class="form-control" name="Phone" value={Phone} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label className= "text-dark font-weight-bold" for="setPwd">Set New Password*</label>
                                  <input type="password" class="form-control" name="Password" value={Password} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-6">
                                <label className= "text-dark font-weight-bold" for="confirmPwd">Confirm New Password*</label>
                                  <input type="password" class="form-control" name="ConfirmPassword" value={ConfirmPassword} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-8">
                                  <label className="text-dark font-weight-bold" for="onlineTeachingExperience" value={TeachingExp} onChange={this.changeHandler}>Edit Online Teaching/Training Experience*</label>
                                <select class="browser-default custom-select">
                                    <option value="1">None</option>
                                    <option Value="2">6 Months</option>
                                    <option value="3">12 Months</option>
                                    <option value="4">More than 1 year</option>
                                    <option value="5">More than 2 years</option>
                                </select>
                            </div>

                            

                            <div class="col-md-8">
                                <label className= "text-dark font-weight-bold" for="linkedinUrl">Edit LinkedIn Profile Url</label>
                                  <input type="text" class="form-control" name="Linkedin" value={Linkedin} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-8">
                                <label className= "text-dark font-weight-bold" for="fbProfileUrl">Edit Facebook Profile Url</label>
                                  <input type="text" class="form-control" name="Facebook" value={Facebook} onChange={this.changeHandler}></input>
                            </div>

                            <div class="col-md-8">
                                <label className= "text-dark font-weight-bold" for="plans">Add your teaching experience and plans*</label>
                                  <textarea class="form-control" name="AboutDetails" value={AboutDetails} onChange={this.changeHandler}></textarea>
                            </div>

                            
                        </div>
                    </form>
             </div>

              

                  <Button id="save-btn"  class="col-md-12" className="btn-warning r-btn btn-lg btn-block">
                      Save information
              </Button>
                  <p></p>
                  <Link to="/teacher-home" class="link-tag">
                      <Button id="cancel-btn" class="col-md-12" className="btn-danger r-btn btn-lg btn-block">
                          Cancel
              </Button>
                  </Link>

               
              

            </FormGroup>
        
        </Form>
      </div> 
    );
    
  }
  
}

export default EditTeacherProfile;