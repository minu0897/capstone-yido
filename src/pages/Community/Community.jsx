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
      <div className='write' style={{marginLeft:'1000px'}}>
      <Link to={'/WriteCommunity'} style={{textDecoration:'none', color:'black'}}>
        <img src="https://png.pngtree.com/png-clipart/20211020/ourlarge/pngtree-red-pencil-clipart-png-image_3995136.png" width={'20px'} height={'20px'}/>
        Write
      </Link>
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