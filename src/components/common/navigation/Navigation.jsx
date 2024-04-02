import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = () => {

  return (
    <div className='navigation'>
      <Link to={'/'}>Home</Link>
      <Link to={'/Community'}>Community</Link>
      <Link to={'/Note'}>Note</Link>
      <Link to={'/Recommand'}>Recommand</Link>
    </div>
  );
};

export default Navigation;