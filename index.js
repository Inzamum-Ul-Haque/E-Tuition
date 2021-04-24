import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll",() =>{
  if(window.pageYOffset> 100){
    toTop.classList.add("active");
  }else{
    toTop.classList.remove("active");
  }
})
