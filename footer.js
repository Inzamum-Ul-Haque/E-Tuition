import React from 'react';
import "../css/footer.css";

const Footer = () => {

    return (
        <div>
            <footer className="footer">
                <div className="footer-left"> 
                    <div className="footer-logo">
                        <p id="logo">ই-টিউশন</p>
                        <p>পছন্দমত কোর্স নির্বাচন করে খুঁজে নিন অনলাইন টিউশনি । টিউশনি এবং ব্যাচ পড়ানোর জন্য নতুন কোর্স তৈরি করুন ।</p>
                    </div>
                    <div className="socials">
                        <a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
                    </div>
                </div>
                <ul className="footer-right">
                    <li>
                        <h2>Navigate</h2>

                        <ul className="box">
                            <li><a>All Courses</a></li>
                            <li><a>FAQ's</a></li>
                            <li><a>Support/Contact Us</a></li>
                        </ul>
                    </li>

                    <li className="features">
                        <h2>Work with us</h2>

                        <ul className="box">
                            <li><a>About Us</a></li>
                            <li><a>Our Team | Join</a></li>
                            <li><a>Request-course</a></li>
                            <li><a>Become an Instructor</a></li>
                        </ul>
                    </li>

                    <li className="Address">
                        <h2>Address</h2>

                        <p>House-10,Block-A,Road-03<br/>Section-11,Mirpur-1216</p>
                    </li>
                </ul>

                <div className="footer-bottom">
                    <p>All Rights Reserved by &copy; E-Tuition 2020</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;