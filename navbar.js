import React,{useState} from "react";
import {Link, NavLink} from 'react-router-dom'
import "../css/navbar.css";

const Navbar = () => {

    const [open,setOpen] = useState(false);

    return (
        <nav>
            <div className ="logo">
                <img className="book1" src="https://img.icons8.com/color/2x/books.png"/>
                <img className="book2" src="https://img.icons8.com/fluent/2x/book-stack.png"/>
                <Link className="text-link" to ="/" style={{textDecoration:'none'}}>
                    ই-টিউশন<br/>
                    <p id="logo-subtitle">পড়াশোনা...যেখানে-সেখানে !</p>
                </Link>
            </div>
            <ul className="nav-links" style={{transform: open ? "translateX(0px)" : ""}}>
                <li><Link className="text-link" to="/aboutus" style={{textDecoration:'none'}}>About Us</Link></li>
                <li><Link className="text-link" to="/all-courses" style={{textDecoration:'none'}}>All courses</Link></li>
                <li><Link className="text-link" to="/login" style={{textDecoration:'none'}}>Dashboard/Login</Link></li>
            </ul>
            <i onClick={() => setOpen(!open)} className="fas fa-bars burger"></i>
        </nav>
    );
};

export default Navbar;
