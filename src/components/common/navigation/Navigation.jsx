import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Navigation = () => {

  return (
      <Container>
        <Row>
          <Col>
            <Link to={'/'}>Home</Link>
          </Col>
          <Col>
            <Link to={'/Community'}>Community</Link>
          </Col>
          <Col>
            <Link to={'/Note'}>Note</Link>
          </Col>
          <Col>
            <Link to={'/Recommand'}>Recommand</Link>
          </Col>
        </Row>
      </Container>

      
  );
};

export default Navigation;