import React from 'react';
import './Card.css'; // Card 컴포넌트 전용 스타일시트

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const Card = ({ videoId, title, content, likes, tags, writer }) => {
  // 태그 배열을 하나의 문자열로 결합
  const tagsString = tags.map(tag => `#${tag}`).join(' ');
  const imageUrl = `http://101.235.73.77:8088/video/thumbnail/${videoId}.jpg`;

  return (
    <div className="card-wrapper">
      <div className="card">
        {/* videoId가 null이 아닐 때만 이미지 태그를 렌더링합니다 */}
        {videoId && (
          <img src={imageUrl} alt="thumbnail" className="card-image" style={{width:'300px', height:'200px'}}/>
        )}
        <div className="card-content">
          <h3 className="card-title" style={{fontSize:'19px'}}>{truncateText(title, 15)}</h3>
          <p className="card-subtitle" style={{fontSize:'13px'}}>{truncateText(content, 25)}</p>
          <div className="card-tags" style={{ textDecoration: 'none', color: 'gray' }}>
            {/* 전체 태그 문자열에 truncateText 함수 적용 */}
            <span className="card-tag">{truncateText(tagsString, 10)}</span>
          </div>
          <hr className="card-divider" />
          <div>
            <span className="card-likes" style={{ color: 'gray' }}>{likes} likes </span>
            <span style={{marginRight:'20px'}}>{writer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
