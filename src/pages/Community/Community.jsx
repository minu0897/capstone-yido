import React from 'react';
import { Link } from 'react-router-dom';
import './Community.css'
import Card from './Card';

const Community = () => {

  return (
    <div className='community'>
      <div className='centerDiv'> 
        <div className='heading'>
          Community
        </div>
      </div>
      <Card 
        image="path-to-image.jpg"
        title="Card Title"
        subtitle="Card subtitle text"
        likes={99}
        comments={10}
      />
    </div>
  );
};

export default Community;