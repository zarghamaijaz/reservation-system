import {Routes, Route} from 'react-router';
import Login from './pages/Login';
// import Signup from './pages/Signup';


// Admin pages
import DrivingInstructorHome from './pages/DrivingInstructorHome';
import AllCustomers from './pages/AllCustomers';
import AddNewCustomer from './pages/AddNewCustomer';
import CustomerDetails from './pages/CustomerDetails';
import CustomerLessons from './pages/CustomerLessons';
import Expenses from "./pages/Expenses";
// import BookingRequests from './pages/BookingRequests';

// Student pages
import StudentHome from './pages/StudentHome';
// import BookingList from './pages/BookingList';
// import BookedList from './pages/BookedList';
// import BookingDates from './pages/BookingDates';

// Shared pages
import ChangePassword from './pages/ChangePassword';



import LoggedRoute from './routing/LoggedRoute';
import GuestRoute from './routing/GuestRoute';
import NotFound from './pages/NotFound';
import NotAllowed from './pages/NotAllowed';
import Logout from './pages/Logout';
import SetTimeSlots from './pages/SetTimeSlots';
import ProfitLoss from './pages/ProfitLoss';
import VAT from './pages/VAT';

function App() {

  return (
    <Routes>
      {/* Routes for only logged in users */}
      <Route path='/' element={<LoggedRoute/>}>
        <Route path='/driving-instructor-home' element={<DrivingInstructorHome/>} />
        <Route path='/all-customers' element={<AllCustomers/>} />
        <Route path='/add-customer' element={<AddNewCustomer/>} />
        <Route path='/customer-details' element={<CustomerDetails/>} />
        <Route path='/customer-lessons' element={<CustomerLessons/>} />
        <Route path='/expenses' element={<Expenses/>} />
        <Route path='/profit-loss' element={<ProfitLoss/>} />
        <Route path='/vat' element={<VAT/>} />
        <Route path='/set-time-slots' element={<SetTimeSlots/>} />
        {/* <Route path='/booking-requests' element={<BookingRequests/>} /> */}

        {/* Student routes */}
        <Route path='/student-home' element={<StudentHome/>} />
        {/* <Route path='/booked-list' element={<BookedList/>} /> */}

        {/* Shared routes */}
        <Route path='/change-password' element={<ChangePassword/>} />
      </Route>


      
      {/* Routes for logged out users only */}
      <Route path='/' element={<GuestRoute/>}>
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/signup' element={<Signup/>} /> */}
      </Route>

      {/* <Route path='/booking-dates' element={<BookingDates/>} /> */}
      {/* <Route path='/booking-list' element={<BookingList/>} /> */}
      <Route path='/logout' element={<Logout/>} />
      <Route path='/not-allowed' element={<NotAllowed/>} />
      <Route path='*' element={<NotFound/>} />
      {/* Routes for all users redardless of login status */}

    </Routes>
  )
}

export default App
