import React from 'react';
import "../css/logout.css";

const Logoutimg = () => {
    localStorage.clear()
    return (
        <div>
                    <div class="logoutbg">
                        <div class="p-trunc footer-logo col-md-15">
                        
                                <h1>ধন্যবাদ!</h1>
                                <h2>আপনার লগ-আউট সম্পন্ন হয়েছে</h2>
                                <div class="logout-img">
                        </div >
                        
                        </div>
                        
                        
                        
                    </div>
 </div>

        );
    }
    
    export default Logoutimg;