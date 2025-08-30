import React from "react";
import { Link } from "react-router";
import { getJwtData } from "../../utils/jwtData.utils";

const Header = ({ backLink }) => {
  const jwtData = getJwtData();
  if (jwtData) {
    const { name, username, role } = jwtData;
    return (
      <header className="header">
        <div className="header-links">
          <Link className="link link-primary" to={backLink}>
            Go back
          </Link>
          <div>Logged in as {`${name ? name : username} (${role})`}</div>
          <Link to="/logout" className="link link-danger">
            Logout
          </Link>
        </div>
      </header>
    );
  } else {
    return null;
  }
};

export default Header;
