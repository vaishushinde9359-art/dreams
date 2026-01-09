import React from "react";
import "./Footer.css";
import logo from '../assets/logo.png';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Not found" />
        </div>
        <nav className="footer-nav">
          <a href="#">Company</a>
          <a href="#">Resources</a>
          <a href="#">Legal</a>
          <a href="#">Contact</a>
        </nav>
        <div className="footer-credit">
          &copy; {new Date().getFullYear()} Made with ❤️ by MyCompany
        </div>
      </div>
    </footer>
  );
}
