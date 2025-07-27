import { useState } from 'react'
import { Link } from 'react-router';

const INTITIAL_FORMDATA = {
  name:'',
  email: '',
  phone: '',
  password: '',
  repeatPassword: '',
}

const Signup = () => {
  const [formData, setFormData] = useState(INTITIAL_FORMDATA);

  async function handleSubmit(e){
    e.preventDefault();
    console.log('==== Call API here ====')
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
            <h2 className='card-title'>Reservation System</h2>
            <p className='card-description'>Welcome, please create your account.</p>
            <div className='input-container'>
              <label htmlFor='name' className='label'>Name</label>
              <input id='name' className='input' type='text' value={formData.name} onChange={handleChange('name')} placeholder='Enter your name' />
            </div>
            <div className='input-container'>
              <label htmlFor='email' className='label'>Email</label>
              <input id='email' className='input' type='email' value={formData.email} onChange={handleChange('email')} placeholder='Enter your email' />
            </div>
            <div className='input-container'>
              <label htmlFor='phone' className='label'>Phone</label>
              <input id='phone' className='input' type='text' value={formData.phone} onChange={handleChange('phone')} placeholder='Enter your phone' />
            </div>
            <div className='input-container'>
              <label htmlFor='password' className='label'>Password</label>
              <input id='password' className='input' type='password' value={formData.password} onChange={handleChange('password')} placeholder='Enter your password' />
            </div>
            <div className='input-container'>
              <label htmlFor='repeatPassword' className='label'>Repeat Password</label>
              <input id='repeatPassword' className='input' type='password' value={formData.repeatPassword} onChange={handleChange('repeatPassword')} placeholder='Enter your password again' />
            </div>
            <div className='input-container'>
              <button disabled={
                formData.name === '' ||
                formData.email === '' ||
                formData.phone === '' ||
                formData.password === '' ||
                formData.repeatPassword === ''
                } className='button button-primary'>Signup</button>
            </div>
            <div className='text-center'>
              <Link to='/login' className='link link-primary'>Already have an account? Login here.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup