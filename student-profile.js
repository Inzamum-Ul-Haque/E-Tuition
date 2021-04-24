import React, {Component, useState} from "react";
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../css/student-profile.css";




   

class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            sInfo: [],
            Email: localStorage.getItem('email')
        };

    }

    componentDidMount() {
        


        fetch('api/student/tc', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: localStorage.getItem('id')

        }).then(res => res.json())
            .then(t => this.setState({ t }, () => console.log("done", t)));
    }
        
        
    



render(){ 
    const { t } = this.state
  return (
    <div className="studentprofile-section">
        <Form className= "studentprofileform">

              <h2 id="register-heading" className="text-center mt-1 mb-1">Welcome {localStorage.getItem('name')}</h2>  
           
            
                      <div class="container"> 
                  <div class="studentprofilephoto-section mt-5 mb-5">
                      <img src={localStorage.getItem('img')}/>
                         </div>

                          <div>
                          <Link to="./edit-student-profile">
                          <Button id="save-btn"  className= "r-btn btn-lg btn-warning btn-block"> 
                          Edit your Profile
                          </Button>
                          </Link> 
                          </div> 
                            

                          <div className="profile-text">
                            <p>
                          <h3 id="total course" className="text-dark">Total enrolled Course: {t} </h3>
                            </p>
                          </div>

                          
                        </div>

                    
        </Form>
      </div> 
    );
    
  }
  
}

export default StudentProfile;