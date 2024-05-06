
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect,useRef } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './VideoPlayer.css'
import Player from '../../components/videoplayer/player/Player'
import Subtitles from '../../components/videoplayer/subtitle/Subtitles'

const VideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [data, setData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get('id');
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);
  const [subtitles, setSubtitles] = useState(null);
  const subtitlesRef = useRef(null); // 스크롤을 위한 ref 생성
  const [playing, setPlaying] = useState(false); // 재생 상태를 제어할 상태 변수

  useEffect(() => {
    const url = '/api/video/'+videoId;

    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
      });

      const timer = setTimeout(() => {
        setPlaying(true); // 1초 후 재생 상태를 true로 설정
      }, 1000);
  
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  },[]);
  
  useEffect(() => {
    if(data !=null){
      setSubtitles(data.subtitleSentences);
      console.log(data);
      //setPlaying(true); // 1초 후 재생 상태를 true로 설정
    }
  }, [data]);

  useEffect(() => {
    if(subtitles!= null){
      const updatedSubtitles = subtitles.map(subtitle => {
          return {
              ...subtitle,
              show: subtitle.startTime <= currentTime
          };
      });
      setSubtitles(updatedSubtitles);
      
      if (subtitlesRef.current) {
        const element = subtitlesRef.current;
        // 자막 컨테이너의 스크롤 높이만큼 스크롤 위치 설정
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [currentTime]);

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
    if (!seeking) {
      setPlayed(progress.played);
    }
  };

  const handleSeekMouseDown = e => {
      setSeeking(true);
  };

  const handleSeekChange = e => {
      setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = e => {
      setSeeking(false);
      // playerRef.current가 존재할 때만 seekTo를 호출
      if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(e.target.value));
      }
  };

  return(
    <div className='videoplayer'>
      <h1>{ data!=null && data.title}</h1>
      <div style={{height:"500px",display:"flex",flexDirection:"row"}}>
        <div style={{height:"450px",width:"800px",paddingRight:"15px"}}>
          <div className="player">
              <ReactPlayer
                  url={"http://101.235.73.77:8088/video/video/"+videoId+".mp4"}
                  onProgress={handleProgress}
                  controls={true} 
                  progressInterval={100} // 500ms 마다 onProgress 이벤트 발생
                  ref={playerRef}
                  playing={playing}   
                  width="100%"
                  height="100%"
              />
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                style={{ width: '100%' }}
              />
              <progress max={1} value={played} style={{ width: '100%' }}></progress>
          </div>
        </div>
        <div style={{height:"450px",width:"370px",paddingLeft:"15px"}}>
          <div className="video-subtitles-container">
              <div className="subtitles" ref={subtitlesRef}>
                  {
                    subtitles != null &&
                      subtitles.map((subtitle, index) => (
                          <div key={index} className={subtitle.show ? 'subtitle-show' : 'subtitle-hide'}>
                              <p className='pt'>{parseInt(subtitle.startTime/60)}:{String(parseInt(subtitle.startTime)%60).padStart(2, "0")}{/* .{String(subtitle.startTime).split('.', 1)}  */}</p>
                              <p className='pk'>{subtitle.korText}</p>
                              <p className='pe'>{subtitle.engText}</p>
                              <br/>
                          </div>
                      ))
                  }
              </div>
          </div>
        </div>
      </div>
      {
      data!=null && <div style={{backgroundColor:"#EFEFEF", borderRadius:"5px",paddingLeft:"20px"}}>
        <h4>
          {' '}{parseInt(data.views).toLocaleString()}{' views\u00A0\u00A0\u00A0\u00A0\u00A0'}
          {data.uploadDate.slice(0, 4)}{'.'}
          {data.uploadDate.slice(5, 7)}{'.'}
          {data.uploadDate.slice(8, 10)}{'.'}
        </h4>
        <h3>{data.content}</h3>
      </div>
      }
    </div>
  );
}

export default VideoPlayer;