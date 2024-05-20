import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [role, setRole] = useState('USER'); // Default role

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== rePassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      name: username,
      memberId,
      email,
      password,
      role, // Include the role in the user data
    };

    try {
      const response = await fetch('api/members', { 
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

        <label className='su-span' htmlFor="memberId">Your ID</label>
        <input
          type="text"
          id="memberId"
          name="memberId"
          required
          className='su-input'
          value={memberId}
          onChange={e => setMemberId(e.target.value)}
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

<label className='su-span' htmlFor="role">Role:</label>
        <div className="su-radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="USER"
              checked={role === 'USER'}
              onChange={() => setRole('USER')}
            /> User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="PRODUCER"
              checked={role === 'PRODUCER'}
              onChange={() => setRole('PRODUCER')}
            /> Producer
          </label>
        </div>
        
        <button className='su-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
