import React from "react";
import './ChannelVideoContainer.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import { BeatLoader } from 'react-spinners';


const ChannelVideoContainer = ({ video }) => {
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
        else navigate('/ReportingVideo?id='+video.videoId);
    }
    

    return (
        <div className="video-container" onClick={handleClick} style={{cursor:"pointer"}}>
            {
                video.subtitleCreated ? (
                    <>
                        <img src={imageUrl} alt="thumbnail" height="200px" style={{objectFit: 'cover',maxWidth:"170px"}}/>
                        <span style={{fontSize:"16px",fontWeight:"bold"}}>{''+truncateTitle(video.videoTitle)}</span>
                        <span style={{fontSize:"12px"}}>
                        <div className="cvc-count-div">
                            <span>오역신고 </span>
                            <span style={{color:video.mistranslationSentenceCount ? "red":"",fontWeight:video.mistranslationSentenceCount ? "bold":""}}>
                            문장:{ video.mistranslationSentenceCount ? video.mistranslationSentenceCount:"0"}
                            </span>
                            <span> </span>
                            <span style={{color:video.mistranslationWordCount ? "red":"",fontWeight:video.mistranslationSentenceCount ? "bold":""}}>
                            단어:{video.mistranslationWordCount ? video.mistranslationWordCount:"0"}
                            </span>
                        </div>
                        </span>
                        <span style={{fontSize:"12px"}}>{video.views} views</span>
                    </>
                ):(
                    <>
                        <div style={{display:"flex",minHeight:"170px",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                                <BeatLoader style={{marginBottom:"10px"}}/>
                                <h4 style={{margin:"0px"}}>자막 생성중. . .</h4>
                        </div>
                        <span style={{fontSize:"16px",fontWeight:"bold"}}>{''+truncateTitle(video.videoTitle)}</span>
                    </>
                )
            }
        </div>
    );
};

export default ChannelVideoContainer;
