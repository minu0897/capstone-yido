import React from 'react';
import './Card.css'; // Card 컴포넌트 전용 스타일시트

const Card = ({ postId, title, content, likes, dislikes }) => {
  return (
    <div className="card">
      <img src="https://dummyimage.com/600x400/000/fff&text=photo"alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{content}</p>
        <hr/>
        <div className="card-stats">
          <span className="card-likes">{likes} likes</span>
          <span>{dislikes} dislikes</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
