import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recommend.css';
import VideoContainer from './VideoContainer.jsx';

const Recommend = () => {
  const [videos, setVideos] = useState([]);
  const [tags, setTags] = useState([null]);
  const [activeIndex, setActiveIndex] = useState(-1); // 초기에는 아무 버튼도 선택되지 않음

  const videolink = {
    textDecoration: 'none',
    color: 'black',
    width: '322px', // Width of each link to fit 4 items per row (taking into account the gap)
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/video/mostTag');
        const data = await response.json();
        
        if (Array.isArray(data.top5Tags)) { // data가 배열인지 확인
          setTags(data.top5Tags);
        } else {
          console.error('Videos data is not an array:', data);
          setTags([]); // 안전하게 비어 있는 배열 설정
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideos([]); // 오류 발생 시 비어 있는 배열 설정
      }
    };
  
    fetchTags();
  }, []);

  useEffect(() => {
    fetchVideos(null);
  }, [tags]);
  
  const fetchVideos = async (tag) => {
    if (tag == null) tag = 'all';
    try {
      const url = "/api/video/recommend?tag="+tag.replace(/#/g, '');
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) { // data가 배열인지 확인
        setVideos(data);
      } else {
        console.error('Videos data is not an array:', data);
        setVideos([]); // 안전하게 비어 있는 배열 설정
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      setVideos([]); // 오류 발생 시 비어 있는 배열 설정
    }
  };
  
  const handleButtonClick = (index,tag) => {
    setActiveIndex(index); // 선택된 버튼의 인덱스 저장
    fetchVideos(tag);
  };

  return (
    <div style={{marginTop: '20px'}}>
      {
      tags!==null &&
        <div className='R-tags-container'>
          <button className={activeIndex === -1 ? 'R-tags-button-click' : 'R-tags-button'} onClick={() => handleButtonClick(-1,null)}>All</button>
          {
            tags.map((tag, index) => (
              <button className={index  === activeIndex  ? 'R-tags-button-click' : 'R-tags-button'} onClick={() => handleButtonClick(index,tag)} key={index}>{tag}</button> // 리스트 아이템 동적으로 렌더링
            ))
          }
        </div>
      }
      <div className='recommendvideoarray'>
        {videos.map(video => (
            <VideoContainer video={video} />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
