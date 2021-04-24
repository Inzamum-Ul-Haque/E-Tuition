import React, { Component } from "react";
import "../css/about.css";
import inzamum from "../inzamum.jpg";
import abir from "../abir.jpg"
import alvee from "../alvee.jpg"
import lemon from "../lemon.jpg"

import { BrowserRouter as Router, Route } from 'react-router-dom'

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDevs: [],
            sCourseId:''
            
        }
        
    }
    componentDidMount = e => {

        //console.log(this.props.location.sCourseId)
    }

    

    render() {
        return (
            <div>
                <div className="about-section">
                    <h1 className="heading-title">ABOUT US</h1>
                    <div className="wrap-text">
                        <h3>Our project deals with mainly school, college, university students & the interested youth tutors. It has record of each student who felt the necessity of this platforms during this pandemic. There will be two segment- teachers & students. The tutors have to registration with some requirements. They can create multiple courses.
                        Students have to enroll the courses by payment firstly. By this give and take condition both segments will be beneficial including the project owner. By going through the website both- tutors & students can go through anyone's need and can help each other.</h3>
                    </div>
                   
                </div>
                <section class="team">
                    <div class="container">
                        <h1 id="our-team-heading">OUR TEAM</h1>
                        <div class="row">
                            <div class="col-md-4 profile text-center">
                                <div class="img-box">
                                    <img src={inzamum} class="img-responsive" />
                                    <ul>
                                        <a href="#"><li><i class="fa fa-facebook"></i></li></a>
                                        <a href="#"><li><i class="fa fa-twitter"></i></li></a>
                                        <a href="#"><li><i class="fa fa-linkedin"></i></li></a>
                                    </ul>
                                </div>
                                <h2>Inzamum Ul Haque</h2>
                                <h3>17-02-04-087</h3>
                                
                            </div>
                            {/*
                            <div class="col-md-3 profile text-center">
                                <div class="img-box">
                                    <img src={lemon} class="img-responsive" />
                                    <ul>
                                        <a href="#"><li><i class="fa fa-facebook"></i></li></a>
                                        <a href="#"><li><i class="fa fa-twitter"></i></li></a>
                                        <a href="#"><li><i class="fa fa-linkedin"></i></li></a>
                                    </ul>
                                </div>
                                <h2>Latifur Rahman Lemon</h2>
                                <h3>17-02-04-102</h3>
                                
                            </div> 
                            */}
                            <div class="col-md-4 profile text-center">
                                <div class="img-box">
                                    <img src={alvee} class="img-responsive" />
                                    <ul>
                                        <a href="#"><li><i class="fa fa-facebook"></i></li></a>
                                        <a href="#"><li><i class="fa fa-twitter"></i></li></a>
                                        <a href="#"><li><i class="fa fa-linkedin"></i></li></a>
                                    </ul>
                                </div>
                                <h2>Fahmeed Mahmud Alvee</h2>
                                <h3>17-02-04-104</h3>
                                
                            </div>

                            <div class="col-md-4 profile text-center">
                                <div class="img-box">
                                    <img src={abir} class="img-responsive" />
                                    <ul>
                                        <a href="#"><li><i class="fa fa-facebook"></i></li></a>
                                        <a href="#"><li><i class="fa fa-twitter"></i></li></a>
                                        <a href="#"><li><i class="fa fa-linkedin"></i></li></a>
                                    </ul>
                                </div>
                                <h2>Abir Hossain</h2>
                                <h3>17-02-04-106</h3>
                                
                            </div>

                             
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


export default AboutUs;