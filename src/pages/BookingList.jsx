import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSearchParams } from "react-router";
// import BookNowCard from "../components/form-elements/BookNowCard";
import { getBookingListByDateAPI } from "../service/api";
import BookNowCard from "../components/form-elements/BookNowCard";
const BookingList = () => {
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("selected-date");
  const [bookingList,setBookingList] = useState([])

  useEffect(()=>{
    getBookingListByDate()
  },[])


  const getBookingListByDate = ()=>{
    getBookingListByDateAPI().then(data=>{
      if(data.success){
        setBookingList(data.data)
        console.log("succes" , data)
      }
      else{
        console.log("err",data)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="flex flex-col h-screen w-screen p-4">
        <Header backLink='/booking-dates' />
      <div className="small-container">
        <h2 className="section-title">Available slots for {selectedDate}</h2>
        <div className="row">
            {
              bookingList.length > 0 ? (
                bookingList.map(l=>{
                  return(
                    <BookNowCard timeStart={l.startTime} timeEnd={l.endTime} date={'monday/01/08/2025'}/>
                  )
                })
              )
              :
              ""
            }
            {
              console.log(bookingList)
            }
          
          {/* <div className="col-50">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
