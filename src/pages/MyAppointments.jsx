import {useState, useEffect} from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import { MdCancel } from "react-icons/md";
import { cancelBookingAPI, getMyBookingsAPI } from "../service/api";
import FullPageLoader from "../components/FullPageLoader";
import Swal from "sweetalert2";

const MyAppointments = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    async function getMyBookings(){
        try{
            setIsLoading(true);
            const response = await getMyBookingsAPI();
            setIsLoading(false);
            if(response.bookings){
                setBookings(response.bookings);
            }
        }catch(err){
            setIsLoading(false);
            if(err.detail){
                Swal.fire("Error", err.detail, "error")
            }
        }
    }
    useEffect(()=>{
        getMyBookings();
    },[])
    function cancelBooking(data) {
        return async function (e) {
            e.preventDefault();
            console.log(data);
            Swal.fire({
            title: "Cancel appointment?",
            text: "Do you want to cancel this appointment?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "var(--clr-primary)",
            cancelButtonColor: "var(--clr-danger)",
            confirmButtonText: "Yes"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    setIsLoading(true);
                    const response = await cancelBookingAPI(data);
                    getMyBookings();
                    setIsLoading(false);
        
                }catch (err) {
                setIsLoading(false);
                if(err.detail){
                    Swal.fire("Error", err.detail, "error");
                }
                console.error(err);
                }
            }
            });
        };
      }
  return (
    <>
    {isLoading && <FullPageLoader />}
    <div className="flex flex-col h-screen w-screen p-4">
      <Header backLink="/student-main" />
      <div className="small-container">
        <div className="card">
            <div className="table-container">
                <table className="table bordered">
                    <thead>
                        <tr>
                            <th>
                                <div className="table-cell">Date</div>
                            </th>
                            <th>
                                <div className="table-cell">Start time</div>
                            </th>
                            <th>
                                <div className="table-cell">End time</div>
                            </th>
                            <th>
                                <div className="table-action-head">Action</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(item => (
                            <tr key={item.lesson_id}>
                                <td>
                                    <div className="table-cell">{item.date}</div>
                                </td>
                                <td>
                                    <div className="table-cell">{item.start_time}</div>
                                </td>
                                <td>
                                    <div className="table-cell">{item.end_time}</div>
                                </td>
                                <td>
                                    <div className="table-cell">
                                        <div className='table-actions'>
                                            <button onClick={cancelBooking(item.lesson_id)} className="table-action action-danger flex gap-2 item-center">
                                                <MdCancel/>
                                                <span style={{fontSize: "1rem"}}>Cancel</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MyAppointments;
