import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {

  return (
    <div className='home'>
      <div className='box' style={{height: '40px'}}>
        슬라이드
      </div> 
      <div className='box' style={{height: '450px'}}>
        단어장
      </div>
    </div>
  );
};

export default Home;