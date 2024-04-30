import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

const Navigation = () => {

  return (
    <div className='navigation'>
      <Link to={'/'} style={{marginLeft:'300px'}}>Home</Link>
      <Link to={'/Recommand'} style={{marginLeft:'200px'}}>Recommand</Link>
      <Link to={'/Note'} style={{marginLeft:'200px'}}>Note</Link>
      <Link to={'/Community'} style={{marginLeft:'200px'}}>Community</Link>
    </div>
  );
};

export default Navigation;