import React from 'react';
import './Card.css'; // Card 컴포넌트 전용 스타일시트

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const Card = ({ postId, title, content, likes, tags }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <img src="https://dummyimage.com/600x400/000/fff&text=photo" alt={title} className="card-image" />
        <div className="card-content">
          <h3 className="card-title" style={{fontSize:'10px'}}>{truncateText(title, 20)}</h3>
          <p className="card-subtitle" style={{fontSize:'8px'}}>{truncateText(content, 30)}</p>
          <div className="card-tags" style={{ textDecoration: 'none', color: 'gray' }}>
            {tags.map((tag, index) => (
              <span key={index} className="card-tag">#{tag} </span>
            ))}
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
