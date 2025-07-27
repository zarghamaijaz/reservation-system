import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import { getJwtData } from '../../utils/jwtData.utils';

import { loginAPI } from '../service/api'

const INTITIAL_FORMDATA = {
  username: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  async function handleSubmit(e){
    e.preventDefault();
    const response = await loginAPI(formData);
    localStorage.setItem('auth', JSON.stringify(response.data));
    console.log(response)
    const jwtData = getJwtData();
    console.log(jwtData);
    navigate('/')
  }

  function handleChange(name){
    return function(e){
      return setFormData(prev => ({...prev, [name]: e.target.value}));
    }
  }
  return (
    <div className='flex h-screen w-screen p-4'>
      <div className='small-container'>
        <div className='card'>
          <form onSubmit={handleSubmit}>
            <h2 className='card-title'>SSDS</h2>
            <p className='card-description'>Welcome, please log in with your account.</p>
            <div className='input-container'>
              <label htmlFor='username' className='label'>Username</label>
              <input id='username' className='input' type='text' value={formData.username} onChange={handleChange('username')} placeholder='Enter your username' />
            </div>
            <div className='input-container'>
              <label htmlFor='password' className='label'>Password</label>
              <input id='password' className='input' type='password' value={formData.password} onChange={handleChange('password')} placeholder='Enter your password' />
            </div>
            <div className='input-container'>
              <button disabled={formData.email === '' || formData.password === ''} className='button button-primary'>Login</button>
            </div>
            <div className='text-center'>
              <Link to='/signup' className='link link-primary'>Visiting for the first time? Signup here.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login