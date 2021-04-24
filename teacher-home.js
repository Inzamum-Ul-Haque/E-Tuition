import React, { Fragment } from "react";
import "../css/teacher-home.css"
import { Component } from "react";
import axios from "axios";
import {Link, NavLink, Route, Switch} from 'react-router-dom'



class TeacherHome extends Component {


    constructor(props) {
        super(props);

        this.state = {
            sInfo: [],
            course: [],
            filter: null
        }
    }
    

    componentDidMount() {
        fetch('api/course/getcoursehome')
            .then(res => res.json())
            .then(course => this.setState({ course }, () => console.log("done", course)));


        fetch('api/teacher/getteacher', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ Email: localStorage.getItem('email') } )

        }).then(res => res.json())
            .then(sInfo => this.setState({ sInfo }, () => {
                console.log(sInfo)
                const arr = sInfo.flatMap(Object.values)
                console.log(arr)
                localStorage.setItem('id', arr[0])
                localStorage.setItem('fname', arr[1])
                localStorage.setItem('lname', arr[2])
                localStorage.setItem('email', arr[3])
                localStorage.setItem('phone', arr[4])
                localStorage.setItem('password', arr[5])
                localStorage.setItem('teachingexp', arr[6])
                localStorage.setItem('fb', arr[8])
                localStorage.setItem('li', arr[9])
                localStorage.setItem('aboutdetails', arr[10])
                localStorage.setItem('verification', arr[11])
                localStorage.setItem('ImgName', arr[12])

            }));


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

    handleId = param => e => {

        localStorage.setItem('courseid', param.toString())

    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };


    render() {

        const { filter, course } = this.state;
        const lowercasedFilter = filter;
        const filteredData = course.filter(item => {
            if (this.state.filter == null) return course;
            else {
                return Object.keys(item).some(key =>
                    item.courseName.includes(lowercasedFilter)
                );
            }
        });


        return (
            <div className="lightbg-section">
            <div class="home">
                <div class="container">
                        <form id="st">
                            <input type="text" onChange={(e) => this.handleChange(e)} value={filter} name="search" placeholder="Search for courses here.."></input>
                        </form>
                </div>

                <div class="content clearfix">
                    <div class="main-content">
                        <h1 class="recent-posts-title">Recent Posts</h1>
                            {filteredData?.map(course =>
                            
                            <div class="post" key={course.courseId}>

                                <img src="https://agenciescdn.notifyvisitors.com/agencies/wp-content/uploads/2020/08/xzebhqxwlpz91xf20sr8.jpg" alt="" class="post-image" />
                                <div class="post-preview">
                                    <h2><a href="#" id="course-title"> {course.courseName}</a></h2>
                                    <i class="far fa-user"> {course.teacherName}</i>
                                &nbsp;
                                <p> {course.courseCreatedDate}</p>
                                    <p class="preview-text">
                                        {course.coursePost}
                                    </p>
                                    <Link to="./teacher-inside-course">
                                        <button class="btn read-more" onClick={this.handleId(course.courseId)}>Click to know more</button>
                                    </Link> 
                                </div>
                            </div>

                        )
                        }

                        

                    </div>
                    <div class="sidebar">
                        <div class="section topics">
                            <h2 class="section-title">Menu</h2>
                            <ul>
                                <li><Link to="/teacher-home" class="link-tag"> <i class="fas fa-th-large"></i> Home</Link></li>
                                <li><Link to="/teacher-profile" class="link-tag"> <i class="fas fa-user"></i> Profile</Link></li>
                                <li><Link to="/teacher-your-courses"><i class="fas fa-book"></i> Your Courses</Link></li>
                                <li><Link to="/teacher-payments"><i class="fas fa-money-bill-wave-alt"></i> Payments</Link></li>
                                { /* <li><a href="#"><i class="fas fa-sticky-note"></i> Notes</a></li>*/}
                               
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
                </div>
        );

    }

}

export default TeacherHome;