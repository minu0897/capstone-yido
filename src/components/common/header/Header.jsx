import React from 'react';
import { Link } from 'react-router-dom';
import '../header/Header.css'

const Header = () => {

  
  return (
    <div className='header'>
      <Link to={'/'}>logo</Link>
    </div>
  );
};

export default Header;
