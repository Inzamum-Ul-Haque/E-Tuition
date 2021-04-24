import React, { Component } from 'react';
import "../css/createNewCourse.css";
import { Link } from 'react-router-dom';
class CreateNewCourse extends Component {


    constructor(props) {
        super(props);

        this.state = {

            CourseName: '',
            LiveStream: 'Yes',
            CourseLevel: 'Novice',
            CourseClass: '',
            CourseTime: '',
            CourseFee: '',
            CourseDescription: '',
            CoursePost: '',
            TeacherID: localStorage.getItem('id').toString(),
            TeacherName: localStorage.getItem('fname')

        };


    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = e => {


        console.log(this.state)
        console.log(JSON.stringify(this.state))

        if (this.state.Password == this.state.ConfirmPassword) {
            fetch('api/course/createcourse', {
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
                    alert('Course Create Successfully')


                } else {
                    alert('Course Create Failed')
                }

            });



        }
        else { alert('password does not match') }
    }





    render() {

        const { CourseName, LiveStream, CourseLevel, CourseClass, CourseTime, CourseFee, CourseDescription, CoursePost} = this.state;

    return (
        <div className="specialcourse-section">
            <h2 id="register-heading" className="text-center text-warning font-weight-bold mt-1 mb-1">Create A New Course</h2>
            <div className="reg-form" class="container">
                <form name="myForm" class="form-group">
                    <div class="row jumbotron">

                        <div class="col-md-12  text-dark font-weight-bold">
                            <label for="inputname">Name of the Course :</label>
                            <input type="text" class="form-control" placeholder="" name="CourseName" value={CourseName} onChange={this.changeHandler}></input>
                        </div>
                        <p></p>
                        <div class="col-md-4 text-dark font-weight-bold">
                            <label for="inputname"> Do you want to take live stream?</label>
                            <select name="LiveStream" class="browser-default custom-select" value={LiveStream} onChange={this.changeHandler}>
                                <option value="Yes">Yes</option>
                                <option Value="No">No</option>

                            </select>
                        </div>

                        <div class="col-md-4 text-dark font-weight-bold">
                            <label for="inputname">Select Level :</label>
                            <select name="CourseLevel" class="browser-default custom-select" value={CourseLevel} onChange={this.changeHandler}>
                                <option value="Novice">Novice</option>
                                <option Value="Medium">Medium</option>
                                <option Value="Intermediate">Intermediate</option>
                            </select>
                        </div>

                        <p></p>
                        <div class="col-md-4 text-dark font-weight-bold">
                            <label for="inputname">For Classes(-) :</label>
                            <input type="text" class="form-control" placeholder="" name="CourseClass" value={CourseClass} onChange={this.changeHandler}></input>
                        </div>

                        <div class="col-md-4 text-dark font-weight-bold">
                            <label for="inputname">Time span :</label>
                            <input type="text" class="form-control" placeholder="" name="CourseTime" value={CourseTime} onChange={this.changeHandler}></input>
                        </div>

                        <div class="col-md-4 text-dark font-weight-bold">
                            <label for="inputname">Course Fee (Taka):</label>
                            <input type="text" class="form-control" placeholder="" name="CourseFee" value={CourseFee} onChange={this.changeHandler}></input>
                        </div>

                        <p></p>
                        <div class="col-md-12 text-dark font-weight-bold">
                            <label for="post">Course Description :</label>
                            <textarea class="form-control" name="CourseDescription" value={CourseDescription} onChange={this.changeHandler}></textarea>
                        </div>

                        <p></p>
                        <div class="col-md-12 text-dark font-weight-bold">
                            <label for="post">Create a Public Post :</label>
                            <textarea class="form-control" name="CoursePost" value={CoursePost} onChange={this.changeHandler}></textarea>
                        </div>

                        <div id="submit-btn" class="col-md-12  text-dark font-weight-bold">
                            <Link to='/teacher-home'>
                            <button id="create-course-btn" class="col-md-12" className="r-btn btn-lg btn-warning btn-block" onClick={this.submitHandler}>
                                    Create the Course & post it!
                            </button>
                                </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );

    }


    
}

export default CreateNewCourse;