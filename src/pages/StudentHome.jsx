import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import { getMyInformationAPI } from "../service/api";
import Swal from "sweetalert2";
import FullPageLoader from "../components/FullPageLoader";


const INITIAL_STATE = {
  name: "",
  category: "",
  car_no_plate: "",
  phone_number: "",
}
const StudentHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myInformation, setMyInformation] = useState(INITIAL_STATE);

  async function getMyInformation() {
    try{
      setIsLoading(true);
      const response = await getMyInformationAPI();
      setIsLoading(false);
      setMyInformation(response);
    }catch(err){
      Swal.fire("Error", "An error occured", "Please reload the page.", "error");
      console.error(err);
      setIsLoading(false);
      
    }
  }

  useEffect(()=>{
    getMyInformation();
  },[]);

  return (
    <>
    {isLoading && <FullPageLoader />}
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/" />
      <div className="small-container">
        <div className="card">
          <div className="detail-container">
            <div className="detail-name">Name:</div>
            <div className="detail-value">{myInformation.name}</div>
          </div>
          <div className="detail-container">
            <div className="detail-name">Phone:</div>
            <div className="detail-value">{myInformation.phone_number}</div>
          </div>
          <div className="detail-container">
            <div className="detail-name">Category:</div>
            <div className="detail-value">{myInformation.category}</div>
          </div>
          <div className="detail-container">
            <div className="detail-name">Car:</div>
            <div className="detail-value">{myInformation.car_no_plate}</div>
          </div>
          <div className="button-group mt-8">
            {
              myInformation.student_id && (
                <Link to={`/student-main?customer_id=${myInformation.student_id}`} className="button button-primary">Next</Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentHome;
