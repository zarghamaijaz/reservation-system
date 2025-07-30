import {Routes, Route} from 'react-router';
import Login from './pages/Login';
// import Signup from './pages/Signup';


// Admin pages
import DrivingInstructorHome from './pages/DrivingInstructorHome';
import SignInstructorHome from './pages/SignInstructorHome';
import AllStudents from './pages/AllStudents';
import AddNewStudent from './pages/AddNewStudent';
import StudentDetails from './pages/StudentDetails';

// Student pages
import StudentHome from './pages/StudentHome';
import BookingList from './pages/BookingList';
import BookedList from './pages/BookedList';
import BookingDates from './pages/BookingDates';



import LoggedRoute from './routing/LoggedRoute';
import GuestRoute from './routing/GuestRoute';
import NotFound from './pages/NotFound';
import NotAllowed from './pages/NotAllowed';
import Logout from './pages/Logout';
import SetTimeSlots from './pages/SetTimeSlots';

function App() {

  return (
    <Routes>
      {/* Routes for only logged in users */}
      <Route path='/' element={<LoggedRoute/>}>
        <Route path='/driving-instructor-home' element={<DrivingInstructorHome/>} />
        <Route path='/sign-instructor-home' element={<SignInstructorHome/>} />
        <Route path='/all-students' element={<AllStudents/>} />
        <Route path='/add-student' element={<AddNewStudent/>} />
        <Route path='/student-details' element={<StudentDetails/>} />

        {/* Student routes */}
        <Route path='/student-home' element={<StudentHome/>} />
        <Route path='/booking-dates' element={<BookingDates/>} />
        <Route path='/booking-list' element={<BookingList/>} />
        <Route path='/booked-list' element={<BookedList/>} />
      </Route>


      
      {/* Routes for logged out users only */}
      <Route path='/' element={<GuestRoute/>}>
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/signup' element={<Signup/>} /> */}
      </Route>

      <Route path='/set-time-slots' element={<SetTimeSlots/>} />
      <Route path='/logout' element={<Logout/>} />
      <Route path='/not-allowed' element={<NotAllowed/>} />
      <Route path='*' element={<NotFound/>} />
      {/* Routes for all users redardless of login status */}

    </Routes>
  )
}

export default App
