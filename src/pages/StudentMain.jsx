import {useState, useEffect} from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import FullPageLoader from "../components/FullPageLoader";
import { getJwtData } from "../../utils/jwtData.utils";
import { getUnpaidAmountAPI } from "../service/api";
import Swal from "sweetalert2";

const StudentMain = () => {
  const jwtData = getJwtData();
  const [myPaymentInfo, setMyPaymentInfo] = useState({});
  async function getMyPaymentInfo() {
    try{
      setIsLoading(true);
      const response = await getUnpaidAmountAPI(jwtData._id);
      setMyPaymentInfo(response);
    }catch(err){
      setIsLoading(false);
      if(err.detail){
          Swal.fire("Error", err.detail, "error")
      }
  }
  }
  useEffect(()=>{
    getMyPaymentInfo();
  },[])
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/student-home" />
      <div className="small-container">
        <div className="card">
          <div className="card-title mb-8">Hi Setlios</div>
          <div className="button-group">
            <Link to="/book-appointment" className="button button-primary">Choose appointment</Link>
            <Link to="/my-appointments" className="button button-primary-outline">Canncel appointment</Link>
          </div>
          <div className="text-center">
            <span className="font-bold">Unpaid amount:</span> {myPaymentInfo.unpaid_amount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMain;
