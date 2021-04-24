import { Link, NavLink, Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Fragment } from "react";
import "../css/teacher-student-details.css"
import { Component } from "react";

class TeacherStudentDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {

            purchaseCourse: []

        };

    }
    componentDidMount() {
        fetch('api/course/pendingstudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: parseInt(localStorage.getItem('courseid'))
        }).then(res => res.json())
            .then(purchaseCourse => this.setState({ purchaseCourse }, () => console.log("done", purchaseCourse)));

    }

    
    
    confirmStudent = param => e => {
        fetch('api/course/approvestudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'StudentId': param.toString(), 'CourseId': localStorage.getItem('courseid')})
        }).then(r => r.json()).then(res => {
            let a = res;
            if (!a == '') {
                console.log(a)
                alert('approved');
            }

        });
    }

    render() {
        return (
            <div class="student-details-body">
                <div class="student-details-main-content">
                    <main class="student-details-panel">
                        <section class="recent">
                            <div class="activity-grid">
                                <div class="activity-card">
                                    
                                    <h5>
                                        Student Details
                                    </h5>

                                    <table border="0">
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Student Email</th>
                                                <th>Student Phone Number</th>
                                                <th>TransactionID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.purchaseCourse?.map(purchaseCourse =>
                                                <tr key={purchaseCourse.id}>
                                                    <td>{console.log(purchaseCourse.studentId.toString()) }{ purchaseCourse.userName}</td>
                                                    <td>{purchaseCourse.email}</td>
                                                    <td>{purchaseCourse.phone}</td>
                                                    <td class="paid">{purchaseCourse.transactionID}</td>
                                                    <td><button class="button enroll-btn" onClick={this.confirmStudent(purchaseCourse.studentId)}>Confirm Enroll</button></td>
                                                </tr>
                                            )}
                                            
                                           

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </section>
                    </main>
                </div>
            </div>
          )
    }
}

export default TeacherStudentDetails;