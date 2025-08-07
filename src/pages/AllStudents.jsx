import {useEffect, useState} from 'react'
import Header from '../components/Header'
import { BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router';
import { getStudentsListAPI } from '../service/api';
import { IoPersonAdd } from "react-icons/io5"
import FullPageLoader from '../components/FullPageLoader';
import Swal from 'sweetalert2';

const AllStudents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('==== Implement search logic here ====')
    
  }
  const confirmAction = ()=>{
    Swal.fire({
    icon: "warning",
    title: "Confirm",
    text: "Are you sure want to delete",
    })
  }

  async function getStudentsList(){
    try{
      setIsLoading(true);
      const response = await getStudentsListAPI();
      setIsLoading(false);
      if(response.success){
        setStudentsList(response.data);
      }
    }catch(err){
      console.error(err);
      setIsLoading(false);
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
      <Header backLink='/' />
      <div className='aside-links mb-4'>
        <Link to='/add-student' className='button button-primary-outline button-fit flex items-center gap-2'>
        <IoPersonAdd/> Add new Student</Link>
      </div>
      <div className='table-container'>
        <div className='table-filters'>
          <form onSubmit={handleSubmit} className='table-filter'>
            <input type="text" name="" id="" className='table-filter-input' placeholder='Search by name, username, or phone number' />
            <button className='table-filter-button'>Search</button>
          </form>
          {/* <div className='table-record-count'>Total records based on search: 100</div> */}
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th><div className='table-cell'>Name</div></th>
              <th><div className='table-cell'>Username</div></th>
              <th><div className='table-cell'>Phone</div></th>
              <th><div className='table-cell'>ID card number</div></th>
              <th><div className='table-cell'>Date of birth</div></th>
              <th className='table-action-head'><div className='table-cell'>Action</div></th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map(item => (
              <tr key={item.id}>
                <td>
                  <div className='table-cell'>{item.name}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.username}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.phone_number}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.idCardNumber}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.dateOfBirth}</div>
                </td>
                <td>
                  <div className='table-cell'>
                    <div className='table-actions'>
                      <Link to='/student-details' className='table-action action-primary'>
                        <BiDetail />
                      </Link>
                      <button onClick={()=>{confirmAction()}} className='table-action action-danger'>
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
    </div>
    </>
  )
}

export default AllStudents