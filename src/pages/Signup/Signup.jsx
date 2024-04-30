import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'

const Signup = () => {

  return (
    <div className='signup'>
      <span className='span-blod'>Create account</span>
      
      <span>Your name</span>
      <div className="form-group">
        <input
          type="text"
          id="username"
          name="username"
          required
        />
      </div>
      <span>Your ID</span>
      <span>Mobile number</span>
      <span>Email</span>
      <span>Password</span>
      <span>Re-enter password</span>


    </div>
  );
};

export default Signup;