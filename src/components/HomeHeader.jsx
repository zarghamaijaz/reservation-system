import React from "react";
import { Link } from "react-router";

const HomeHeader = () => {
  function scrollToById(id) {
    return function(e){
      e.preventDefault();
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <header className="home-header">
      <Link to="/home" className="home-header-logo-container">
        <img src="assets/images/logo.png" alt="" />
      </Link>
      <div className="home-header-links">
        <Link to="/home" className="link">Home</Link>
        <Link to="/about" className="link">About us</Link>
        <Link className="link" onClick={scrollToById("location")}>Contact & location</Link>
      </div>
      <div className="home-header-buttons">
        <Link to="/login-types" className="button button-primary">
          Login
        </Link>
        <a href="assets/guides/road-signs.pdf" target="_blank"  className="button button-primary-outline">
          Download road signs
        </a>
      </div>
    </header>
  );
};

export default HomeHeader;
