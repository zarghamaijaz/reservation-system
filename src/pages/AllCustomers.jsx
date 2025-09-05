import {useEffect, useState} from 'react'
import Header from '../components/Header'
import { BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router';
import { getCustomersListAPI, deleteCustomerAPI, printNeedTestAPI } from '../service/api';
import { IoPersonAdd } from "react-icons/io5"
import { IoMdPrint } from "react-icons/io";
import FullPageLoader from '../components/FullPageLoader';
import Pill from "../components/Pill"
import Swal from 'sweetalert2';
import { convertUTCToLocal, countDaysFromNow } from '../../utils/date.utils';

const AllCustomers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('==== Implement search logic here ====')
    
  }
  async function exportNeedTest(e){
    e.preventDefault();
    setIsLoading(true);
    const response = await printNeedTestAPI();
    setIsLoading(false);
    // Extract filename from headers (if provided)
    let filename = "Customers-need-test.csv";

    // Create a Blob from the response
    const blob = new Blob([response], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  async function getStudentsList(){
    try{
      setIsLoading(true);
      const response = await getCustomersListAPI();
      setIsLoading(false);
      if(response.students && response.students.length > 0){
        setStudentsList(response.students);
      }
      else return Swal.fire("No customers found", "Unable to find any customer in the database", "error");
    }catch(err){
      console.error(err);
      setIsLoading(false);
    }
  }

  function handleDelete(customerId) {
    return function(e){
      e.preventDefault();
      Swal.fire({
        title: "Do you want to delete the customer?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "red",
        denyButtonText: `Cancel`
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          const response = await deleteCustomerAPI(customerId);
          getStudentsList();
        }
      });
    }
  }
  useEffect(()=>{
    getStudentsList();
  }, []);
  return (
    <>
    {isLoading && (
      <FullPageLoader />
    )}
    <div className='flex flex-col h-screen w-screen p-4'>
      <Header backLink='/driving-instructor-home' />
      <div className='aside-links mb-4'>
        <Link to='/add-customer' className='button button-primary-outline button-fit flex items-center gap-2'>
        <IoPersonAdd/> Add new customer</Link>
      </div>
      <div className='table-container'>
        {/* <div className='table-filters'>
          <form onSubmit={handleSubmit} className='table-filter'>
            <input type="text" name="" id="" className='table-filter-input' placeholder='Search by name, username, or phone number' />
            <button className='table-filter-button'>Search</button>
          </form>
          <div className='table-record-count'>Total records based on search: 100</div>
        </div> */}
        <table className='table bordered'>
          <thead>
            <tr>
              <th><div className='table-cell'>Name</div></th>
              <th><div className='table-cell'>ID</div></th>
              <th><div className='table-cell'>D|Birth</div></th>
              <th><div className='table-cell'>Category</div></th>
              <th><div className='table-cell'>No plate</div></th>
              <th><div className='table-cell'>Need test</div></th>
              <th><div className='table-cell'>Have test</div></th>
              <th><div className='table-cell'>Start time</div></th>
              <th><div className='table-cell'>End time</div></th>
              <th><div className='table-cell'>Alert</div></th>
              <th className='table-action-head'><div className='table-cell'>Open</div></th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map(item => (
              <tr key={item.id}>
                <td>
                  <div className='table-cell'>{item.name}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.idDigit}-{item.idValue}</div>
                </td>
                <td>
                  <div className='table-cell'>{convertUTCToLocal(item.dateOfBirth, "date")}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.category}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.carNoPlate}</div>
                </td>
                <td>
                  <div className='table-cell'><Pill active={item.option && item.option.includes("needtest")}/></div>
                </td>
                <td>
                  <div className='table-cell'>{convertUTCToLocal(item.testDate, "date")}</div>
                </td>
                <td>
                  <div className='table-cell'>{convertUTCToLocal(item.testStartTime, "time")}</div>
                </td>
                <td>
                  <div className='table-cell'>{convertUTCToLocal(item.testEndTime, "time")}</div>
                </td>
                <td>
                  <div className='table-cell'><Pill active={countDaysFromNow(item.visaExpire) < 20}/></div>
                </td>
                <td>
                  <div className='table-cell'>
                    <div className='table-actions'>
                      <Link to={`/customer-details?customer-id=${item.id}`} className='table-action action-primary'>
                        <BiDetail />
                      </Link>
                      <button onClick={handleDelete(item.id)} className='table-action action-danger'>
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <div className='button-group'>
        <Link to="/driving-instructor-home" className='button button-primary-outline'>Back</Link>
        <button onClick={exportNeedTest} className='button button-primary flex items-center gap-2'>
          <IoMdPrint />
          <span>Print need test</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default AllCustomers