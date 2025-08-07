import {useEffect, useState} from 'react'
import Header from '../components/Header'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from 'react-router';
import { getBookingRequestsAPI, changeBookingStatusAPI } from '../service/api';
import FullPageLoader from '../components/FullPageLoader';
import { FcApprove } from "react-icons/fc";
import Swal from 'sweetalert2';


const BookingRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRequests, setBookingRequests] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('==== Implement search logic here ====')
    
  }
  const confirmAction = (id,decision)=>{
    Swal.fire({
      icon: "warning",
      title: "Confirm",
      text: "Are you sure want to delete or approve",
    }).then(res=>{
      if(res.isConfirmed){
        changeStatus(id,decision)
      }
    })
  }
  function changeStatus(id, decision){
    return async function(){
        try{
            const payload = {
                id,
                status: decision
            }
            setIsLoading(true);
            const response = await changeBookingStatusAPI(payload);
            setIsLoading(false);
            getBookingRequests();
            console.log(response);
        }catch(err){
            console.error(err);
            setIsLoading(false);
        }
    }
  }
  async function getBookingRequests(){
    try{
      setIsLoading(true);
      const response = await getBookingRequestsAPI();
      setIsLoading(false);
      if(response.success){
        setBookingRequests(response.data);
      }
    }catch(err){
      console.error(err);
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    getBookingRequests();
  }, []);
  return (
    <>
    {isLoading && (
      <FullPageLoader />
    )}
    <div className='flex flex-col h-screen w-screen p-4'>
      <Header backLink='/' />
      <div className='table-container'>
        {/* <div className='table-filters'>
          <form onSubmit={handleSubmit} className='table-filter'>
            <input type="text" name="" id="" className='table-filter-input' placeholder='Search by name, id, or phone' />
            <button className='table-filter-button'>Search</button>
          </form>
          <div className='table-record-count'>Total records based on search: 100</div>
        </div> */}
        <table className='table'>
          <thead>
            <tr>
              <th><div className='table-cell'>Name</div></th>
              <th><div className='table-cell'>Phone</div></th>
              <th><div className='table-cell'>Date</div></th>
              <th><div className='table-cell'>Start time</div></th>
              <th><div className='table-cell'>End time</div></th>
              <th><div className='table-cell'>Status</div></th>
              <th className='table-action-head'><div className='table-cell'>Action</div></th>
            </tr>
          </thead>
          <tbody>
            {bookingRequests.map(item => (
              <tr key={item.id}>
                <td>
                  <div className='table-cell'>{item.name}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.phone_number}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.date}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.start_time}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.end_time}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.status}</div>
                </td>
                <td>
                  <div className='table-cell'>
                    {item.status === "pending" && (
                        <div className='table-actions'>
                        <button onClick={()=>{confirmAction(item.id, "completed")}} className='table-action action-primary'>
                            <FaCheck />
                        </button>
                        <button onClick={()=>{confirmAction(item.id, "cancelled")}} className='table-action action-danger'>
                            <ImCross />
                        </button>
                        </div>
                    )}
                    {item.status === "completed" && (
                        <FcApprove />
                    )}
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default BookingRequests