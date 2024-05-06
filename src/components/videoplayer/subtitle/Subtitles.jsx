import React, { useState, useEffect } from 'react';
import './Subtitles.css'; // CSS 파일을 import

const Subtitles = () => {
    return (
        <div className="video-subtitles-container">
            <div className="subtitles">
                {
                // subtitles.map((subtitle, index) => (
                //     <div key={index} className={subtitle.show ? 'subtitle-show' : 'subtitle-hide'}>
                //         <p>{parseInt(subtitle.time/60)}:{String(subtitle.time%60).padStart(2, "0")}  {subtitle.st}</p>
                //         <p>{subtitle.st_eng}</p>
                //     </div>
                // ))
                }
            </div>
        </div>
    );
};

export default Subtitles;
