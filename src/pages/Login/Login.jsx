import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [loginId, setloginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      loginId,
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
          <label htmlFor="loginId" className="Login-label">User ID</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            required
            className='Login-input'
            value={loginId}
            onChange={e => setloginId(e.target.value)}
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
