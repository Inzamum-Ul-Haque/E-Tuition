import {Link, NavLink, Route, Switch} from 'react-router-dom'
import React, { Component, Fragment } from "react";
import "../css/studentcoursedetails.css"
import { Container } from 'reactstrap';

class StudentCourseDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            course: [],
            resource: [],
            CourseId: localStorage.getItem('courseid'),
            ResourceType: '',
            ResourceDetails: ''

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
            .then(course => this.setState({ course }, () => console.log("done", course)));

        fetch('api/resource/getresource', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: parseInt(localStorage.getItem('courseid'))

        }).then(res => res.json())
            .then(resource => this.setState({ resource }, () => console.log("done", resource)));

    }


    render() {

        

        return (
            <div class="teachercoursedetails-section">
                <div class="coursedetails">
                    {this.state.course?.map(course =>
                        <div class="info" key={course.courseId}>
                        <div class="progress-wrapper">
                                <Link to="./student-course-file-details">
                                    <button id="create-course-btn" class="col-md-12" className="r-btn btn-lg btn-warning btn-block" >Go to Files</button>
                                </Link>
                        </div>
                            <h2> {course.courseName}</h2>
                            <p class="p-trunc">
                                <h5>{course.courseDescription}</h5>
                            </p>
                            <h6>Teacher: {course.teacherName}</h6>
                            <h6>Created Date: {course.courseCreatedDate}</h6>
                        </div>
                    )}
                </div>

                <div class="coursecontent clearfix">
                    <div class="main-content">
                        <h7>Recent Course Materials</h7>
                        {this.state.resource?.map(resource =>
                            <div class="course" key={resource.resourceId}>
                                <div class="info">
                                    <h4> {resource.resourceType} </h4>
                                    <p> {resource.resourceDetails} </p>
                                    <a href={resource.resourceLink}> {resource.resourceLink} </a> 
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        )

    }
    
}

export default StudentCourseDetails;