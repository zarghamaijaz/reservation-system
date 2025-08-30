import React from "react";
import { Link } from "react-router";

const HomeFooter = () => {
  return (
    <footer>
      <nav className="footer-nav">
        <ul className="footer-links">
          <li className="footer-link">
            <Link to="/home">Home</Link>
          </li>
          <li className="footer-link">
            <Link to="/about">About us</Link>
          </li>
          <li className="footer-link">
            <a href="assets/guides/road-signs.pdf" target="_blank">Download road signs (PDF)</a>
          </li>
        </ul>
      </nav>
      <div className="footer-copyright">
        <p className="footer-copyright-text">Copyright &copy; 2023</p>
      </div>
    </footer>
  );
};

export default HomeFooter;
