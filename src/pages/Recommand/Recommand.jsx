import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recommand.css';
import VideoContainer from './VideoContainer';
import videoData from './videoarray.json';

const Recommand = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoData);
  }, []);

  return (
    <div className='recommand'>
      {videos.map(video => (
        <Link to={`/videoplayer?id=${video.videoId}`} className="video-link" key={video.videoId}>
          <VideoContainer video={video} />
        </Link>
      ))}
    </div>
  );
};

export default Recommand;
