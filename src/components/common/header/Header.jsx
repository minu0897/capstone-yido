import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import icon from '../../../sample/sejong.png'
import { useState } from 'react';

const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('url 입력', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: searchTerm })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Server response:', data);
      // 서버 응답 처리 로직 추가
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (  
    <div className='header-back'>
      <div className='header'>
        <div style={{marginTop:'10px'}}>
        <Link to={'/'}>
          <img src={icon} width="40px" height="40px" />
        </Link>
        </div>
        <div width="150px" style={{marginLeft:"13px", marginTop:"5px"}}>
          <div style={{color: 'white',width:"100px"}}>
            Yido
          </div>
          <div style={{color: 'white',width:"100px"}}>
            이도
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="search-container" style={{marginLeft: '250px', marginTop: '10px'}}>
          <input type="text" className="inputdeco" value={searchTerm} onChange={handleInputChange} />
          <button type="submit" className="search-button">
            <img src="https://cdn-icons-png.flaticon.com/512/71/71403.png" alt="Search" width="20px" height="20px"/>
          </button>
        </form>

        <div style={{color:'white', marginLeft: '280px',width:"50px",marginTop:'5px'}}>
          <Link to={'/Login'}  style={{textDecoration:'none'}}>
            <a className="login-a">Sign In</a>
          </Link>
        </div>
        
        <div style={{color:'white', marginLeft: '10px',width:"70px",marginTop:'5px'}}>
          <Link to={'/Signup'} style={{textDecoration:'none'}}>
            <a className="login-a">Sign Up</a>
          </Link>
        </div>

        <div style={{ marginRight:"0px", marginTop:'13px'}}>
        <Link to={'/RegisterVideo'} style={{}}>
          <img src="https://us.123rf.com/450wm/get4net/get4net1711/get4net171100432/89002328-%EC%A2%85-%EC%95%84%EC%9D%B4%EC%BD%98.jpg" width="20px" height="20px"/>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
