import React, { useState } from 'react';
import axios from 'axios';
import './RegisterVideo.css'
import videoicon from '../../img/video-upload.png'

const RegisterVideo = () => {
    const getCurrentDateTime = () => {
        const local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toISOString().slice(0, 16);  // 'YYYY-MM-DDTHH:mm'으로 포맷
    };

    const fileInputRef = React.useRef(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [page, setPage] = useState(1);
    const [dateTime, setDateTime] = useState(getCurrentDateTime());
    const [fileerr, setFileErr] = useState(0);//0:대기 1:성공 2:확장자 3:업로드실패
    
    const handleFileChange = event => {
        const tmp_file = event.target.files[0];
        if (tmp_file) {
            const fileName = tmp_file.name;
            const extension = fileName.split('.').pop();
            if(extension === 'mp4'){
                console.log("1");
                setFile(tmp_file);
                setFileErr(1);
            }
            else{
                console.log("2");
                setFileErr(2);
            }
        } else {
            console.log("3");
            setFileErr(3);
        }
    };

    const getFileErr = () => {
        let ret;
        console.log("123");
        if( fileerr === 0 ){
            ret="Please upload your video";
        }else if( fileerr === 1 ){
            ret="";
        }else if( fileerr === 2 ){
            ret="Please check the extension and upload again.";
        }else if( fileerr === 3 ){
            ret = "Upload failed! Contact your administrator";
        }

        return ret;
    };
    
    const handlePrevClick = event => {
        if(page!==1) setPage(page - 1);
    };
    const handleNextClick = event => {
        if(page!==4) setPage(page + 1);
    };
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    const handleTitleChange = event => {
        setTitle(event.target.value);
    };

    const handleInputChange = event => {
        setTagInput(event.target.value);
    };

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title);
        formData.append("videoTags", []); // tags 배열을 직접 전달
        // const jsonBlob = new Blob([JSON.stringify({ tags: tags })], {
        //     type: 'application/json'
        // });
        // formData.append("json", jsonBlob);

        // Axios 인스턴스를 사용하여 POST 요청


        try {
            const response = await axios.post('/api/video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Upload Error:', error);
        }
    };
    
    return (
        <div className="container-regi">
        {/* 
            <form onSubmit={handleSubmit}>
                <input name ="video" type="file" onChange={handleFileChange} />
                <input name="title" type="text" value={title} onChange={handleTitleChange} placeholder="Enter title" />
                
                <input type="text" value={tagInput} onChange={handleInputChange} placeholder="Enter a tag" />
                <button type="button" onClick={handleAddTag}>Add Tag</button>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                <button type="submit">Upload</button>
            </form>
        */}
            <div style={{minHeight:"30px",display:"grid",placeItems:"center",marginTop:"30px",marginBottom:"0px"}}>
                <div style={{border:"1px solid black",width:"310px"}}></div>
                <div style={{position:"absolute",display:"flex",height:"50px",width:"400px"}}>
                    <div className='status_d'>
                        <div className={page===1?'status_o':'status_x'}></div>
                    </div>
                    <div className='status_d'>
                        <div className={page===2?'status_o':'status_x'}></div>
                    </div>
                    <div className='status_d'>
                        <div className={page===3?'status_o':'status_x'}></div>
                    </div>
                    <div className='status_d'>
                        <div className={page===4?'status_o':'status_x'}></div>
                    </div>
                </div>
            </div>
            <div style={{minHeight:"40px",display:"grid",placeItems:"center",marginTop:"0px"}}>
                <div style={{ display:"flex",height:"50px",width:"400px"}}>
                    <div className='status_d'>
                        <h4>video<br/>upload</h4>
                    </div>
                    <div className='status_d'>
                        <h4>video<br/>detail</h4>
                    </div>
                    <div className='status_d'>
                        <h4>upload<br/>schedule</h4>
                    </div>
                    <div className='status_d'>
                        <h3>review</h3>
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <button onClick={handlePrevClick} className={page===1?'btn_none' : ''}>{page===1?'' : 'Prev'}</button>
                <button onClick={handleNextClick} className={page===4?'btn_none' : ''}>{page===4?'' : 'Next'}</button>
            </div>
            {
                page === 1 && <>
                    <div style={{minHeight:"500px", backgroundColor:"#D9D9D9",display:"grid",placeItems:"center",borderRadius:"15px",marginBottom:"0px"}}>
                        <div>
                            <input ref={fileInputRef} name ="fileInput" accept="video/mp4"   type="file" onChange={handleFileChange} style={{display:"none"}} />
                            <button onClick={handleUploadClick} aria-label="Upload file" style={{width:"220px" ,height:"260px",backgroundColor:"transparent",cursor:"pointer"}}>
                                <img style={{width:"220px"}} src={videoicon}></img>
                                <h4 style={{marginTop:"0px"}}>Upload<br/>Video<br/>(Click me)</h4>
                            </button>
                        </div>
                    </div>
                    <h4 style={{color:"red",alignSelf:"flex-end"}}>{getFileErr()}</h4>
                </>
            }
            {
                page === 2 && <>
                    <input type='text' className='input-css' placeholder="Please enter a Title"></input>
                    <textarea className='input-css' placeholder="Please enter a Content" style={{minHeight:"300px",paddingTop:"10px"}}></textarea>
                    <input type='text' className='input-css' placeholder="Please enter a Tags ( Each tag is separated by # )"></input>
                </>
            }
            {
                page === 3 && <>
                    <h4>It will be uploaded at the time below</h4>
                    <input type='datetime-local' value={dateTime} className='input-css' placeholder="Please enter a Title"></input>
                </>
            }
            {
                page === 4 && <>
                </>
            }
        </div>
        
    );
}

export default RegisterVideo;
