import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../admin/admin-home.css"

class AdminHome extends Component{

    constructor(props) {
        super(props);

        this.state = {
           tc: []
        };
    }

    componentDidMount() {
        fetch('api/admin/tc')
            .then(res => res.json())
            .then(tc => this.setState({ tc }, () => console.log("done", tc)));
    }


    render(){

        return (
            <div class="admin-body">
                <input type="checkbox" id="nav-toggle"></input>
                <div class="left-sidebar">
                    <div class="left-sidebar-brand">
                        <h2><span class="fas fa-book-open"></span> <span>E-Tuition</span></h2>
                    </div>

                    <div class="left-sidebar-menu">

                        <ul>
                            <li>
                                <Link className="text-link" to="/admin-home" style={{ textDecoration: 'none' }}>
                                    <a class="active">
                                        <span class="fas fa-clipboard-list"></span>
                                        <span>Dashboard</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link className="text-link" to="/cv-request" style={{ textDecoration: 'none' }}>
                                    <a>
                                        <span class="fas fa-file-invoice"></span>
                                        <span>CV Requests</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link className="text-link" to="/post-request" style={{ textDecoration: 'none' }}>
                                    <a>
                                        <span class="fas fa-mail-bulk"></span>
                                        <span>Post Requests</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link className="text-link" to="/logout" style={{ textDecoration: 'none' }}>
                                    <a>
                                        <span class="fas fa-user-circle"></span>
                                        <span>Logout</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="admin-main-content">
                    <header>
                        <h2>
                            <label for="nav-toggle">
                                <span class="fas fa-bars"></span>
                            </label>
                        Dashboard
                    </h2>

                        <div class="search-wrapper">
                            <span class="fas fa-search"></span>
                            <input type="search" placeholder="Search here"></input>
                        </div>

                        <div class="user-wrapper">
                            <span class="far fa-user"></span>
                            <div>
                                <h4>UserName</h4>
                                <small>Admin</small>
                            </div>
                        </div>
                    </header>

                    <main class="admin-main">
                        {this.state.tc?.map(tc =>
                            <div class="cards" key="1">
                                <div class="card-single">
                                    <div>
                                        <h1>{tc.s + tc.t}</h1>
                                        <span>Users</span>
                                    </div>
                                    <div>
                                        <span class="fas fa-users"></span>
                                    </div>
                                </div>

                                <div class="card-single">
                                    <div>
                                        <h1>{tc.t}</h1>
                                        <span>Teachers</span>
                                    </div>
                                    <div>
                                        <span class="fas fa-users"></span>
                                    </div>
                                </div>

                                <div class="card-single">
                                    <div>
                                        <h1>{tc.s}</h1>
                                        <span>Students</span>
                                    </div>
                                    <div>
                                        <span class="fas fa-users"></span>
                                    </div>
                                </div>

                                <div class="card-single">
                                    <div>
                                        <h1>{ tc.c}</h1>
                                        <span>Courses</span>
                                    </div>
                                    <div>
                                        <span class="fas fa-book"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        )
    }
}

export default AdminHome