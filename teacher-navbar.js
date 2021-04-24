import React,{useState} from "react";
import "../css/navbar.css";
import {Link, NavLink} from 'react-router-dom'
import { Component } from "react";



class TeacherNavbar extends Component{



    handleLogout = e => {
        alert('logged out successfully');
    }


    render() {

        return (
            <nav>
                <div className="logo">
                    <img className="book1" src="https://img.icons8.com/color/2x/books.png" />
                    <img className="book2" src="https://img.icons8.com/fluent/2x/book-stack.png" />
                    <Link className="text-link" to="/teacher-home" style={{ textDecoration: 'none' }}>
                        ই-টিউশন<br />
                        <p id="logo-subtitle">পড়াশোনা...যেখানে-সেখানে !</p>
                    </Link>
                </div>
                <ul className="nav-links">
                    <li><Link className="text-link" to="/create-new-course" style={{ textDecoration: 'none' }}>Create A New Course <i class="fas fa-plus"></i></Link></li>
                    <li><Link to="/logout" class="text-link" style={{ textDecoration: 'none' }} onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i> Logout({localStorage.getItem('fname')} {localStorage.getItem('lname')})</Link></li>

                </ul>
            </nav>
        )

    }
    
}

export default TeacherNavbar;