import React from "react";
import Header from "../components/Header";

const BookedList = () => {
  return (
    <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink='/student-home' />
      <div className="small-container">
        <h2 className="section-title">Your lessons</h2>
        <div className="row">
          <div className="col-50">
            <div className="tile">
              <h3 className="tile-title" style={{textAlign: 'end'}}>€60</h3>
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">11:00 to 12:30</p>
              <p className="tile-description">First lesson</p>
              <button disabled className="button button-primary">Booked</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h3 className="tile-title" style={{textAlign: 'end'}}>€50</h3>
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">12:30 to 02:00</p>
              <p className="tile-description">Second lesson</p>
              <button disabled className="button button-primary">Payment in review</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h3 className="tile-title" style={{textAlign: 'end'}}>€45</h3>
              <h4 className="tile-title">03/07/2025</h4>
              <p className="tile-description">12:30 to 02:00</p>
              <p className="tile-description">Driving test</p>
              <button className="button button-primary">Request payment review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedList;
