
import { useLocation,Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './Note.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Note = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('/api/note')
      .then(response => {
        setData(response.data.noteList);
        console.log(response.data.noteList);
      })
      .catch(error => {
      }
    );
  }, []);

  return (
    <div className='note'>
    {
      data != null &&
      data.map((data, index) => (
        <div key={index} className='n-word-div'>
          <p style={{fontSize:"1.5rem",fontWeight:"bold",marginTop:"3px",marginBottom:"6px"}}>
            <FontAwesomeIcon icon={faStar} style={{ height: "20px", color: "#4C4C4C", paddingRight: "4px" }} className='n-icon' />
            {data.wordName}
          </p>
          <p style={{fontSize:"1.2rem",marginLeft:"15px",fontWeight:"bold",marginTop:"10px",marginBottom:"6px"}}>
            {data.wordMeaning}
          </p>
          <p style={{fontSize:"0.8rem",marginLeft:"15px",fontWeight:"bold",marginTop:"13px",marginBottom:"6px",textDecoration:"underline",cursor:"pointer"}}>
            Go to the video where this word appears
          </p>
        </div>
      ))
     }
    </div>
  );
};

export default Note;