import { Link, NavLink, Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Fragment } from "react";
import "../css/payments.css"
import { Component } from "react";

class TeacherPayments extends Component {


    constructor(props) {
        super(props);

        this.state = {

            payment: []

        };

    }

    componentDidMount() {

        console.log(JSON.stringify({ StudentId: localStorage.getItem('id') }))

        fetch('api/teacher/getpayment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: parseInt(localStorage.getItem('id'))

        }).then(res => res.json())
            .then(payment => this.setState({ payment }, () => console.log("done", payment)));

    }




    render() {
        return (
            <div class="payment-body">
                <div class="payment-main-content">
                    <main class="payments-panel">
                        <section class="recent">
                            <div class="activity-grid">
                                <div class="activity-card">
                                    <h3>
                                        Payments History
                                    </h3>

                                    <table border="1">
                                        <thead>
                                            <tr>
                                                <th>Course Name</th>
                                                <th>Student Name</th>
                                                <th>Student Phone Number</th>
                                                <th>Fee</th>
                                                <th>Paid With</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.payment?.map(payment =>
                                                <tr key={payment.paymentId}>
                                                    <td>{payment.courseName}</td>
                                                    <td>{payment.teacherName}</td>
                                                    <td>{payment.phone}</td>
                                                    <td>{payment.courseFee} Tk</td>
                                                    <td>{payment.paymentMethod}</td>

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

export default TeacherPayments;