import {Routes, Route} from 'react-router';
import Login from './pages/Login';
// import Signup from './pages/Signup';


// Admin pages
import DrivingInstructorHome from './pages/DrivingInstructorHome';
import SignInstructorHome from './pages/SignInstructorHome';
import AllStudents from './pages/AllStudents';
import AddNewStudent from './pages/AddNewStudent';
import StudentDetails from './pages/StudentDetails';
import BookingRequests from './pages/BookingRequests';
import AdminPanel from './pages/AdminPanel';
import NewStudent from './pages/NewStudent';
import StudentList from './pages/StudentList';
import Expenses from './pages/Expenses';
// Student pages
import StudentHome from './pages/StudentHome';
import BookingList from './pages/BookingList';
import BookedList from './pages/BookedList';
import BookingDates from './pages/BookingDates';

// Shared pages
import ChangePassword from './pages/ChangePassword';



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
      
        {/* <Route path='/driving-instructor-home' element={<DrivingInstructorHome/>} />
        <Route path='/sign-instructor-home' element={<SignInstructorHome/>} />
        <Route path='/all-students' element={<AllStudents/>} />
        <Route path='/add-student' element={<AddNewStudent/>} />
        <Route path='/student-details' element={<StudentDetails/>} />
        <Route path='/set-time-slots' element={<SetTimeSlots/>} />
        <Route path='/booking-requests' element={<BookingRequests/>} /> */}

        {/* Student routes */}
        {/* <Route path='/student-home' element={<StudentHome/>} />
        <Route path='/booked-list' element={<BookedList/>} /> */}

        {/* Shared routes */}
        {/* <Route path='/change-password' element={<ChangePassword/>} /> */}

      </Route>


      
      {/* Routes for logged out users only */}
      <Route path='/' element={<GuestRoute/>}>
        <Route path='/login' element={<Login/>} />
        <Route path='/admin-panel' element={<AdminPanel/>} />
        <Route path='/all-students' element={<StudentList/>} />
        <Route path='/create-new-student' element={<NewStudent/>} />
        <Route path='/expenses' element={<Expenses/>} />
        {/* <Route path='/signup' element={<Signup/>} /> */}
      </Route>

      {/* <Route path='/booking-dates' element={<BookingDates/>} />
      <Route path='/booking-list' element={<BookingList/>} />
      <Route path='/logout' element={<Logout/>} />
      <Route path='/not-allowed' element={<NotAllowed/>} />
      <Route path='*' element={<NotFound/>} /> */}
      {/* Routes for all users redardless of login status */}

    </Routes>
  )
}

export default App
