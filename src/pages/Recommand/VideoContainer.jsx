import React from "react";
import './VideoContainer.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';

const VideoContainer = ({ video }) => {
    const imageUrl = `http://101.235.73.77:8088/video/thumbnail/${video.videoId}.jpg`;
    const { user } = useAuth();
    const navigate = useNavigate();

    // Helper function to truncate the title
    const truncateTitle = (title, maxLength = 20) => {
        if (!title) return 'Untitled'; // text가 null이나 undefined인 경우 빈 문자열을 반환
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    const truncateText = (text, maxLength = 20) => {
        if (!text) return ' '; // text가 null이나 undefined인 경우 빈 문자열을 반환
        if(text ==null) return ' ';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    const handleClick = ()=>{
        if(user ===null){
            navigate('/Login');
            alert("Log in first");
        }
        else navigate('/videoplayer?id='+video.videoId);
    }
    

    return (
        <div className="video-container" onClick={handleClick} style={{cursor:"pointer"}}>
            <img src={imageUrl} alt="thumbnail" height="200px" style={{objectFit: 'cover',maxWidth:"170px"}}/>
            <span style={{fontSize:"16px",fontWeight:"bold"}}>{''+truncateTitle(video.title)}</span>
            {
                //<span>Contents : {truncateText(video.content, 15)}</span>
            }
            {/*<span>Likes: {video.likes}</span>*/}
            <span style={{fontSize:"12px"}}>Team Yido</span>
            <span style={{fontSize:"12px"}}>{video.views} views</span>
        </div>
    );
};

export default VideoContainer;
