import React from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';

const DrivingInstructorHome = () => {
  return (
    <div className='flex flex-col h-screen w-screen p-4'>
      <Header />
      <div className='small-container'>
        <div className='row'>
          <div className='col-50'>
            <Link to='/add-customer' className='tile'>
              <h4 className='tile-title'>New</h4>
            </Link>
            <Link to='/all-customers' className='tile'>
              <h4 className='tile-title'>All customer list</h4>
            </Link>
            <Link to='/all-customers' className='tile'>
              <h4 className='tile-title'>Finished Customers</h4>
            </Link>
            {/* <Link to='/booking-requests' className='tile'>
              <h4 className='tile-title'>Booking requests</h4>
              <p className='tile-description'>
                View, approve, or reject booking requests
              </p>
            </Link>
            <Link to='/set-time-slots' className='tile'>
              <h4 className='tile-title'>Set Time Slots</h4>
              <p className='tile-description'>
                A place to set or change time slots
              </p>
            </Link> */}
          </div>
          <div className='col-50'>
            <Link className='tile'>
              <h4 className='tile-title'>Create Invoice</h4>
            </Link>
            <Link className='tile'>
              <h4 className='tile-title'>Invoices Folder</h4>
            </Link>
            <Link to="/expenses" className='tile'>
              <h4 className='tile-title'>Expenses</h4>
            </Link>
            <Link to="/vat" className='tile'>
              <h4 className='tile-title'>VAT</h4>
            </Link>
            <Link to="/profit-loss" className='tile'>
              <h4 className='tile-title'>Profit-Loss</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingInstructorHome;
