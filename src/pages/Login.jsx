import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import { getJwtData } from '../../utils/jwtData.utils';
import Swal from 'sweetalert2';
import { loginAPI } from '../service/api'
import Input from '../components/form-elements/Input';
import FullPageLoader from '../components/FullPageLoader';

const INTITIAL_FORMDATA = {
  username: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  async function handleSubmit(e){
    e.preventDefault();
    try{
      console.log("sending request")
      setIsLoading(true);
      const response = await loginAPI(formData);
      setIsLoading(false);
      console.log("Login response => ", response);
      if(response.success){
        localStorage.setItem('auth', response.data);
        navigate('/');
      }
      else{
        return alert("Invalid credentials!");
      }
    }catch(err){
      console.error(err);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message,
      });
    }
  }

  function handleChange(name){
    return function(e){
      return setFormData(prev => ({...prev, [name]: e.target.value}));
    }
  }
  return (
    <>
    {isLoading && (
      <FullPageLoader />
    )}
    <div className='flex h-screen w-screen p-4'>
      <div className='small-container'>
        <div className='card'>
          <form onSubmit={handleSubmit}>
            <h2 className='card-title'>Login to SSDS</h2>
            <p className='card-description'>Welcome, please log in with your account.</p>
            <Input
              type='text'
              placeholder='Enter your username or phone number'
              label='Username / Phone number' 
              id='username'
              value={formData.username}
              onChange={handleChange('username')}
            />
            <Input
              type='password'
              placeholder='Enter your password'
              label='password' 
              id='password'
              value={formData.password}
              onChange={handleChange('password')}
            />
            <div className='input-container'>
              <button disabled={formData.email === '' || formData.password === ''} className='button button-primary'>Login</button>
            </div>
            <div className='text-center'>
              <div>Or</div>
              <Link to='/booking-dates' className='link link-primary'>Click here to book your very first session.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login