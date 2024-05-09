import React from "react";
import './VideoContainer.css';

const VideoContainer = ({ video }) => {
    const imageUrl = `http://101.235.73.77:8088/video/thumbnail/${video.videoId}.jpg`;

    // Helper function to truncate the title
    const truncateTitle = (title, maxLength = 20) => {
        if (!title) return ''; // text가 null이나 undefined인 경우 빈 문자열을 반환
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    const truncateText = (text, maxLength = 20) => {
        if (!text) return ''; // text가 null이나 undefined인 경우 빈 문자열을 반환
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    

    return (
        <div className="video-container">
            <img src={imageUrl} alt="thumbnail" height="200px"/>
            <h3>{truncateTitle(video.title)}</h3>
            <span>Contents : {truncateText(video.content, 15)}</span>
            {/*<span>Likes: {video.likes}</span>*/}
            <span>{video.views} Views</span>
        </div>
    );
};

export default VideoContainer;
