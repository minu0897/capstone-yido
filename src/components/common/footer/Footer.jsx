import React from 'react';
import './Footer.css'
import icon from '../../../sample/sejong.png'

const Footer = () => {
  return (
    <div className='footer-back'>
      <div className='footer'>
        <div style={{marginTop:'0px', width:"100px"}}>
            <img src={icon} width="40px" height="40px"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;