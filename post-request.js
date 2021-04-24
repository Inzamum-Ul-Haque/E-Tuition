import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../admin/post-request-panel.css"

class PostRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            course: []
        };
    }
    componentDidMount() {
        fetch('api/admin/postrequest')
            .then(res => res.json())
            .then(course => this.setState({ course }, () => console.log("done", course)));

    }
    handleCourseId = param => e => {
        localStorage.setItem('cid', param)
        console.log(param)
    }
    handlePostRequest = param => e => {

        fetch('api/admin/handlepostrequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: param

        }).then(r => r.json()).then(res => {
            let a = res;
            if (!a == '') {

                alert('Published')

            } else {
                alert('Error')
            }
        });

    }


    render() {
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
                                <a>
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
                                <a class="active">
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
                        Manage Posts
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

                <main class="post-request-panel">
                    <section class="recent">
                        <div class="activity-grid">
                            <div class="activity-card">
                                <h3>
                                    Recent Posts
                                </h3>

                                <table border="0">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Username</th>
                                            <th>Date</th>
                                            <th>Post Title</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {this.state.course?.map(course =>
                                                <tr key={course.courseId}>
                                                    <td>{course.courseId}</td>
                                                    <td>{course.teacherName}</td>
                                                    <td>{course.courseCreatedDate}</td>
                                                    <td>{course.courseName}</td>
                                                    <td class="approve">{course.coursePublished}</td>
                                                    {/*<td><button class="button approve-btn">Approve</button></td>
                                                    <td><button class="button discard-btn">Discard</button></td>*/}
                                                    <td><button class="button publish-btn" onClick={this.handlePostRequest(course.courseId)}>Publish</button></td>
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
    );

    }
   
}

export default PostRequest