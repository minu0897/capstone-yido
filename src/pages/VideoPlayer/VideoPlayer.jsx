
import { useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
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
import { Scrollbars } from 'react-custom-scrollbars'

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
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
  const [isHovered, setIsHovered] = useState(-1);  // 호버 상태를 관리하는 로컬 상태
  const [ismenuClicked, setismenuClicked] = useState(-1);  // 문장신고 메뉴 상태를 관리하는 로컬 상태
  const [community, setcommunity] = useState(null);  // 커뮤니티 글 정보들
  const [liked, setliked] = useState(null);  // 좋아요
  const navigate = useNavigate();

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
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
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
  const settingClose = () => {
    setIsHovered(-1);
    setismenuClicked(-1);
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
    axios.get('/api/dictionary?subtitleWordId=' + wordId)
      .then(response => {
        setwordApiData(response.data);
        setshowWord(true);
      })
      .catch(error => {
      });
      return ;
    if (wordId == null) return;
    if (window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")) {
      setshowWord(true);
      const jsonData = require('./a.json');
      setwordApiData(jsonData);
    } else {
      axios.get('/api/dictionary?subtitleWordId=' + wordId)
        .then(response => {
          setwordApiData(response.data);
          setshowWord(true);
        })
        .catch(error => {
        });
    }

  }, [wordId]);

  useEffect(() => {
  }, [wordApiData]);

  useEffect(() => {
    const url = '/api/video/' + videoId;

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
  }, []);

  useEffect(() => {
    if (data != null) {
      setSubtitles(data.subtitleSentences);
      setcommunity(data.communityResponses);
      setliked(data.liked);
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

  const reportSentence = (data) => {
    ///api/report/sentence/{subtitleSentenceId}
    axios.get('api/report/sentence/' + data.subtitleId)
      .then(response => {
        alert("We reported the error regarding the sentence to the channel manager.");
      })
      .catch(error => {
      });
  }

  const reportWord = (data) => {
    axios.get('api/report/word/' + data)
      .then(response => {
        alert("We reported the error regarding the word to the channel manager.");
      })
      .catch(error => {
      });
  }

  const addNote = async (data) => {
    try {
      const response = await axios.post('/api/note/' + data.id+"?isCorrected="+data.corrected);
      // 응답 처리
      if (response.status === 200) {  // HTTP 상태 코드가 200(성공)인 경우
        alert("Added to Note");
      } else {
      }
    } catch (error) {
    }
  }

  const closeDictionary = () => {
    setshowWord(false);
    alert("closemenu");
  }

  const writeCommunityPost = () => {
    navigate('/WriteCommunity?videoid=' + videoId);
  }
  const CommunityPost = (id) => {
    navigate('/api/post/' + id);
  }


  const setLike = () => {
    axios.get('/api/video/like?videoId=' + videoId)
      .then(response => {
        setliked(true);
      })
      .catch(error => {
      });
  }
  const updateLike = async (id, updatedData) => {
    try {
      // 엔드포인트 URL 구성
      const url = '/api/video/like?videoId=' + videoId;

      // axios.put 메서드를 사용하여 PUT 요청 보내기
      const response = await axios.put(url, updatedData);

      // 서버 응답 출력
      console.log('Data updated successfully:', response.data);
    } catch (error) {
      // 오류 발생 시 콘솔에 출력
      console.error('Error updating data:', error);
    }
  };

  //-------------------------------------------
  //render
  //-------------------------------------------
  return (
    <div className='videoplayer'>
      <h1>{data != null && data.title}</h1>
      <div style={{ height: "700px", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "800px", paddingRight: "15px", minHeight: "700px" }}>
          <div className="player" style={{ height: "450px" }}>
            <Container maxWidth="md" style={{ padding: '0px' }}>
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={hanldeMouseLeave}
                ref={playerContainerRef}
                className={classes.playerWrapper}
                style={{ padding: "0px" }}
              >

                <ReactPlayer
                  url=
                  {
                    (
                      window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")
                    ) ?
                      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                      : "http://101.235.73.77:8088/video/video/" + videoId + ".mp4"

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
                    onBookmark={addBookmark} />
                }
              </div>
            </Container>
          </div>
          {
            // 좋아요버튼 , 글쓰기
          }
          <div style={{ height: "60px", backgroundColor: "", marginTop: "5px", marginBottom: "0px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: '25px', padding: '5px', paddingBottom: '0px' }}>
              <div>
                <p style={{ margin: "0px", fontSize: "14px" }}>MadeBy </p>
                <p style={{ margin: "0px", fontSize: "18px" }}>{ data != null ? data.channelName:""}</p>
              </div>
              <div style={{ display: "flex" }}>
                <div className='vp-video-button' style={{ marginRight: "10px" }}>
                  <button style={{ width: "100%", height: "100%", position: "absolute", opacity: 0, cursor: "pointer" }} onClick={setLike}>
                  </button>
                  <FontAwesomeIcon icon={liked ? faHeart : faHeartBroken} style={{ height: "25px", color: "#4C4C4C", paddingRight: "4px" }} className='vp-word-icon' />
                  <span>like</span>
                </div>
                <div className='vp-video-button'>
                  <button style={{ width: "100%", height: "100%", position: "absolute", opacity: 0, cursor: "pointer" }} onClick={writeCommunityPost}>
                  </button>
                  <FontAwesomeIcon icon={faPen} style={{ height: "20px", color: "#4C4C4C", paddingRight: "4px" }} className='vp-word-icon' />
                  <span style={{ fontSize: "14px" }}>Write about video</span>
                </div>
              </div>
            </div>
          </div>
          {
            //영상 밑에 div 내용조회수등
            data != null &&
            <>
              <div style={{ backgroundColor: "#EFEFEF", borderRadius: "5px", padding: "5px", marginTop: "0px" }}>
                <h4>
                  {' '}{parseInt(data.views).toLocaleString()}{' views\u00A0\u00A0\u00A0\u00A0\u00A0'}
                  {data.uploadDate.slice(0, 4)}{'.'}
                  {data.uploadDate.slice(5, 7)}{'.'}
                  {data.uploadDate.slice(8, 10)}{'.'}
                </h4>
                <h3 style={{ whiteSpace: "pre-wrap" }}>{data.content}</h3>
              </div>
            </>
          }
          {
            //영상 밑에 커뮤니티
            community != null &&
            <div className="vp-community-div" style={{ marginTop: "10px" }}>
              <div style={{ borderTop: "1px solid #c4c4c4", height: "30px", marginTop: "5px" }}>
                <p style={{ fontSize: "18px", marginTop: "10px", fontWeight: "bold" }}>A post about this video</p>
              </div>
              {
                community.map((data, index) => (
                  <div key={index} className='vp-community-item'>
                    <p style={{ fontSize: "1.5rem", marginTop: "10px", fontWeight: "bold", marginTop: "3px", marginBottom: "6px" }}>
                      {data.title}
                    </p>
                    <p style={{ whiteSpace: "pre-wrap", maxHeight: "70px", minHeight: "70px", overflow: "hidden", fontSize: "1rem" }}>{data.content}</p>
                    <div style={{ height: "30px", marginTop: "5px", display: "flex" }}>
                      <FontAwesomeIcon icon={faHeart} style={{ height: "16px", color: "darkgray", paddingTop: "1px" }} className='vp-word-icon' />
                      <span style={{ color: "darkgray" }}>
                        {"\u00A0"}{data.like}{"\u00A0"}like{"\u00A0\u00A0\u00A0.\u00A0\u00A0\u00A0"}
                      </span>
                      <span style={{ color: "darkgray" }}>
                        {String(data.uploadDate).substring(8, 10)}{" - "}
                        {String(data.uploadDate).substring(5, 7)}{" - "}
                        {String(data.uploadDate).substring(0, 4)}{"\u00A0\u00A0\u00A0.\u00A0\u00A0\u00A0"}
                      </span>
                      <span style={{ color: "darkgray" }}>
                        {"\u00A0"}{data.commentCnt}{"\u00A0"}comment
                      </span>
                      <span style={{ color: "darkgray", marginLeft: "auto", fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => CommunityPost(data.postId)}
                      >
                        Take a look at this post
                      </span>
                    </div>
                  </div>
                ))
              }
              <div style={{ height: "30px", marginTop: "5px" }}>
              </div>
            </div>
          }
        </div>
        <div style={{ height: "450px", width: "370px" }}>
          <div className="video-subtitles-container" style={{ height: '450px' }} >
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              hideTracksWhenNotNeeded={true}  // 수평 스크롤바 숨기기 위한 설정
              ref={refScrollbars} style={{ width: "490px", height: "450px", overflow: "hidden", marginLeft: "5px" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} style={{ ...style, backgroundColor: '#383933', borderRadius: 3 }} />
              }
            >
              {//자막div
                subtitles != null &&
                subtitles.map((subtitle, index) => (
                  <div key={index} className={subtitle.isFocus ? 'subtitle-show' : ''} ref={subtitle.isFocus ? activeSubtitleRef : null}
                    onMouseEnter={() => setIsHovered(index)} // 마우스 진입 시
                    onMouseLeave={() => settingClose()} // 마우스 벗어날 시
                    style={{maxWidth:"330px"}}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center', // 세로 중앙 정렬
                      height: '25px' // div의 높이 설정
                    }}>
                      {/* 자막시간 */}
                      <p className='pt'>{parseInt(subtitle.startTime / 60)}:{String(parseInt(subtitle.startTime) % 60).padStart(2, "0")}</p>

                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        style={{ color: "#383933", height: "18px", marginRight: "3px", visibility: (isHovered == index ? 'visible' : 'hidden') }}
                        className='vp-word-icon'
                        onClick={() => setismenuClicked(index)}
                      />
                      <div className='vp-word-menu' style={{ visibility: (ismenuClicked == index ? 'visible' : 'hidden') }} onClick={() => reportSentence(subtitle)} >
                        <FontAwesomeIcon icon={faCircleExclamation} style={{ height: "12px", color: "#4C4C4C", }} className='vp-word-icon' />
                        <h6 style={{ margin: 0 }}>Report sentence</h6>
                      </div>
                    </div>
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
          {//사전div
            showWord &&
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              hideTracksWhenNotNeeded={true}  // 수평 스크롤바 숨기기 위한 설정
              style={{ width: "370px", height: "330px", overflow: "hidden", marginTop: "10px", borderRadius: "6px" }}

              renderThumbVertical={({ style, ...props }) =>
                <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: 3 }} />
              }
            >
              <div style={{ border: "1px solid black", backgroundColor: "#383933", minHeight: "310px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '25px', padding: '5px', paddingBottom: '0px' }}>
                  {
                    //지움면 안돰
                    <div></div>
                  }
                  <div>
                    <FontAwesomeIcon icon={faCircleExclamation} title='Report an error' style={{ color: "#FF6C6C" }} className='vp-word-icon'
                      onClick={() => reportWord(wordId)}
                    />
                    <FontAwesomeIcon icon={faXmark} title='Close dictionary' style={{ color: "#fff" }} className='vp-word-icon'
                      onClick={() => closeDictionary()}
                    />
                  </div>
                </div>
                {
                  wordApiData.dictionaryDetailResponses.map((word, index) => (
                    <div style={{ paddingLeft: "5px" }}>
                      <div style={{ display: "flex", height: "40px", alignItems: "center" }}>
                        <FontAwesomeIcon icon={faClipboard} title='add note' style={{ color: "637BC8" }} className='vp-word-icon'
                          onClick={() => addNote(word)}
                        />
                        <p className='vp-word-title'>{word.wordName} <sup>{index + 1}</sup></p>
                      </div>
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