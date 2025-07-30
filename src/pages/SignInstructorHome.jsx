import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";

const SignInstructorHome = () => {
  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header />
      <div className="small-container">
        <div className="row">
          <div className="col-50">
            <Link to="/all-students" className="tile">
              <h4 className="tile-title">All students</h4>
              <p className="tile-description">
                A place to view and manage your students.
              </p>
            </Link>
            <Link to="/add-student" className="tile">
              <h4 className="tile-title">Add new student</h4>
              <p className="tile-description">A place to create new students</p>
            </Link>
            <Link to="/set-time-slots" className="tile">
              <h4 className="tile-title">Set time slots</h4>
              <p className="tile-description">
                Set or change time slots for classes.
              </p>
            </Link>
            <Link to="/booked-lessons" className="tile">
              <h4 className="tile-title">Booked lessons</h4>
              <p className="tile-description">View list of booked lessons</p>
            </Link>
          </div>
          <div className="col-50">
            <Link className="tile">
              <h4 className="tile-title">Invoices</h4>
              <p className="tile-description">View and manage your invoices.</p>
            </Link>
            <Link className="tile">
              <h4 className="tile-title">Analytics</h4>
              <p className="tile-description">View analytics and reports.</p>
            </Link>
            <Link className="tile">
              <h4 className="tile-title">Calendar</h4>
              <p className="tile-description">
                View your bookings on a calendar.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInstructorHome;
