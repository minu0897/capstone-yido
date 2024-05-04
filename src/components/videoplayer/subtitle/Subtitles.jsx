import React, { useState, useEffect } from 'react';
import './Subtitles.css'; // CSS 파일을 import

const Subtitles = () => {
    return (
        <div className="video-subtitles-container">
            {/* <ReactPlayer
                url={require("./data/video_grip.mp4")}
                onProgress={handleProgress}
                controls
                progressInterval={500} // 500ms 마다 onProgress 이벤트 발생
            />
            <div className="subtitles">
                {subtitles.map((subtitle, index) => (
                    <div key={index} className={subtitle.show ? 'subtitle-show' : 'subtitle-hide'}>
                        <p>{parseInt(subtitle.time/60)}:{String(subtitle.time%60).padStart(2, "0")}  {subtitle.st}</p>
                        <p>{subtitle.st_eng}</p>
                    </div>
                ))}
            </div> */}
            <h1>456</h1>
        </div>
    );
};

export default Subtitles;
