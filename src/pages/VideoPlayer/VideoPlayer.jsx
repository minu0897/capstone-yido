
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoPlayer.css'
import Player from '../../components/videoplayer/player/Player'
import Subtitles from '../../components/videoplayer/subtitle/Subtitles'

const VideoPlayer = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get('id');

  useEffect(() => {
    const url = '/api/video/'+videoId;

    axios.get(url)
      .then(response => {
        console.log("11111111111");
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
      });
  }, []);

  return(
    <div className='videoplayer'>
      <h1>Now Playing Video ID: {videoId}</h1>
      <div style={{height:"500px",display:"flex",flexDirection:"row"}}>
        <div style={{height:"450px",width:"800px"}}>
          <Player videoId={videoId}/>
        </div>
        <div style={{height:"450px",width:"400px"}}>
          <Subtitles videoId={videoId}/>
        </div>
      </div>
    </div>
  );
  
}

export default VideoPlayer;