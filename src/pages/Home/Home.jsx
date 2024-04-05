import React from 'react';
import './Home.css'
import ImageSlider from '../../components/home/slider/ImageSlider'

const Home = () => {

  return (
    <div className='home'>
      <div className='box' style={{height: '440px'}}>
        <ImageSlider/>
      </div> 
    </div>
  );
};

export default Home;