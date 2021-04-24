import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../admin/post-request-panel.css"
import axios from 'axios';

class CvRequest extends Component{


    constructor(props) {
        super(props);

        this.state = {
            teacher: [],
            ref: React.createRef()
        }
    }

    componentDidMount() {
        fetch('api/admin/cv')
            .then(res => res.json())
            .then(teacher => this.setState({ teacher }, () => console.log("done", teacher)));
    }
    downloadPdf = param => e => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' }
        };

        axios.post("https://localhost:44393/api/FileUpload/downloadcv", {Cv:param} ,options).then(response => {
            let blob = new Blob([response.data], { type: 'application/octet-stream' })
            let ref = this.state.ref
            ref.current.href = URL.createObjectURL(blob)
            ref.current.download = param
            ref.current.click()
        })
    }

    handleCv = param => e => {

        fetch('api/admin/handlecv', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: param

        }).then(r => r.json()).then(res => {
            let a = res;
            if (!a == '') {

                alert('Verified')

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
                                    <a class="active">
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
                        CV Requests
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
                                        Recent Applied CV's
                                </h3>

                                    <table border="0">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>File</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        
                                        <tbody >
                                            {this.state.teacher?.map(teacher =>
                                                <tr key={teacher.id}>
                                                    <td>{teacher.id}</td>
                                                    <td>{teacher.firstName}</td>
                                                    <td>{ teacher.email}</td>
                                                    <td>{ teacher.cv }</td>
                                                    <td class="not-approve">{teacher.verification }</td>
                                                    <td>
                                                        <a style={{ display: 'none' }} href='empty' ref={this.state.ref}>ref</a>
                                                        <button class="button download-cv-btn" onClick={this.downloadPdf(teacher.cv)}>Download CV</button>
                                                    </td>
                                                    <td><button class="button approve-btn" onClick={this.handleCv(teacher.id)}>Approve</button></td>
                                                    {/*<td><button class="button discard-btn">Discard</button></td>*/}
                                                
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

export default CvRequest