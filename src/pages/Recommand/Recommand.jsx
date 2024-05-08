import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recommand.css';
import VideoContainer from './VideoContainer.jsx';
import videoData from './videoarray.json';

const Recommand = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoData);
  }, []);

  const recommandvideoarray={
    display: 'flex',
    justifyContent: 'center', // 중앙 정렬을 위해 추가
    flexWrap: 'wrap', // 여러 줄로 나열되도록 처리
    gap: '20px', // 각 아이템 간의 간격
  };

  const videolink={
    textDecoration: 'none',
    color: 'black',
    width: '322px',
  }

  return (
    <div style={{marginTop:'20px'}}>
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
