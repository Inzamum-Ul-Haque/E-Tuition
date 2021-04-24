import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import React, { Component, Fragment } from "react";
import "../css/studentcoursedetails.css"
import "../css/navbar.css";
import { Container } from 'reactstrap';

class TeacherCourseDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            course: [],
            resource: [],
            CourseId: localStorage.getItem('courseid'),
            ResourceType: '',
            ResourceDetails: '',
            ResourceLink:''

        };

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

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    postCreate = e => {
        console.log(this.state)
        console.log(JSON.stringify(this.state))

        if ((this.state.ResourceType == "") || this.state.ResourceDetails == "") {
            alert('Field empty')
        } else {
            fetch('api/resource/createresource', {
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
                    alert('Resource Create Successfully')
                } else {
                    alert('Resource Create Failed')
                }

            });

        }

        
    }


    render() {

        const { ResourceType, ResourceDetails,ResourceLink } = this.state

        return (
            <div class="teachercoursedetails-section">
                <div class="coursedetails">
                    {this.state.course?.map(course =>
                        <div class="info" key={course.courseId}>
                        <div class="progress-wrapper">
                                <Link to="./teacher-course-file-details">
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
                <div>
                    <div class="coursecontent clearfix">
                        <div class="main-content">
                            <div class="course row jumbotron">
                                <h7 class="text-center">+Add new material</h7>
                                <div class=" text-dark font-weight-bold">
                                    <label for="inputname">Material Type :</label>
                                    <input type="text" class="form-control" name="ResourceType" value={ResourceType} onChange={this.changeHandler}></input>
                                </div>
                                <p></p>
                                <div class="col-md-12 text-dark font-weight-bold">
                                    <label for="post">Material Details :</label>
                                    <textarea class="form-control" name="ResourceDetails" value={ResourceDetails} onChange={this.changeHandler}></textarea>
                                </div>

                                <div class="col-md-12 text-dark font-weight-bold">
                                    <label for="post">Material Link :</label>
                                    <textarea class="form-control" name="ResourceLink" value={ResourceLink} onChange={this.changeHandler}></textarea>
                                </div>

                                <div id="submit-btn" class=" text-dark font-weight-bold">
                                    <Link className="text-link" to="/teacher-course-details">
                                        <button id="create-course-btn" class="col-md-12" className="r-btn btn-lg btn-warning btn-block" onClick={this.postCreate }>
                                            <i class="fas fa-plus"></i> Post now!
                            </button>
                                    </Link>
                                </div>
                            </div>
                            <h7 class="text-center">Recent Course Materials</h7>
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
            </div>
        );
    }
}

export default TeacherCourseDetails;