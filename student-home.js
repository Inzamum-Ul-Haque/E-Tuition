import { Link, NavLink, Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Fragment } from "react";
import "../css/teacher-home.css"
import { Component } from "react";
import axios from "axios";



class StudentHome extends Component {


    constructor(props) {
        super(props);

        this.state = {
            
            course: [],
            sInfo: [],
            filter: null
            
        };
        
    }
    handleLogout = e => {
        alert('logged out successfully');
    }

    handleCourseId = param => e => {
        localStorage.setItem('cid',param)
        console.log(param)
    }
    componentDidMount() {
        fetch('api/course/getcoursehome')
            .then(res => res.json())
            .then(course => this.setState({ course }, () => console.log("done", course)));

        
        console.log(localStorage.getItem('email'))

        fetch('api/student/getstudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ Email: localStorage.getItem('email') })

        }).then(res => res.json())
            .then(sInfo => this.setState({ sInfo }, () => {
                const arr = sInfo.flatMap(Object.values)
                console.log(arr)
                localStorage.setItem('id', arr[0])
                localStorage.setItem('name', arr[1])
                localStorage.setItem('phone', arr[3])
                localStorage.setItem('password', arr[4])
                localStorage.setItem('address', arr[5])
                localStorage.setItem('age', arr[6])
                localStorage.setItem('institution', arr[7])
                localStorage.setItem('ImgName', arr[8])

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

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    handleId = param => e => {

        localStorage.setItem('courseid', param.toString())

    }

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
                <marquee><p id="moving-text">পছন্দমত কোর্স select করুন এবং enroll করুন</p></marquee>
            
                <div class="home">
                    <div class="container">

                        <form id="st">
                            <input type="text" onChange={(e) => this.handleChange(e)} value={filter} name="search" placeholder="Search for courses here.."></input>
                        </form>
                        
                        
                    </div>
                </div>

                <div class="content clearfix">
                    <div class="main-content">
                        <h1 class="recent-posts-title">Recent Posts</h1>

                    


                        {filteredData?.map(course =>
                            <div class="post" key={course.courseId}>
                                
                                <img src="https://agenciescdn.notifyvisitors.com/agencies/wp-content/uploads/2020/08/xzebhqxwlpz91xf20sr8.jpg" alt="" class="post-image"/>
                                <div class="post-preview">
                                    <h2><a href="#" id="course-title">{course.courseName}</a></h2>
                                    <i class="far fa-user">{course.teacherName}</i>
                                &nbsp;
                                <p> {course.courseCreatedDate}</p>
                                <p class="preview-text">
                                        {course.coursePost }
                                    </p>
                                    <Link to="./student-inside-course">
                                    <button class="btn read-more" onClick={ this.handleId(course.courseId)}>Click to know more</button>
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
                            <li><Link to="/student-home" class="link-tag"> <i class="fas fa-th-large"></i> Home</Link></li>
                            <li><Link to="/student-profile" class="link-tag"> <i class="fas fa-user"></i> Profile</Link></li>
                            <li><Link to="/student-your-courses" class="link-tag"> <i class="fas fa-book"></i> Your Courses</Link></li>
                                <li><Link to="/student-payments"><i class="fas fa-money-bill-wave-alt"></i> Payments</Link></li>
                                {/*<li><a href="#"><i class="fas fa-sticky-note"></i> Notes</a></li>*/}
                                <li><Link to="/logout" class="link-tag" onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            
        );

    }

}

export default StudentHome;