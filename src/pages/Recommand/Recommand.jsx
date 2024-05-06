import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recommand.css';
import VideoContainer from './VideoContainer';

const Recommand = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/video/recommend');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='recommand'>
      {videos.map(video => (
        <div key={video.videoId}>
          <Link to={`/videoplayer?id=${video.videoId}`}>
            Watch {video.title}
          </Link>
          <VideoContainer video={video} />
        </div>
      ))}
    </div>
  );
};

export default Recommand;
