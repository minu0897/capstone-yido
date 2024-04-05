import React,{useState} from 'react';
import Slider from 'react-slick';
import './ImageSlider.css'
import img1 from '../../../sample/1.webp'
import img2 from '../../../sample/2.webp'
import img3 from '../../../sample/3.webp'
import img4 from '../../../sample/4.webp'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    [img1,'#FFDFF6'],
    [img2,'#FFD9EC'],
    [img3,'#ECFFFF'],
    [img4,'#DEC9FF']
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div >
      <Slider {...settings}  dotsClass="test-css">
        {images.map((arr, index) => (
          <div key={index}>
            <div className='slider-div' style={{ backgroundColor: arr[1] }} >
              <div className='slider-title'>
                <span className='span-title'>
                  <p className='p-title'>Today’s  recommand  content</p>
                  <p>chaewon vlog #6 Fearnot!<br/> Co..Come to see my vlog!</p>
                  <br/><br/><br/><br/><br/><br/>
                </span>
              </div>
              <div className='slider-img'>
                <img className='slider-img' src={arr[0]} alt={`Slide ${index}`} style={{ width: '580px', height: '280px', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;