
import { useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ReportingVideo.css'
import Controls from '../../components/videoplayer/control/Controls'
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('id');
    const [isHovered, setIsHovered] = useState(-1);  // 호버 상태를 관리하는 로컬 상태
    const [ismenuClicked, setismenuClicked] = useState(-1);  // 문장신고 메뉴 상태를 관리하는 로컬 상태
    const [community, setcommunity] = useState(null);  // 커뮤니티 글 정보들
    const [liked, setliked] = useState(null);  // 좋아요
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
        setData();
    }, []);

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
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>{ ( data == null ? "0" : data.length )+"\u00A0\u00A0"}</span>
                    <span style={{ fontSize: "20px" }}>{ " 개의 "+ (wordui ? "단어가 " : "문장이 ") +"보고되었습니다."}</span>
                    <button onClick={uichange}
                    style={{ fontSize: "20px",marginLeft:"auto",border:"none",backgroundColor:"transparent",cursor:"pointer",textDecoration:"underline"}}>
                        { (wordui ? "문장" : "단어") +"보기"}
                    </button>
                </div>
                {
                    wordui?
                    <div>
                        word
                    </div>
                    :
                    <div>
                        sentence
                    </div>
                }
            </div>
        </div>
    );
};

export default ReportingVideo;