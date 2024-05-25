
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect,useRef } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './VideoPlayer.css'
import Player from '../../components/videoplayer/player/Player'
import Subtitles from '../../components/videoplayer/subtitle/Subtitles'

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {Scrollbars} from 'react-custom-scrollbars'

import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
//import screenful from "screenfull";
import Controls from '../../components/videoplayer/control/Controls'
import customscroll from '../../components/common/customscrolls/customscroll'


//-------------------------------------------
//함수 및 변수(player)
//-------------------------------------------

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",

    position: "relative",
    // "&:hover": {
    //   "& $controlsWrapper": {
    //     visibility: "visible",
    //   },
    // },
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",

    // background: "rgba(0,0,0,0.6)",
    // height: 60,
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));


const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

const VideoPlayer = () => {
  
  //-------------------------------------------
  //yido 변수
  //-------------------------------------------
  const [data, setData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get('id');
  const [subtitles, setSubtitles] = useState(null);
  //const subtitlesRef = useRef(null); // 스크롤을 위한 ref 생성
  const activeSubtitleRef = useRef(null);
  const [wordId, setwordId] = useState(null);
  const [wordApiData, setwordApiData] = useState(null);
  const [showWord, setshowWord] = useState(false);
  const refScrollbars = React.useRef(null);

  
  //-------------------------------------------
  //player 변수
  //-------------------------------------------
  const classes = useStyles();
  // const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;
  
  
  //-------------------------------------------
  //player 함수
  //-------------------------------------------
  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    //console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    //console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    //screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    setBookmarks(bookmarksCopy);
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

//-------------------------------------------
//yido 함수
//-------------------------------------------// 단어 클릭 핸들러
  const handleWordClick = (word) => {
    setwordId(word.subtitleWordId);
    
    // 여기에 클릭된 단어에 대한 처리 로직 추가
  };

  useEffect(() => {
    if(wordId == null)  return;
    if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
      setshowWord(true);
      const jsonData = require('./a.json');
      setwordApiData(jsonData);
    }else{
      axios.get('/api/dictionary?subtitleWordId='+wordId)
        .then(response => {
          setwordApiData(response.data);
          setshowWord(true);
        })
        .catch(error => {
        });
      
    }

  },[wordId]);

  useEffect(() => {
  },[wordApiData]);

  useEffect(() => {
    const url = '/api/video/'+videoId;

    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
      });

      const timer = setTimeout(() => {
        //setPlaying(true); // 1초 후 재생 상태를 true로 설정
      }, 1000);
  
      //return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  },[]);
  
  useEffect(() => {
    if(data !=null){
      setSubtitles(data.subtitleSentences);
      //console.log(data.subtitleSentences);
      //console.log(data);
      //setPlaying(true); // 1초 후 재생 상태를 true로 설정
    }
  }, [data]);
  useEffect(() => {
    if (subtitles !== null) {
      let hasFocusChanged = false;
      const updatedSubtitles = subtitles.map((subtitle, index) => {

        const newIsFocus = currentTime >= subtitle.startTime && 
          (subtitles[index + 1] ? currentTime < subtitles[index + 1].startTime : true);

        if (subtitle.isFocus !== newIsFocus) hasFocusChanged = true;

        return {
          ...subtitle,
          show: true,
          isFocus: newIsFocus,
        };
      });
      if (hasFocusChanged) {
        setSubtitles(updatedSubtitles);
      }
    }
  }, [currentTime]);

  useEffect(() => {
      scrollToActiveSubtitle();
  }, [subtitles]);
  // 스크롤 조정 함수
  const scrollToActiveSubtitle = () => {
    const focusedSubtitle = subtitles?.find(subtitle => subtitle.isFocus);
    if (focusedSubtitle && activeSubtitleRef.current && refScrollbars.current) {
      const subtitleTop = activeSubtitleRef.current.offsetTop;

      refScrollbars.current.scrollTop(subtitleTop);
    }
  };
  

//-------------------------------------------
//render
//-------------------------------------------
  return(
    <div className='videoplayer'>
      <h1>{ data!=null && data.title}</h1>
      <div style={{height:"700px",display:"flex",flexDirection:"row"}}>
        <div style={{height:"700px",width:"800px",paddingRight:"15px"}}>
          <div className="player" style={{height:"450px"}}>
            <Container maxWidth="md" style={{ padding: '0px' }}>
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={hanldeMouseLeave}
                ref={playerContainerRef}
                className={classes.playerWrapper}
                style={{padding:"0px"}}
              >
              
                <ReactPlayer
                  url=
                  { 
                    (
                      window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")
                    )?
                    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                    :"http://101.235.73.77:8088/video/video/"+videoId+".mp4"

                  }
                  ref={playerRef}
                  width="100%"
                  height="100%"
                  pip={pip}
                  playing={playing}
                  controls={false}
                  light={light}
                  loop={loop}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
                  onProgress={handleProgress}
                  progressInterval={100} // 0.1초마다 진행 상태 업데이트
                  config={{
                    file: {
                      attributes: {
                        crossorigin: "anonymous",
                      },
                    },
                  }}
                />
                  {
                    <Controls
                      ref={controlsRef}
                      onSeek={handleSeekChange}
                      onSeekMouseDown={handleSeekMouseDown}
                      onSeekMouseUp={handleSeekMouseUp}
                      onDuration={handleDuration}
                      onRewind={handleRewind}
                      onPlayPause={handlePlayPause}
                      onFastForward={handleFastForward}
                      playing={playing}
                      played={played}
                      elapsedTime={elapsedTime}
                      totalDuration={totalDuration}
                      onMute={hanldeMute}
                      muted={muted}
                      onVolumeChange={handleVolumeChange}
                      onVolumeSeekDown={handleVolumeSeekDown}
                      onChangeDispayFormat={handleDisplayFormat}
                      playbackRate={playbackRate}
                      onPlaybackRateChange={handlePlaybackRate}
                      onToggleFullScreen={toggleFullScreen}
                      volume={volume}
                      onBookmark={addBookmark}/>
                  }
                </div>
              </Container>
          </div>
          {
          data!=null && <div style={{backgroundColor:"#EFEFEF", borderRadius:"5px",padding:"5px",marginTop:"20px"}}>
            <h4>
              {' '}{parseInt(data.views).toLocaleString()}{' views\u00A0\u00A0\u00A0\u00A0\u00A0'}
              {data.uploadDate.slice(0, 4)}{'.'}
              {data.uploadDate.slice(5, 7)}{'.'}
              {data.uploadDate.slice(8, 10)}{'.'}
            </h4>
            <h3>{data.content}</h3>
          </div>
          }
        </div>
        <div style={{height:"450px",width:"370px"}}>
          <div className="video-subtitles-container" style={{height:'450px'}} >
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                hideTracksWhenNotNeeded={true}  // 수평 스크롤바 숨기기 위한 설정
                ref={refScrollbars} style={{ width: "490px", height: "450px" ,overflow:"hidden",marginLeft:"5px"}}
                renderThumbVertical={({ style, ...props }) =>
                  <div {...props} style={{ ...style, backgroundColor: '#383933', borderRadius: 3 }} />
                }
              >
                    {//ref={subtitlesRef}
                      subtitles != null &&
                        subtitles.map((subtitle, index) => (
                            <div key={index} className={subtitle.isFocus ? 'subtitle-show' : ''} ref={subtitle.isFocus ? activeSubtitleRef : null}>
                                <p className='pt'>{parseInt(subtitle.startTime/60)}:{String(parseInt(subtitle.startTime)%60).padStart(2, "0")}{/* .{String(subtitle.startTime).split('.', 1)}  */}</p>
                                {
                                  //<p className='pk'>{subtitle.korText}</p>
                                }
                                {
                                subtitle.korWords.map((word, index) => (
                                  <span key={index} className='vp-span-word' onClick={() => handleWordClick(word)} style={{ cursor: 'pointer' }}>
                                    {word.subtitleWordName}
                                  </span>
                                ))
                                }
                                <p className='pe'>{subtitle.engText}</p>
                            </div>
                        ))
                    }
              </Scrollbars>
          </div>
          {
            showWord &&
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              hideTracksWhenNotNeeded={true}  // 수평 스크롤바 숨기기 위한 설정
              ref={refScrollbars} style={{ width: "370px", height: "220px" ,overflow:"hidden",marginTop:"10px",borderRadius: "6px"}}
              
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: 3 }} />
              }
            >
              <div style={{border:"1px solid black",backgroundColor:"#383933"}}>
              {
                wordApiData.dictionaryDetailResponses.map((word, index) => (
                  <div style={{paddingLeft:"5px"}}>
                    <p className='vp-word-title'>{word.wordName} <sup>{index+1}</sup></p>
                    <p className='vp-word-meaning'>{word.wordMeaning}</p>
                  </div>
                ))
                }
                
              </div>
            </Scrollbars>
          }
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;