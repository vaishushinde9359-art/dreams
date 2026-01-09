import React from "react";
import "./Navbar.css";
import { IoIosSearch } from "react-icons/io";
// import Symboll from '../assets/Symboll.png';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          
           <img src={logo} alt="not found" />
          </div>
        <ul className="nav-links">
          <Link to="/"><li>Home</li></Link>
          <Link to="/projects"><li>Projects</li></Link>
          <li>Students</li>
          <Link to="/formproject"><li className="add_project">Add Project</li></Link>
        </ul>
      </div>

      <div className="nav-right">
        <div className="search-box">
         <p className="icon">< IoIosSearch /></p> 
          <input type="text" placeholder="Search" />
          {/* //icon */}
          
        </div>
        <Link to="/signup" className="login-btn">Registration</Link>
      </div>
    </nav>
  );
};

export default Navbar;
