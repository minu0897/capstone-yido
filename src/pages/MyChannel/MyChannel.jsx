
import { useLocation,Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MyChannel.css'

const MyChannel = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('/api/channel')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
      }
    );
  }, []);

  return (
    <div className='Mychannel-div'>
    </div>
  );
};

export default MyChannel;