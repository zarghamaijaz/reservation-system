import React from 'react'
import { Link } from 'react-router'

const LoginTypes = () => {
  return (
    <div className='flex h-screen w-screen p-4'>
        <div className='small-container'>
            <div className="card">
                <h2 className="card-title">Welcome</h2>
                <p className="card-description">Please select the type of login</p>
                <div className="row">
                    <div className="col-50">
                        <Link to="/login" className="tile">Student login</Link>
                    </div>
                    <div className="col-50">
                        <Link to="/admin-login" className="tile">Admin login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginTypes