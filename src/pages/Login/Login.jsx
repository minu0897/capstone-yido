import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { loginId, password };

    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        const userData = await response.json();
        login(userData);
        navigate('/'); // Redirect to homepage on success
      } else {
        console.error('Login failed, status:', response.status);
        setErrorMessage('Invalid username or password.');
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
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
            onChange={e => setLoginId(e.target.value)}
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
          {errorMessage && <p className="Login-error">{errorMessage}</p>} {/* Error message display */}
        </div>
        <button type="submit" className="Login-login-button">Log In</button>
        <button type="button" className="Login-signup-button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
