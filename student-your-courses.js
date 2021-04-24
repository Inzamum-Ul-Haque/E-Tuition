import {Link, NavLink, Route, Switch} from 'react-router-dom'
import React, { Component, Fragment } from "react";
import "../css/studentyourcourses.css"
import "../css/teacher-home.css"
import { Container } from 'reactstrap';


class StudntYourCourses extends Component{



    constructor(props) {
        super(props);

        this.state = {

            course: []

        };

    }

    componentDidMount() {

        console.log(JSON.stringify({ StudentId: localStorage.getItem('id') }))

        fetch('api/course/enrolledcourse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ StudentId: localStorage.getItem('id') })

        }).then(res => res.json())
            .then(course => this.setState({ course }, () => console.log("done", course)));

    }

    getId = param => e => {
        localStorage.setItem('courseid', param)
    }

    render() {

        return (
            <div className="lightbg-section">
                <div class="content clearfix">
                    <div class="main-content">
                        <h1 class="recent-posts-title">Your Enrolled Courses</h1>
                        {this.state.course?.map(course =>
                            <div class="course" key={course.courseId}>
                                <div class="preview">
                                    <h2>{course.courseName} </h2>
                                    <p>Date: {course.courseCreatedDate}</p>
                                </div>
                                <div class="info">
                                    
                                    <h2>{course.courseName}</h2>
                                    <h5>Teacher: {course.teacherName}</h5>
                                    <p class="p-trunc">
                                        {course.courseDescription}
                                    </p>

                                    <li><Link to="/student-course-details" class="link-tag" class="btn-red" onClick={this.getId(course.courseId)}>View Details</Link></li>
                                </div>
                            </div>
                        )
                        }




                    </div>
                </div>
            </div>
        );


    }
}

export default StudntYourCourses;