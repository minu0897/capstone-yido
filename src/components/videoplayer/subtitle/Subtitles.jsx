import React, { useState, useEffect } from 'react';
import './Subtitles.css'; // CSS 파일을 import

const Subtitles = ({videoId, videoInfo, currentTime}) => {
    const [subtitles, setSubtitles] = useState(videoInfo.subtitleSentences);
    
    useEffect(() => {
        const updatedSubtitles = subtitles.map(subtitle => {
            return {
                ...subtitle,
                show: subtitle.startTime <= currentTime
            };
        });
        setSubtitles(updatedSubtitles);
    }, [currentTime, subtitles]);

    return (
        <div className="video-subtitles-container">
            <div className="subtitles">
                {
                    subtitles.map((subtitle, index) => (
                        <div key={index} className={subtitle.show ? 'subtitle-show' : 'subtitle-hide'}>
                            {/*<p>{parseInt(subtitle.startTime60)}:{String(subtitle.time%60).padStart(2, "0")}  {subtitle.st}</p>*/}
                            <p>{subtitle.korText}</p>
                            <p>{subtitle.engText}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Subtitles;
