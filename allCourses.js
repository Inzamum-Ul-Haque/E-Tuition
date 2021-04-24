import React, { Component } from "react";
import { Link} from 'react-router-dom'
import "../css/allCourses.css"

const AllCourses = () =>{

    return(
        <div>
            <div class="vertical-heading">
                    <h2>All Courses</h2>
            </div>
            
            <div class="all-courses-section">

                <div class="container">
                    <div class="card">
                        <div class="imgBx">
                            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/X_Reasons_to_learn_Javascript.jpg" />
                        </div>
                        <div class="content">
                            <h3>Javascript</h3>
                            <p>ফ্রন্টেন্ড ও ব্যাকএন্ড ডেভেলপার দের জন্য জাভাস্ক্রিপ্ট কোর্স । </p>
                            <h4>ট ৫০০</h4>
                            <li><Link className="text-link" to="/login" style={{ textDecoration: 'none' }}>Read More</Link></li>
                        </div>
                    </div>

                    <div class="card">
                        <div class="imgBx">
                            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--0VRoTDUE--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/q5gn0tjmmcn5qgjagvfa.png" />
                        </div>
                        <div class="content">
                            <h2>Node JS</h2>
                            <p>ফ্রন্টেন্ড ও ব্যাকএন্ড ডেভেলপার দের জন্য জাভাস্ক্রিপ্ট কোর্স । </p>
                            <h4>ট ৫০০</h4>
                            <li><Link className="text-link" to="/login" style={{ textDecoration: 'none' }}>Read More</Link></li>
                        </div>
                    </div>

                    <div class="card">
                        <div class="imgBx">
                            <img src="https://images.tynker.com/blog/wp-content/uploads/20190226100225/02-25-2018-html-css-announcement-blog.png" />
                        </div>
                        <div class="content">
                            <h2>HTML & CSS</h2>
                            <p>ফ্রন্টেন্ড ও ব্যাকএন্ড ডেভেলপার দের জন্য জাভাস্ক্রিপ্ট কোর্স । </p>
                            <h4>ট ৫০০</h4>
                            <li><Link className="text-link" to="/login" style={{ textDecoration: 'none' }}>Read More</Link></li>
                        </div>
                    </div>

                    <div class="card">
                        <div class="imgBx">
                            <img src="https://images.tynker.com/blog/wp-content/uploads/20190226100225/02-25-2018-html-css-announcement-blog.png" />
                        </div>
                        <div class="content">
                            <h2>HTML & CSS</h2>
                            <p>ফ্রন্টেন্ড ও ব্যাকএন্ড ডেভেলপার দের জন্য জাভাস্ক্রিপ্ট কোর্স । </p>
                            <h4>ট ৫০০</h4>
                            <li><Link className="text-link" to="/login" style={{ textDecoration: 'none' }}>Read More</Link></li>
                        </div>
                    </div>

                    <div class="card">
                        <div class="imgBx">
                            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/X_Reasons_to_learn_Javascript.jpg" />
                        </div>
                        <div class="content">
                            <h3>Javascript</h3>
                            <p>ফ্রন্টেন্ড ও ব্যাকএন্ড ডেভেলপার দের জন্য জাভাস্ক্রিপ্ট কোর্স । </p>
                            <h4>ট ৫০০</h4>
                            <li><Link className="text-link" to="/login" style={{ textDecoration: 'none' }}>Read More</Link></li>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AllCourses