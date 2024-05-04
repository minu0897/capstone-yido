import React from 'react';
import { Link } from 'react-router-dom';
import './Recommand.css'

const Recommand = () => {

  return (
    <div className='recommand'>
        <Link to={'/videoplayer?id=1'}>
            video
        </Link>
    </div>
  );
};

export default Recommand;