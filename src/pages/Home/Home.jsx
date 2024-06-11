import React, { useState, useEffect } from 'react';
import './Home.css'
import ImageSlider from '../../components/home/slider/ImageSlider'
import VideoContainer from '../Recommend/VideoContainer';
import Card from '../Community/Card';

const Home = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchVideos(null);
  }, []);

  const fetchVideos = async () => {
    try {
      const url = "/api/video/recommend?tag=all";
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) { // data가 배열인지 확인
        console.log(data);
        setVideos(data);
      } else {
        console.error('Videos data is not an array:', data);
        setVideos([]); // 안전하게 비어 있는 배열 설정
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      setVideos([]); // 오류 발생 시 비어 있는 배열 설정
    }
  };

  return (
    <div className='home'>
      <div className='h-box' style={{ height: '440px' }}>
        <ImageSlider videos={videos}/>
      </div>
      <div className='h-box' style={{ height: '50px', alignItems: "center", placeItems: "center", display: "grid"}}>
        <div style={{ height: "50px", width: '1000px', minWidth: '1000px',display:"flex",flexWrap:"wrap",borderBottom:"1px solid black"}}>
          <h2>New Trend</h2>
        </div>
      </div>
      <div className='h-box' style={{ height: '300px', alignItems: "center", placeItems: "center", display: "grid" ,marginTop:"25px"}}>
        <div style={{ height: "300px", width: '1000px', minWidth: '1000px',display:"flex",flexWrap:"wrap"}}>
          <div className='h-carddiv'style={{}}>
            <h3 style={{marginTop:"3px",marginLeft:"5px",marginBottom:"0px"}}>New Post</h3>
                <Card
                  {...(1 ? { videoId: 3 } : {})}
                  title={"1"}
                  content={"1"}
                  likes={99}
                  tags={["1","2"]}
                  writer={"admin"}
                />
          </div>
          <div className='h-carddiv'style={{}}>
            <h3 style={{marginTop:"3px",marginLeft:"5px",marginBottom:"0px"}}>New Video</h3>
            {videos !== null && <VideoContainer video={videos[1]} />}
          </div>
          <div className='h-carddiv'>
            <h3 style={{marginTop:"3px",marginLeft:"5px",marginBottom:"0px",textDecoration:"underline"}}>word of the day</h3>
            <div className='h-card-note'>
              <p style={{marginLeft:"5px",fontSize:"1.3rem",fontWeight:"bold",marginTop:"3px",marginBottom:"6px"}}>사방에서</p>
              <p style={{fontSize:"1.2rem",marginLeft:"15px",fontWeight:"bold",marginTop:"10px",marginBottom:"6px",color: "white"}}>from all directions</p>
            </div>
            <h3 style={{marginTop:"3px",marginLeft:"5px",marginBottom:"0px",textDecoration:"underline"}}>sentence of the day</h3>
            <div className='h-card-note'>
              <p style={{marginLeft:"5px",fontSize:"1.3rem",fontWeight:"bold",marginTop:"3px",marginBottom:"6px"}}>내 길었던 하루</p>
              <p style={{fontSize:"1.2rem",marginLeft:"15px",fontWeight:"bold",marginTop:"10px",marginBottom:"6px",color: "white"}}>My long day</p>
            </div>
            <div className='h-carddiv'>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;