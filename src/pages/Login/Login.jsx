import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      userId,
      password,
    };

    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Login Success:', data);
      // Redirect to dashboard or handle login success scenario
    } catch (error) {
      console.error('Login Error:', error);
      // Handle login error scenario
    }
  };

  return (
    <div className='Login-login'>
      <form onSubmit={handleSubmit} className="Login-login-form">
        <h2 className="Login-h2">Login</h2>
        <div className="Login-form-group">
          <label htmlFor="userId" className="Login-label">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            required
            className='Login-input'
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
        </div>
        <div className="Login-form-group">
          <label htmlFor="password" className="Login-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className='Login-input'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="Login-login-button">Log In</button>
      </form>
    </div>
  );
};

export default Login;
