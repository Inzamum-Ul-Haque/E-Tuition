import React, {Component, useState} from "react";
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/teacher-profile.css";
import axios from "axios";
    

class TeacherProfile extends Component {


    constructor(props) {
        super(props);

        this.state = {

            sInfo: [],
            Email: localStorage.getItem('email'),
            t:'0'
        };

    }

    componentDidMount() {
        console.log(JSON.stringify(this.state))
        console.log(localStorage.getItem('email'))

        fetch('api/teacher/getteacher', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.state)

        }).then(res => res.json())
            .then(sInfo => this.setState({ sInfo }, () => console.log("done", sInfo)));


        fetch('api/teacher/tc', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: localStorage.getItem('id')

        }).then(res => res.json())
            .then(t => this.setState({ t }, () => console.log("done", t)));


        axios.post("https://localhost:44393/api/FileUpload/getphoto", { ImgName: localStorage.getItem('ImgName') }, { responseType: "blob" })
            .then(function (response) {

                var reader = new window.FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {

                    var imageDataUrl = reader.result;
                    //imageElement.setAttribute("src", imageDataUrl);

                    localStorage.setItem('img', imageDataUrl);
                    console.log(imageDataUrl);
                }
            });

    }


    render() { 
        const { t}=this.state
  return (
    <div className="teacherprofile-section">
        <Form className= "teacherprofileform">

              <h2 id="register-heading" className="text-center mt-1 mb-1">Welcome {localStorage.getItem('fname')} {localStorage.getItem('lname')}</h2>  
              <h3>You are currently: {localStorage.getItem('verification')}</h3>
            
           <div class="container"> 
                  <div class="teacherprofilephoto-section mt-5 mb-5">
                      <img src={localStorage.getItem('img')} />
                </div>

              <div>
                          <Link to="./edit-teacher-profile">
                          <Button id="save-btn"  className= "r-btn btn-lg btn-warning btn-block"> 
                          Edit your Profile
                          </Button>
                          </Link> 
                          </div> 

               <div className="profile-text">
                 <p>
                          <h3 id="total course" className="text-dark">Total created Courses: {t} </h3>
                 </p>
               </div>

              
                  <div className="wrapper-texts">
                      
                      <h3 id="title">Social Media:</h3>
                      <h5>Facebook</h5>
                      <a href={localStorage.getItem('fb')}>{localStorage.getItem('fb')}</a>
                      <p></p>
                      <h5>Linkedin</h5>
                      <a href={localStorage.getItem('li')}>{localStorage.getItem('li')}</a>
               </div>
                  
               
             </div>

        
        </Form>
      </div> 
    );
    
  }
  
}

export default TeacherProfile;