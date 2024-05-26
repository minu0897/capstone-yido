import React from 'react';
import './Card.css'; // Card 컴포넌트 전용 스타일시트

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const Card = ({ videoId, title, content, likes, tags }) => {
  // 태그 배열을 하나의 문자열로 결합
  const tagsString = tags.map(tag => `#${tag}`).join(' ');
  const imageUrl = `http://101.235.73.77:8088/video/thumbnail/${videoId}.jpg`;
  return (
    <div className="card-wrapper">
      <div className="card">
        <img img src={imageUrl} alt="thumbnail" className="card-image" />
        <div className="card-content">
          <h3 className="card-title" style={{fontSize:'14px'}}>{truncateText(title, 15)}</h3>
          <p className="card-subtitle" style={{fontSize:'10px'}}>{truncateText(content, 25)}</p>
          <div className="card-tags" style={{ textDecoration: 'none', color: 'gray' }}>
            {/* 전체 태그 문자열에 truncateText 함수 적용 */}
            <span className="card-tag">{truncateText(tagsString, 10)}</span>
          </div>
          <hr style={{ borderColor: 'gray' }} />
          <div className="card-stats">
            <span className="card-likes" style={{ color: 'gray' }}>{likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
