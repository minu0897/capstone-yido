import React from 'react';
import './Footer.css'
import icon from '../../../sample/sejong.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div style={{marginTop:'20px'}}>
          <img src={icon} width="40px" height="40px"/>
      </div>
    </div>
  );
};

export default Footer;