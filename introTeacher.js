
import React from "react";
import {Link, NavLink} from 'react-router-dom'


const IntroTeacher = () => {

    return (
        <div className="t-section">
            <div className="intro-section">
                <div className="t-text text-white">
                    <h1>Are You Interested In Teaching?</h1>
                    <p>Create online courses, training & career track programs for individuals</p>
                    <Link to="/createCourseBgImg">
                        <button class="btn-lg btn-primary ">Learn More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IntroTeacher;
