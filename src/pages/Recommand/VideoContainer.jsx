import React from "react";
import './VideoContainer.css';

const VideoContainer = ({ video }) => {  // Accepting video object as a prop
    return (
        <div className="video-container">
            <h3>{video.title}</h3>
            <p>{video.content}</p>
            <p>Likes: {video.likes}</p>
            <p>Views: {video.views}</p>
        </div>
    );
};

export default VideoContainer;
