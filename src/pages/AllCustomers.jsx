import {useEffect, useState} from 'react'
import Header from '../components/Header'
import { BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router';
import { getCustomersListAPI } from '../service/api';
import { IoPersonAdd } from "react-icons/io5"
import { IoMdPrint } from "react-icons/io";
import FullPageLoader from '../components/FullPageLoader';
import Pill from "../components/Pill"

const AllCustomers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('==== Implement search logic here ====')
    
  }

  async function getStudentsList(){
    try{
      setIsLoading(true);
      const response = await getCustomersListAPI();
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
        <Link to='/add-customer' className='button button-primary-outline button-fit flex items-center gap-2'>
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
                  <div className='table-cell'>{item.idCardNumber}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.dateOfBirth}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.category}</div>
                </td>
                <td>
                  <div className='table-cell'>{item.carNoPlate}</div>
                </td>
                <td>
                  <div className='table-cell'><Pill active={item.needTest}/></div>
                </td>
                <td>
                  <div className='table-cell'>{item.haveTest}</div>
                </td>
                <td>
                  <div className='table-cell'><Pill active={item.visaExpire}/></div>
                </td>
                <td>
                  <div className='table-cell'>
                    <div className='table-actions'>
                      <Link to='/customer-details' className='table-action action-primary'>
                        <BiDetail />
                      </Link>
                      <button className='table-action action-danger'>
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
        <Link to="/" className='button button-primary-outline'>Back</Link>
        <button to="/" className='button button-primary flex items-center gap-2'>
          <IoMdPrint />
          <span>Print need test</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default AllCustomers