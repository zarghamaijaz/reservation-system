import React from "react";
import { Link } from "react-router";

const HomeHeader = () => {
  return (
    <header className="home-header">
      <div className="home-header-logo-container">
        <img src="assets/images/logo.png" alt="" />
      </div>
      <div className="home-header-links">
        <Link className="link">Home</Link>
        <Link className="link">About us</Link>
        <Link className="link">Our location</Link>
      </div>
      <div className="home-header-buttons">
        <Link to="/login-types" className="button button-primary">
          Login
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
