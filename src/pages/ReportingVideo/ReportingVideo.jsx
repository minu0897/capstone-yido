
import { useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ReportingVideo.css'
import Controls from '../../components/videoplayer/control/Controls'
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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

const ReportingVideo = () => {
    const [data, setData] = useState(null);
    const [wordui, setwordui] = useState(true);//false 이면 보고된 문장으로
    const [words, setwords] = useState([]);//
    const [sentences, setsentences] = useState([]);//
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('id');
    const [isHovered, setIsHovered] = useState(-1);  // 호버 상태를 관리하는 로컬 상태
    const [ismenuClicked, setismenuClicked] = useState(-1);  // 문장신고 메뉴 상태를 관리하는 로컬 상태
    const navigate = useNavigate();
    const classes = useStyles();
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
    const [bookmarks, setBookmarks] = useState([]);
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

    useEffect(() => {
        dataselect();
    }, []);

    const dataselect = () => {
        axios.get('/api/report/words/' + videoId)
            .then(response => {
                setwords(response.data.resultList);
                console.log(response.data.resultList);
            })
            .catch(error => {
                setwords([]);
            }
            );

        axios.get('/api/report/sentences/' + videoId)
            .then(response2 => {
                setsentences(response2.data.resultList);
            })
            .catch(error => {
                setsentences([]);
            }
            );
    }

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

    const uichange = () => {
        setwordui(!wordui);
    };

    const settingplayertime = (time) => {
        if (playerRef.current) {
          playerRef.current.seekTo(time, 'seconds');
        }
    };

    const sentenceAdd = (event,sen) => {
        sen.val = event.target.value;
    };
    
    const sentenceSubmit = async (v1,v2) => {
        const formData = {
            subtitleSentenceId: v1, // videoId가 없는 경우 null로 설정
            correctedKorSentence:v2,
        };
        console.log(formData);

        try {
            const response = await fetch('/api/report/sentence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            alert('수정된 한국어 문장을 AI에게 번역을 요청하였습니다!');
        } catch (error) {
            console.error('실패했습니다:', error);
        }
    };

    const wordAdd = (event,wor) => {
        wor.val = event.target.value;
    };
    
    const wordSubmit = async (v1,v2) => {
        const formData = {
            subtitleWordId: v1, // videoId가 없는 경우 null로 설정
            correctedMeaning:v2,
        };
        console.log(123);
        console.log(formData);

        try {
            const response = await fetch('/api/report/word', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            alert('수정된 단어 의미를 단어장에 추가하였습니다.');
        } catch (error) {
            console.error('실패했습니다:', error);
        }
    };

    return (
        <div className='rv-con-div'>
            <div className="rv-player" style={{ height: "450px" }}>
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
            <div className="rv-reporting" style={{ height: "450px" }}>
                <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", borderBottom: "2px solid darkgray" }}>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                        { wordui ? words.length : sentences.length + "\u00A0\u00A0" }
                    </span>
                    <span style={{ fontSize: "20px" }}>{" 개의 " + (wordui ? "단어가 " : "문장이 ") + "보고되었습니다."}
                    </span>
                    <button onClick={uichange}
                        style={{ fontSize: "20px", marginLeft: "auto", border: "none", backgroundColor: "transparent", cursor: "pointer", textDecoration: "underline" }}>
                        {(wordui ? "문장" : "단어") + "보기"}
                    </button>
                </div>
                {
                    wordui ?
                        <div>
                            {
                                words != null && wordui &&
                                words.map((word, index) => (
                                    <div key={index} className='rv-word-div'>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <FontAwesomeIcon 
                                            onClick={() =>wordSubmit(word.subtitleWordId,word.val)} 
                                            title="수정된 의미 저장" icon={faPenToSquare} style={{ height: "20px",  paddingRight: "4px"}} className='n-icon'/>
                                            <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "3px", marginBottom: "6px", color: "red" }}>
                                                {
                                                    word.word
                                                }
                                            </p>
                                        </div>
                                        <textarea className='rv-inwordmean' placeholder="추가할 단어 뜻을 적어주세요." inputMode='text'
                                        onChange={(event) =>wordAdd(event,word)}
                                        >
                                        </textarea>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div style={{overflowY:"scroll",maxHeight:"500px"}}>
                        {
                            sentences != null && !wordui &&
                            sentences.map((sentence, index) => (
                                <div key={index} className='rv-sen-div'>
                                    <div style={{ alignItems: "center",marginRight:"10px" }}>
                                        <div style={{display:"flex",alignItems: "center"}}>
                                            <FontAwesomeIcon 
                                            onClick={() =>settingplayertime(sentence.startTime)} 
                                            title="해당 문장으로 이동" icon={faPlay} style={{ height: "16px",  paddingRight: "4px"}} className='n-icon'/>
                                            <p className='pt'>{parseInt(sentence.startTime / 60)}:{String(parseInt(sentence.startTime) % 60).padStart(2, "0")}</p>
                                        </div>
                                        <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "3px", marginBottom: "6px", color: sentence.reported ? "red":"black" }}>
                                            {sentence.korSubtitle}
                                        </p>
                                    </div>
                                    {
                                        sentence.reported?
                                        <div style={{marginRight:"10px"}}>
                                            <p style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "3px", marginBottom: "6px", color: sentence.reported ? "red":"black" }}>
                                                {sentence.engSubtitle}
                                            </p>
                                            <div style={{display:"flex",alignItems: 'center' }}>
                                                <input className= 'rv-inwordmean' placeholder="수정된 문장(한국어)을 적어주세요." inputMode='text' 
                                                onChange={(event) =>sentenceAdd(event,sentence)}
                                                >
                                                </input>
                                                <FontAwesomeIcon 
                                                onClick={() =>sentenceSubmit(sentence.subtitleSentenceId,sentence.val)} 
                                                title="수정한 문장 서버에 보내기" icon={faPaperPlane} style={{ height: "30px",  marginLeft: "14px",marginTop: "-8px"}} className='n-icon'/>
                                            </div>
                                        </div>
                                        :<></>
                                    }
                                </div>
                            ))
                        }
                        </div>
                }
            </div>
        </div>
    );
};

export default ReportingVideo;