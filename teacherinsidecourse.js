import React, { Component, Fragment } from "react";
import "../css/insidecourse.css";
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class TeacherInsideCourse extends Component {


    constructor(props) {
        super(props);
        this.state = {
            course: []
        }
    }

    componentDidMount() {
        fetch('api/course/getacourse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: parseInt(localStorage.getItem('courseid'))

        }).then(res => res.json())
            .then(course => this.setState({ course }, () => {

                console.log("done", course)
                
            }));
    }



    render() {
        return (
            <div>
                {this.state.course?.map(course =>
                    <div key={course.courseId}>
                        <div class="insidecoursebanner">
                            <div class="info" >
                                <div class="p-trunc footer-logo col-md-15">

                                    <h1 className="text-center" >welcome!</h1>
                                    <p className="text-center coursename" >{course.courseName}</p>
                                    <p className="text-center details" >{course.teacherName}</p>

                                    

                                </div >

                            </div>


                        </div>

                        <div>
                            <div class="coursecontent clearfix">
                                <div class="main-content">
                                    <h7 className="text-center">Course Level</h7>
                                    <div class="course">
                                        <div class="info">
                                            <h6> {course.courseLevel}</h6>
                                        </div>
                                    </div>
                                    <h7>About:</h7>
                                    <div class="course">
                                        <div class="info">
                                            <h6>{course.courseCreatedDate}</h6>
                                            <h6>{course.courseTime}</h6>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
                }
            </div>

        );

    }
}
    export default TeacherInsideCourse;