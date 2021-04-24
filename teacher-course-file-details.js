import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import React, { Component, Fragment } from "react";
import "../css/studentcoursedetails.css"
import "../css/navbar.css";
import { Container } from 'reactstrap';
import axios from 'axios';

class TeacherCourseFileDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            pdfname: '',
            course: [],
            resource: [],
            CourseId: localStorage.getItem('courseid'),
            ResourceType: '',
            ResourceDetails: ''
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

        fetch('api/resource/getfileresource', {
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


    

    handleFile = (event) => {


        let file = event.target.files;
        console.log(`File ${file}`);

        let errMessage = [];

        this.setState({
            
            selectedFile: file[0]
        });

    };

    postFile = e => {

        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 15; i++) {
            this.state.pdfname += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.state.pdfname = this.state.pdfname + ".pdf";
        this.state.resourceDetails=this.state.pdfname
        console.log(this.state)
        console.log(JSON.stringify(this.state))

        if (this.state.ResourceType == "")  {
            alert('Field empty')
        } else {
            fetch('api/resource/createfileresource', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)

            }).then(r => r.json()).then(res => {
                let a = res;
                if (!a == '') {
                    alert('Uploaded')
                    console.log(a)
                } 

            });


            const formData = new FormData();
            formData.append('file', this.state.selectedFile, this.state.pdfname);

            axios.post("https://localhost:44393/api/FileUpload/UploadPdf", formData)
                .then((response) => {
                    this.setState({ status: `upload success ${response.data}` });
                })
                .catch((error) => {
                    this.setState({ status: `upload failed ${error}` });
                })
            
        }

    }

    downloadPdf = param => e => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        console.log({ Cv: param })
        axios.post("https://localhost:44393/api/FileUpload/downloadpdf", { Cv: param }, options).then(response => {
            let blob = new Blob([response.data], { type: 'application/octet-stream' })
            let ref = this.state.ref
            ref.current.href = URL.createObjectURL(blob)
            ref.current.download = param
            ref.current.click()
        })
    }



    render() {

        const { ResourceType, ResourceDetails } = this.state
    return (
        <div class="teachercoursedetails-section">
            <div class="coursedetails">
                {this.state.course?.map(course =>
                    <div class="info" key={course.courseId}>
                    <div class="progress-wrapper">
                    <Link to="./teacher-course-details">
                        <button id="create-course-btn" class="col-md-12" className="r-btn btn-lg btn-warning btn-block" >Go to materials</button>
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
                                <h7 class="text-center">+Add new File</h7>
                                    <div class=" text-dark font-weight-bold">
                                        <label for="inputname">File Title :</label>
                                <input type="text" class="form-control" name="ResourceType" value={ResourceType} onChange={this.changeHandler}></input>
                                    </div>
                                    <p></p>
                                    <div class="col-md-12 text-dark font-weight-bold">
                                         <label for="post">File :</label>
                                            <input type="file" class="form-control-file" onChange={this.handleFile}></input>
                                    </div>

                                    <div id="submit-btn" class=" text-dark font-weight-bold">
                                        <Link className="text-link" to="/teacher-course-file-details">
                                    <button id="create-course-btn" class="col-md-12" className="r-btn btn-lg btn-warning btn-block" onClick={this.postFile} >
                                            <i class="fas fa-plus"></i> Post now! 
                            </button>
                                        </Link>
                                    </div>
                                </div>
                        <h7 class="text-center">Recent Course Materials</h7>
                        {this.state.resource?.map(resource =>
                            <div class="course" key={resource.resourceId}>
                                <div class="info">
                                    <h6>  {resource.resourceType} </h6>
                                    <button id="create-course-btn" className="r-btn btn-info btn-sm" onClick={this.downloadPdf( resource.resourceDetails )} >Download file</button>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default TeacherCourseFileDetails;