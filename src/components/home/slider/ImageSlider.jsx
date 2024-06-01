import React,{useState,useEffect} from 'react';
import Slider from 'react-slick';
import './ImageSlider.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImageSlider = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    if(props.videos != null)
      setData(props.videos.slice(0, 6));
  }, [props]);
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  const images = [
    ['#FFDFF6'],
    ['#FFD9EC'],
    ['#ECFFFF'],
    ['#DEC9FF']
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
    <div style={{ padding: "0px 10px 30px 10px", alignItems: "center", overflowX: "hidden", overflowY: "hidden" }}>
      <Slider {...settings}  dotsClass="dots-css">
        { data != null  && data.map((arr, index) => (
          <div key={index}>
            <div className='slider-div' style={{ backgroundColor: images[index%4] }} >
              <div className='slider-title'>
                <span className='span-title'>
                  <p className='p-title'>Today’s  Recommend  content</p>
                  <p>{arr.title}</p>
                  <br/><br/><br/><br/><br/><br/>
                </span>
              </div>
              <div className='slider-img'>
                <img className='slider-img' src={`http://101.235.73.77:8088/video/thumbnail/${arr.videoId}.jpg`} alt={`Slide ${index}`} style={{ width: '580px', height: '280px', objectFit: 'fill' }} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;