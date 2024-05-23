import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import icon from '../../../sample/sejong.png';
import axios from 'axios'; // Import axios
import { useAuth } from '../../../pages/Login/AuthContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // useAuth 훅에서 로그아웃 함수 사용
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an HTTP GET request to the backend
      const response = await axios.get('/api/search?query=' + searchTerm);
      // Navigate to a new page with the response if needed, or handle response data here
      console.log('Search response:', response.data);
      navigate(`/search-results`); // You might want to navigate based on the response or handle differently
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      logout(); // 로컬 상태 로그아웃 처리
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('Logout error:', error);
      logout(); // 에러가 발생하더라도 로컬 상태 로그아웃 처리
      navigate('/'); // 홈으로 이동
    }
  };
  
  const handleClick = () => {
    navigate('/'); // 클릭 시 / 경로로 이동합니다.
  };
  
  const handleMyClick = () => {
    navigate('/MyPage'); // 클릭 시 / 경로로 이동합니다.
  };

  const handleLogin = () => {
    navigate('/Login'); // 클릭 시 / 경로로 이동합니다.
  };
  
  return (
    <div className='header-back'>
      <div className='header'>
        {/*
          <div style={{marginTop:'10px'}}>
              <Link to={'/'}>
                <img src={icon} width="40px" height="40px" />
              </Link>
          </div>
        */}
        <div style={{minWidth:"400px"}}>
          <div  onClick={handleClick}  className='header-title' style={{color: 'white', minWidth:"130px",maxWidth:"130px"}}>
            <span style={{fontSize:"50px"}} className='H-non-draggable'>
              Yido
            </span>
            <span style={{fontSize:"10px"}} className='H-non-draggable'>
              이도
            </span>
          </div>
        </div>

        {/* search form 추후 구현 */}
        <div style={{minWidth:"400px"}}>
        {/*
          <form onSubmit={handleSubmit} className="search-container" style={{marginLeft: '250px', marginTop: '10px'}}>
            <input type="text" className="inputdeco" value={searchTerm} onChange={handleInputChange} />
            <button type="submit" className="search-button">
              <img src="https://cdn-icons-png.flaticon.com/512/71/71403.png" alt="Search" width="20px" height="20px"/>
            </button>
          </form>
        */}
        </div>

        {/* signin signout mypageicon */}
          {
            user ? 
            (
              <div className='H-logineddiv'>
                <div></div>
                <div></div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                  {/* 로그인한 사용자의 이름 표시 */}
                  <span className='H-logined-myname' style={{width:"AuthContext",textAlign:"right",marginRight:"20px"}}  onClick={handleMyClick} >
                    {"Harry Kane"}
                  </span> 
                  <span className='H-logined-myname' style={{width:"AuthContext",textAlign:"right"}}  onClick={handleLogout} >
                    Logout
                  </span> 
                  {//<button onClick={handleLogout} style={{color:'white', width:"70px",marginTop:'5px', textDecoration:'none'}}>Logout</button>
                  }
                </div>
              </div>
            ) : 
            (
              <div className='H-logindiv'>
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                  <span className='H-login-myname' style={{width:"AuthContext",textAlign:"right"}}  onClick={handleLogin} >
                    Login
                  </span> 
                </div>
              </div>
            )
          }
        

        {/*
        false&&
          <div style={{ marginLeft:"30px", marginTop:'13px'}}>
            <Link to={'/RegisterVideo'} style={{}}>
              <img src="https://us.123rf.com/450wm/get4net/get4net1711/get4net171100432/89002328-%EC%A2%85-%EC%95%84%EC%9D%B4%EC%BD%98.jpg" width="20px" height="20px"/>
            </Link>
          </div>
        */}
      </div>
    </div>
  );
};

export default Header;
