import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";

const StudentHome = () => {
  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header />
      <div className="small-container">
        <div className="row">
          <div className="col-50">
            <Link to="/booking-dates" className="tile">
              <h4 className="tile-title">Book lesson</h4>
              <p className="tile-description">
                Select a day for your booking.
              </p>
            </Link>
            <Link to='/booked-list' className="tile">
              <h4 className="tile-title">My lessons</h4>
              <p className="tile-description">View your booked lessons.</p>
            </Link>
          </div>
          <div className="col-50">
            <Link to='/change-password' className="tile">
              <h4 className="tile-title">Change password</h4>
              <p className="tile-description">Change your password.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
