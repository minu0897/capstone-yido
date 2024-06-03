
import { useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MyChannel.css'
import ChannelVideoContainer from './ChannelVideoContainer';
import { BeatLoader } from 'react-spinners';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

let intervalId = null;
const MyChannel = () => {
  const [data, setData] = useState(null);
  const [videos, setvideos] = useState(null);
  const [Videostatus, setVideostatus] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    selectdata();
    
  }, []);


  const selectdata = () => {
    axios.get('/api/channel')
      .then(response => {
        setData(response.data);
        if(response.data.channelVideos != videos)
          setvideos(response.data.channelVideos);
        //printCurrentTime();
      })
      .catch(error => {
      }
      );
  };

  function printCurrentTime() {
    const now = new Date();  // 현재 날짜 및 시간을 포함하는 Date 객체 생성
    const hours = now.getHours();  // 현재 시간 (0-23)
    const minutes = now.getMinutes();  // 현재 분 (0-59)
    const s = now.getSeconds();  // 현재 분 (0-59)

    // 시간과 분을 HH:mm 형식으로 포맷팅
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    console.log("현재 시간은 " + formattedTime + "입니다.");
}

  const clickChannelModify = () => {
  }
  const clickupload = () => {
    navigate('/RegisterVideo'); // 클릭 시 / 경로로 이동합니다.
  }

  const clickvideostatus = () => {
    setVideostatus(!Videostatus);
  }
  useEffect(() => {
    //data = data.filter(d => d.err1>0 || d.err2>0);
  }, [Videostatus]);
  
  return (
    <div className='Mychannel-div'>
      {
        data != null &&
        <>
          <div className="mc-div" style={{ margin: "auto", justifyContent: "center" }}>
            <h1>{data.channelName}</h1>
            <div className="mc-div" style={{ justifyContent: "end" }}>
              <button className='mc-button' onClick={clickupload}>
                영상 업로드
              </button>
              {
                /*
                <button className='mc-button' onClick={clickChannelModify}>
                  채널 정보 변경
                </button>
                 */
              }
            </div>
            <div className="mc-div" style={{ borderBottom: "1px solid #C4C4C4" }}>
              <h3>내 채널 영상</h3>
              <button className='mc-button-e' onClick={clickvideostatus}>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ height: "20px", color: "#4C4C4C", paddingRight: "4px", color: "red" }} className='n-icon' />
                번역 및 오류신고 영상 보기
              </button>
            </div>

            <div className='mc-recommendvideoarray'>
              {
                videos != null && videos.map(video => (
                  <ChannelVideoContainer video={video} />
                ))
              }
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default MyChannel;