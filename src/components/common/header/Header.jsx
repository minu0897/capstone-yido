import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import icon from '../../../sample/sejong.png'

const Header = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버 요청 로직 추가
  };

  return (  
    <div className='header'>
        <div>
        <Link to={'/'}>
          <img src={icon} width="40px" height="40px" style={{ marginLeft: '250px'}} />
        </Link>
        </div>
        <div style={{marginLeft:'1%'}}>
          <div style={{color: 'white'}}>
            Yido
          </div>
          <div style={{color: 'white'}}>
            이도
          </div>
        </div>
        <form onSubmit={handleSubmit} className="search-container" style={{ marginLeft: '250px' }}>
          <input type="text" className="inputdeco" />
          <button type="submit" className="search-button">
            <img src="https://cdn-icons-png.flaticon.com/512/71/71403.png" alt="Search" width="20px" height="20px"/>
          </button>
        </form>

        <div style={{color:'white', marginLeft:'300px'}} >
          log in
        </div>
        <div style={{color:'white', marginLeft:'10px'}} >
          | 
        </div>
        <div style={{color:'white', marginLeft: '10px'}}>
          sign up
        </div>
        <div style={{ marginLeft:"100px"}}>
          <img src="https://us.123rf.com/450wm/get4net/get4net1711/get4net171100432/89002328-%EC%A2%85-%EC%95%84%EC%9D%B4%EC%BD%98.jpg" width="20px" height="20px"/>
        </div>
    </div>
  );
};

export default Header;
