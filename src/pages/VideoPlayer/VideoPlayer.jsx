
import { useLocation } from 'react-router-dom';
import './VideoPlayer.css'
import Player from '../../components/videoplayer/player/Player'
import Subtitles from '../../components/videoplayer/subtitle/Subtitles'

const VideoPlayer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get('id');

  return(
    <div className='videoplayer'>
      <h1>Now Playing Video ID: {videoId}</h1>
      <div style={{height:"500px",display:"flex",flexDirection:"row"}}>
        <div style={{height:"450px",width:"800px"}}>
          <Player/>
        </div>
        <div style={{height:"450px",width:"400px"}}>
          <Subtitles/>
        </div>
      </div>
    </div>
  );
  
}

export default VideoPlayer;