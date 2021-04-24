import {Link, NavLink, Route, Switch} from 'react-router-dom'
import React, { Fragment } from "react";
import "../css/specialcourse.css"
import "../css/teacher-home.css"
import { Container } from 'reactstrap';
import { Component } from 'react';
class SpecialCourses extends Component{


    constructor(props) {
        super(props);

        this.state = {

            course: []

        };

    }

    componentDidMount() {

        console.log(JSON.stringify({ StudentId: localStorage.getItem('id') }))

        fetch('api/course/getspecialcourse').then(res => res.json())
            .then(course => this.setState({ course }, () => console.log("done", course)));

    }

    getId = param => e => {
        localStorage.setItem('courseid', param)
    }



    render() {

        return (
            <div className="lightbg-section">
                <marquee><p id="moving-text">পছন্দমত  COURSE  সিলেক্ট  করে  ENROLL  করুন!</p></marquee>
                <div class="content clearfix">
                    <div class="main-content">
                        <h1 class="recent-posts-title">Special Courses</h1>
                        {this.state.course?.map(course =>
                            <div class="specialcourse" key={course.courseId}>
                                <div class="specialcoursepreview">
                                    <h2>{course.courseName} </h2>
                                    <p>Date: {course.courseCreatedDate}</p>
                                </div>
                                <div class="specialcourseinfo">
                                    <h2>{course.courseName}</h2>
                                    <h5>Teacher: {course.teacherName}</h5>
                                    <p class="p-trunc">
                                        {course.courseDescription}
                                    </p>
                                    <li><Link to="./student-inside-course" class="link-tag" class="btn-red" onClick={this.getId(course.courseId)}>View Details</Link></li>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default SpecialCourses;