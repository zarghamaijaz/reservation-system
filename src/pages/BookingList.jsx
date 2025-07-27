import React from "react";
import Header from "../components/Header";
import { useSearchParams } from "react-router";

const BookingList = () => {
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("selected-date");
  return (
    <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink='/booking-dates' />
      <div className="small-container">
        <h2 className="section-title">Available slots for {selectedDate}</h2>
        <div className="row">
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">11:00 to 12:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">12:30 to 02:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">02:00 to 03:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">01/07/2025</h4>
              <p className="tile-description">03:30 to 05:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">11:00 to 12:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">12:30 to 02:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">02:00 to 03:30</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
          <div className="col-50">
            <div className="tile">
              <h4 className="tile-title">02/07/2025</h4>
              <p className="tile-description">03:30 to 05:00</p>
              <button className="button button-primary">Book now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
