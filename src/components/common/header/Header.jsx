import React from 'react';
import { Link } from 'react-router-dom';
import '../header/Header.css'

const Header = () => {

  return (
    <div className='header'>
      <Link to={'/'}>홈</Link>
    </div>
  );
};

export default Header;