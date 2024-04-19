import React from 'react';
import { Link } from 'react-router-dom';
import './Community.css'
import Card from './Card';

const Community = () => {

  const communityboxarray={
    display:'flex',
    marginAuto:'auto auto auto auto',
  };

  return (
    <div className='community'>
      <div className='centerDiv'> 
        <div className='heading'>
          Community
        </div>
      </div>
      <div style={communityboxarray}>
      <Card 
        image="path-to-image.jpg"
        title="Card Title"
        subtitle="Card subtitle text"
        likes={99}
        comments={10}
      />
      <Card 
        image="path-to-image.jpg"
        title="Card Title"
        subtitle="Card subtitle text"
        likes={99}
        comments={10}
      />
      <Card 
        image="path-to-image.jpg"
        title="Card Title"
        subtitle="Card subtitle text"
        likes={99}
        comments={10}
      />
      <Card 
        image="path-to-image.jpg"
        title="Card Title"
        subtitle="Card subtitle text"
        likes={99}
        comments={10}
      />
      </div>
    </div>
  );
};

export default Community;