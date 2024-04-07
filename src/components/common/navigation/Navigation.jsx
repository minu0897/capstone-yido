import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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