import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Create navigate instance
  const { login } = useAuth();  // Context에서 login 함수 사용

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
  
      if (response.status === 200) { // 상태 코드 200 확인
        const userData = await response.json();
        login(userData);  // 사용자 데이터를 AuthContext에 저장
        console.log('로그인 성공');
        navigate('/'); // 로그인 성공 시 홈페이지로 리디렉션
      } else {
        console.error('로그인 실패, 상태 코드:', response.status);
        setErrorMessage('Invalid username or password.'); // Set error message on failed login
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
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
      </form>
    </div>
  );
};

export default Login;
