import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import icon from '../../../sample/sejong.png';
import axios from 'axios'; // Import axios

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an HTTP POST request to the backend
      const response = await axios.post('/api/search', { query: searchTerm });
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

  return (
    <div className='header-back'>
      <div className='header'>
        <div style={{marginTop:'10px'}}>
          <Link to={'/'}>
            <img src={icon} width="40px" height="40px" />
          </Link>
        </div>
        <div width="150px" style={{marginLeft:"13px", marginTop:"5px"}}>
          <div className='header-title' style={{color: 'white', width:"100px"}}>
            Yido
          </div>
          <div className='header-title' style={{color: 'white', width:"100px"}}>
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
          <Link to={'/Login'} style={{textDecoration:'none'}}>
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
