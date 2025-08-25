import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import { getJwtData } from "../../utils/jwtData.utils";

const StudentHome = () => {
  const jwtData = getJwtData();
  const {name, category, car_no_plate, phone_number} = jwtData;
  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header />
      <div className="small-container">
        <div className="card">
          <div className="detail-container">
            <div className="detail-name">Name:</div>
            <div className="detail-value">{name}</div>
          </div>
          <div className="detail-container">
            <div className="detail-name">Phone:</div>
            <div className="detail-value">{phone_number}</div>
          </div>
          <div className="detail-container">
            <div className="detail-name">Category:</div>
            <div className="detail-value">{category}</div>
          </div>
          <div className="detail-container">
            <div className="detail-name">Car:</div>
            <div className="detail-value">{car_no_plate}</div>
          </div>
          <div className="button-group mt-8">
            <Link to="/student-main" className="button button-primary">Next</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
