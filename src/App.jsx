import {Routes, Route} from 'react-router';
import Login from './pages/Login';


// Admin pages
import DrivingInstructorHome from './pages/DrivingInstructorHome';
import AllCustomers from './pages/AllCustomers';
import AddNewCustomer from './pages/AddNewCustomer';
import CustomerDetails from './pages/CustomerDetails';
import CustomerLessons from './pages/CustomerLessons';
import Expenses from "./pages/Expenses";
import ProfitLoss from './pages/ProfitLoss';
import VAT from './pages/VAT';

// Student pages
import StudentHome from './pages/StudentHome';

// Shared pages
import LoggedRoute from './routing/LoggedRoute';
import GuestRoute from './routing/GuestRoute';
import NotFound from './pages/NotFound';
import NotAllowed from './pages/NotAllowed';
import Logout from './pages/Logout';
import StudentMain from './pages/StudentMain';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import AdminLogin from './pages/AdminLogin';
import LoginTypes from './pages/LoginTypes';
import Home from './pages/Home';
import About from './pages/About';
import FinishedCustomers from './pages/FinishedCustomers';
import CreateInvoice from './pages/CreateInvoice';
import AllInvoices from './pages/AllInvoices';
import ViewAppointments from './pages/ViewAppointments';
import AllLessons from './pages/AllLessons';

function App() {

  return (
    <Routes>
      {/* Routes for only logged in users */}
      <Route path='/' element={<LoggedRoute/>}>
        <Route path='/driving-instructor-home' element={<DrivingInstructorHome/>} />
        <Route path='/all-customers' element={<AllCustomers/>} />
        <Route path='/finished-customers' element={<FinishedCustomers/>} />
        <Route path='/add-customer' element={<AddNewCustomer/>} />
        <Route path='/customer-details' element={<CustomerDetails/>} />
        <Route path='/customer-lessons' element={<CustomerLessons/>} />
        <Route path='/expenses' element={<Expenses/>} />
        <Route path='/profit-loss' element={<ProfitLoss/>} />
        <Route path='/vat' element={<VAT/>} />
        <Route path='/create-invoice' element={<CreateInvoice/>} />
        <Route path='/all-invoices' element={<AllInvoices/>} />
        <Route path='/all-lessons' element={<AllLessons/>} />
        <Route path='/all-appointments' element={<ViewAppointments/>} />

        {/* Student routes */}
        <Route path='/student-home' element={<StudentHome/>} />
        <Route path='/student-main' element={<StudentMain/>} />
        <Route path='/book-appointment' element={<BookAppointment/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
      </Route>


      
      {/* Routes for logged out users only */}
      <Route path='/' element={<GuestRoute/>}>
        {/* <Route path='/login-types' element={<LoginTypes/>} /> */}
        {/* <Route path='/admin-login' element={<AdminLogin/>} /> */}
        <Route path='/login' element={<Login/>} />
      </Route>

      <Route path='/home' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/logout' element={<Logout/>} />
      <Route path='/not-allowed' element={<NotAllowed/>} />
      <Route path='*' element={<NotFound/>} />
      {/* Routes for all users redardless of login status */}

    </Routes>
  )
}

export default App
