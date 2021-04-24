import React, {Component, useState} from "react";
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/edit-student-profile.css";
import axios from "axios";
    

class EditStudentProfile extends Component {

    
    constructor(props) {
        super(props);

        
        this.state = {
            
            sInfo: [],
            
            Name: localStorage.getItem('name'),
            Email: localStorage.getItem('email'),
            Phone: localStorage.getItem('phone'),
            Password: localStorage.getItem('password'),
            Address: localStorage.getItem('address'),
            Age: localStorage.getItem('age'),
            Institution: localStorage.getItem('institution'),
            ConfirmPassword: '',
            ImgName: ''
            
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




            fetch('api/student/studentupdate', {
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
                    localStorage.setItem('name', this.state.Name)
                    localStorage.setItem('phone', this.state.Phone)
                    localStorage.setItem('password', this.state.Password)
                    localStorage.setItem('address', this.state.Address)
                    localStorage.setItem('age', this.state.Age)
                    localStorage.setItem('institution', this.state.Institution)
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

         
        var { Name , Email, Phone, Password, Address, Age, Institution, ConfirmPassword } = this.state

  return (
    <div className="studentprofile-section">
          <Form className="studentprofileform" onSubmit={this.submitHandler}>

            <h2 id="register-heading"className="text-center mt-1 mb-1">Edit your Profile</h2>  
            <FormGroup>

                <div className="studentprofile-form" class="container">
                    <form name="studentprofileForm" class="form-group">
                        <div class="row jumbotron">
                        <div class="studentprofilephoto-section mt-2 mb-1">
                         </div>

                            <div class="col-md-6">
                                  <label for="profilePhoto">Upload Photo</label>
                                  <input type="file" class="form-control-file" onChange={this.handleFile}></input>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold mt-2 mb-1">Edit User Name</Label>
                                  <Input type="text" name="Name" value={Name} onChange={this.changeHandler}/>  
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold mt-2 mb-1">Email</Label>
                                  <Input type="email" readOnly name="Email" value={Email} onChange={this.changeHandler}/>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold mt-2 mb-1">Edit Phone Number</Label>
                                  <Input type="text" name="Phone" value={Phone} onChange={this.changeHandler}/>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold sm-3 mt-2 mb-1">Edit your Password</Label>
                                  <Input type="password" name="Password" value={Password} onChange={this.changeHandler}/>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold sm-3 mt-2 mb-1">Confirm your new Password</Label>
                                  <Input type="password" name="ConfirmPassword" value={ConfirmPassword} onChange={this.changeHandler}/>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold mt-2 mb-1">Edit Present Address</Label>
                                  <Input type="text" name="Address" value={Address} onChange={this.changeHandler}/>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold mt-2 mb-1">Edit Your Age</Label>
                                  <Input type="text" name="Age" value={Age} onChange={this.changeHandler}/>
                            </div>

                            <div class="col-md-6">
                            <Label className="text-dark font-weight-bold mt-2 mb-1">Edit Name of Current Institution</Label>
                                  <Input type="text" name="Institution" value={Institution} onChange={this.changeHandler}/>
                            </div>

                            
                        </div>
                    </form>
             </div>

             <Button id="save-btn" class="col-md-12" className= "btn-warning r-btn btn-lg btn-block"> 
                      Save information
              </Button> 
                  <p></p>
              <Link to="/student-home" class="link-tag">
              <Button id="cancel-btn" class="col-md-12" className= "btn-danger r-btn btn-lg btn-block"> 
                Cancel
              </Button> 
              </Link>

            </FormGroup>
        
        </Form>
      </div> 
    );
    
  }
  
}

export default EditStudentProfile;