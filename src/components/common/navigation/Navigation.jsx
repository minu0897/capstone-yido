import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

const Navigation = () => {

  return (
    <div className='navigation'>
      <Link to={'/'} style={{}}>Home</Link>
      <Link to={'/Recommand'} style={{}}>Recommand</Link>
      <Link to={'/Note'} style={{}}>Note</Link>
      <Link to={'/Community'} style={{}}>Community</Link>
    </div>
  );
};

export default Navigation;