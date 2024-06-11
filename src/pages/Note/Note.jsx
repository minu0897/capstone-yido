
import { useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './Note.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const Note = () => {
  const [data, setData] = useState(null);
  const [cardui, setcardui] = useState(false);
  const [listui, setlistui] = useState(true);
  const [flippedStates, setFlippedStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFlippedStates(new Array(data.length).fill(false));
    }
  }, [data]);

  const handleFlip = (index) => {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  };

  
const deleteNote = async  (data) => {
  try {
    const response = await axios.delete(`/api/note/${data}`);
    console.log('Note deleted successfully:', response.data);
    dataselect();
    return response.data; // 성공적인 응답 처리
  } catch (error) {
    console.error('Error deleting the note:', error);
    throw error; // 에러를 던져 상위 콜 스택에서 처리할 수 있도록 함
  }
};

const dataselect = () => { 
  axios.get('/api/note')
    .then(response => {
      setData(response.data.noteList);
      console.log(response.data.noteList);
    })
    .catch(error => {
    }
    );
};

  useEffect(() => {
    dataselect();
  }, []);

  const clickcard = () => {
    setcardui(true);
    setlistui(false);
  }
  const clicklist = () => {
    setcardui(false);
    setlistui(true);
  }
  const clickNoteVideo = (v1,v2) => {
    navigate('/videoplayer?id=' + v1+"&timeline="+v2);
  }
  return (
    <div className='note'>
      <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", borderBottom: "2px solid darkgray" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>{ ( data == null ? "0" : data.length )+"\u00A0\u00A0"}</span>
        <span style={{ fontSize: "20px" }}>{"words are stored"}</span>
        <FontAwesomeIcon title='View as list' icon={faList} style={{ marginLeft: "auto",color: listui ? "black" : "#D5D5D5" }} className='n-icon' onClick={clicklist} />
        <FontAwesomeIcon title='View by card' icon={faGrip} style={{  color: cardui ? "black" : "#D5D5D5" }} className='n-icon' onClick={clickcard} />
      </div>
      {
        data != null && listui &&
        data.map((data, index) => (
          <div key={index} className={(index % 2 == 0) ? 'n-word-div' : 'n-word-div-odd'}>
            <div style={{display:"flex",alignItems:"center"}}>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "3px", marginBottom: "6px", color: "#637BC8" }}>
                <FontAwesomeIcon icon={faStar} style={{ height: "20px", color: "#4C4C4C", paddingRight: "4px", color: "#FAED7D" }} className='n-icon' />
                {data.wordName}
              </p>
              <FontAwesomeIcon   onClick={() => deleteNote(data.noteId)}title="delete word" icon={faXmark} style={{ height: "20px", color: "#4C4C4C", paddingRight: "4px", color: "white" ,marginLeft:"auto"}} className='n-icon'/>
            </div>
            <p style={{ fontSize: "1.2rem", marginLeft: "15px", fontWeight: "bold", marginTop: "10px", marginBottom: "6px" }}>
              {data.wordMeaning}
            </p>
            <p onClick={() => clickNoteVideo(data.videoId, data.timeline)} style={{ fontSize: "0.8rem", marginLeft: "15px", fontWeight: "bold", marginTop: "13px", marginBottom: "6px", textDecoration: "underline", cursor: "pointer" }}>
              Go to the video where this word appears
            </p>
          </div>
        ))
      }
      {
        data != null && cardui &&
        <div className='n-card-container'>
          {
            data.map((data, index) => (
              <div key={index} className={`notecard ${flippedStates[index] ? 'flipped' : ''}`} onClick={() => handleFlip(index)} >
                <div className="notecard-front">
                  {data!=null ?data.wordName:""}
                </div>
                <div className="notecard-back">
                  {data!=null ?data.wordMeaning:""}
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  );
};

export default Note;