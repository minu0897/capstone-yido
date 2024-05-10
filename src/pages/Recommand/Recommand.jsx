import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recommand.css';
import VideoContainer from './VideoContainer.jsx';

const Recommand = () => {
  const [videos, setVideos] = useState([]);

  const recommandvideoarray = {
    display: 'flex',
    justifyContent: 'center', // Keeps items centered
    flexWrap: 'wrap', // Allows multiple lines
    gap: '20px', // Space between items
    margin: '0 auto', // Centers the container
    maxWidth: '1368px', // Adjust based on the sum of all items' widths in a row
  };

  const videolink = {
    textDecoration: 'none',
    color: 'black',
    width: '322px', // Width of each link to fit 4 items per row (taking into account the gap)
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/video/recommend');
        const data = await response.json();
        console.log(data); // 데이터 구조 확인
        if (data && Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.error('Videos data is not an array:', data);
          setVideos([]); // 안전하게 비어 있는 배열 설정
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideos([]); // 오류 발생 시 비어 있는 배열 설정
      }
    };
  
    fetchVideos();
  }, []);
  
  
  return (
    <div style={{marginTop: '20px'}}>
      <div style={recommandvideoarray}>
        {videos.map(video => (
          <Link to={`/videoplayer?id=${video.videoId}`} key={video.videoId} style={videolink}>
            <VideoContainer video={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommand;
