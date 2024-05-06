import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './Player.css'; // CSS 파일을 import

const Player = (props) => {
    return (
        <div className="player">
            <ReactPlayer
                url={"http://101.235.73.77:8088/video/video/"+props.videoId+".mp4"}
                //onProgress={handleProgress}
                controls={false} 
                progressInterval={500} // 500ms 마다 onProgress 이벤트 발생
            />
        </div>
    );
};

export default Player;
