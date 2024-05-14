import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: username,
      userId,
      mobileNumber,
      email,
      password,
      rePassword,
    };

    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='su-signup'>
      <form onSubmit={handleSubmit}>
        <span className='su-span-bold'>Create account</span>

        <label className='su-span' htmlFor="username">Your name</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className='su-input'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label className='su-span' htmlFor="userId">Your ID</label>
        <input
          type="text"
          id="userId"
          name="userId"
          required
          className='su-input'
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />

        <label className='su-span' htmlFor="mobileNumber">Mobile number</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          required
          className='su-input'
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
        />

        <label className='su-span' htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className='su-input'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className='su-span' htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className='su-input'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label className='su-span' htmlFor="rePassword">Re-enter password</label>
        <input
          type="password"
          id="rePassword"
          name="rePassword"
          required
          className='su-input'
          value={rePassword}
          onChange={e => setRePassword(e.target.value)}
        />

        <button className='su-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
