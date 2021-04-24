import React from "react";
import {BrowserRouter as Router,Route, Switch}  from "react-router-dom";
import { Fragment } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import AboutUs from "./components/aboutus";
import Login from "./components/login";
import Registration from "./components/registration";
import IsLoggedIn from "./components/IsLoggedIn";
import IsLoggedOut from "./components/IsLoggedOut";


import IntroTeacher from "./components/introTeacher";
import Footer from "./components/footer";
import CreateCourseBgImg from "./components/createCourseBgImg";
import TeacherHome from "./users/teacher-home"
import TeacherNavbar from "./users/teacher-navbar"
import StudentHome from "./users/student-home"
import StudentNavbar from "./users/student-navbar";
import TeacherProfile from "./users/teacher-profile";
import StudentProfile from "./users/student-profile";
import EditTeacherProfile from "./users/edit-teacher-profile";
import EditStudentProfile from "./users/edit-student-profile";
import CreateNewCourse from "./users/createNewCourse";
import SpecialCourses from "./users/special-courses";
import StudntYourCourses from "./users/student-your-courses";
import StudentCourseDetails from "./users/student-course-details";
import AdminHome from "./admin/admin-home";
import AdminLogin from "./admin/admin-login";
import PostRequest from "./admin/post-request";
import CvRequest from "./admin/cv-request-panel";
import AllCourses from "./components/allCourses";
import Logoutimg from "./users/logout";
import InsideCourse from "./users/insidecourse";
import StudentCourseEnroll from "./users/student-course-enroll";
import TeacherCourseDetails from "./users/teacher-course-details";
import TeacherYourCourses from "./users/teacher-your-courses";
import StudentPayments from "./users/student-payments"
import TeacherPayments from "./users/teacher-payments";
import TeacherStudentDetails from "./users/teacher-student-details";
import TeacherCourseFileDetails from "./users/teacher-course-file-details"
import TeacherInsideCourse from "./users/teacherinsidecourse"
import StudentCourseFileDetails from "./users/student-course-file-details"

import FileUploadComponent from './components/FileUploadComponent';


function App() {
    return (
    <Router>
    <Switch>
      <Route exact path="/" render={()=>
        <Fragment>
          <Navbar />
          <Banner />
          <IntroTeacher />
          <Footer />
        </Fragment>
      } />
      <Route exact path="/aboutus" render={()=>
        <Fragment>
          <Navbar />
          <AboutUs />
          <Footer />

          </Fragment>
      } />

      <Route exact path="/all-courses" render={()=>
        <Fragment>
          <Navbar />
          <AllCourses />
          <Footer />
        </Fragment>
      } />


      <Route exact path="/login" render={()=>
        <Fragment>
          <Navbar />
          <IsLoggedIn cmp={Login}  />
          <Footer />

          </Fragment>
      } />

      <Route exact path="/registration" render={()=>
          <Fragment>
            <Navbar />
            <IsLoggedIn cmp={Registration} />                  
            <Footer />
  
            </Fragment>
        } />

      <Route exact path="/createCourseBgImg" render={()=>
          <Fragment>
            <Navbar />
            <IsLoggedIn cmp ={CreateCourseBgImg} />
            <Footer />
  
          </Fragment>
      } />

      <Route exact path="/teacher-home" render={()=>
              <Fragment>
                 <TeacherNavbar />
                 <IsLoggedOut cmp={TeacherHome} />
              </Fragment>
        }/>

      <Route exact path="/student-home" render={()=>
              <Fragment>
                        <StudentNavbar />
                        <IsLoggedOut cmp={StudentHome} />
                
              </Fragment>
        }/>

        <Route exact path="/teacher-profile" render={()=>
              <Fragment>
                <TeacherNavbar />
                        <IsLoggedOut cmp={TeacherProfile} />
              </Fragment>
        }/>

        <Route exact path="/student-profile" render={()=>
              <Fragment>
                <StudentNavbar />
                        <IsLoggedOut cmp={StudentProfile} />
              </Fragment>
        }/>
		
		<Route exact path="/edit-teacher-profile" render={()=>
              <Fragment>
                <TeacherNavbar />
                        <IsLoggedOut cmp={EditTeacherProfile} />
                 <Footer />
              </Fragment>
        }/>

        <Route exact path="/edit-student-profile" render={()=>
              <Fragment>
                <StudentNavbar />
                        <IsLoggedOut cmp={EditStudentProfile}/>
                <Footer />
              </Fragment>
        }/>

        <Route exact path="/create-new-course" render={()=>
              <Fragment>
                <TeacherNavbar />
                        <IsLoggedOut cmp={CreateNewCourse}/>
                <Footer />
              </Fragment>
        } />

                <Route exact path="/student-your-courses" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <StudntYourCourses />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/special-courses" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <SpecialCourses />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/student-course-details" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <StudentCourseDetails />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/student-inside-course" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <InsideCourse />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/student-course-enroll" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <StudentCourseEnroll />
                        <Footer />
                    </Fragment>
                } />


                <Route exact path="/student-payments" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <StudentPayments />
                    </Fragment>
                } />

                <Route exact path="/student-course-file-details" render={() =>
                    <Fragment>
                        <StudentNavbar />
                        <StudentCourseFileDetails />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/teacher-payments" render={() =>
                    <Fragment>
                        <TeacherNavbar />
                        <TeacherPayments />
                    </Fragment>
                } />

                <Route exact path="/teacher-student-details" render={() =>
                    <Fragment>
                        <TeacherNavbar />
                        <TeacherStudentDetails />
                    </Fragment>
                } />


                <Route exact path="/logout" render={() =>
                    <Fragment>
                        <Navbar />
                        <Logoutimg />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/teacher-your-courses" render={() =>
                    <Fragment>
                        <TeacherNavbar />
                        <TeacherYourCourses />
                        <Footer />
                    </Fragment>
                } />



                <Route exact path="/teacher-course-details" render={() =>
                    <Fragment>
                        <TeacherNavbar />
                        <TeacherCourseDetails />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/teacher-course-file-details" render={() =>
                    <Fragment>
                        <TeacherNavbar />
                        <TeacherCourseFileDetails />
                        <Footer />
                    </Fragment>
                } />

                <Route exact path="/teacher-inside-course" render={() =>
                    <Fragment>
                        <TeacherNavbar />
                        <TeacherInsideCourse />
                        <Footer />
                    </Fragment>
                } />


                <Route exact path="/fff" render={() =>
                    <Fragment>
                        <Navbar />
                        <FileUploadComponent />
                        <Footer />
                    </Fragment>
                } />


                <Route exact path="/admin-login" render={()=>
                      <Fragment>
                        <IsLoggedIn cmp={AdminLogin} />
                      </Fragment>
                }/>

                <Route exact path="/admin-home" render={()=>
                      <Fragment>
                        <IsLoggedOut cmp={AdminHome} />
                      </Fragment>
                }/>

                <Route exact path="/post-request" render={()=>
                      <Fragment>
                        <IsLoggedOut cmp={PostRequest} />
                      </Fragment>
                }/>

                <Route exact path="/cv-request" render={()=>
                      <Fragment>
                        <IsLoggedOut cmp={CvRequest} />
                      </Fragment>
                }/>


            </Switch>
        </Router>

  );
}

export default App;
