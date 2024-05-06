import React, { useState, useEffect,useRef } from 'react';
import ReactPlayer from 'react-player';
import './Player.css'; // CSS 파일을 import

const Player = (props) => {
    //console.log("Player render");

    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const playerRef = useRef(null);

    const handleProgress = ({ playedSeconds }) => {
      // 재생 시간을 초 단위로 부모 컴포넌트에 전달
      props.onTimeUpdate(playedSeconds);
      if (!seeking) {
        setPlayed(played);
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
    
    return (
        <div className="player">
            <ReactPlayer
                url={"http://101.235.73.77:8088/video/video/"+props.videoId+".mp4"}
                onProgress={handleProgress}
                controls={true} 
                progressInterval={100} // 500ms 마다 onProgress 이벤트 발생
                ref={playerRef}
                playing
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
    );
};

export default Player;
