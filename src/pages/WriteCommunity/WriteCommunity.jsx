import React, { useState } from "react";
import './WriteCommunity.css';

const WriteCommunity = ({videoId, videoName}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(''); // 태그를 일단 문자열로 입력 받음
    const [videoiD, setVideoiD] = useState(videoId); //비디오 아이디 넘겨주기

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value); // 입력된 전체 문자열을 저장
    const handleVideoidChange = (e) => setTags(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        const tagsArray = tags.split('#').map(tag => tag.trim()).filter(tag => tag !== ''); // 태그를 배열로 변환

        const formData = {
            title,
            content,
            tags: tagsArray // 이제 태그는 배열로 관리
        };

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // formData 전체를 JSON 문자열로 변환하여 전송
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            console.log(result); // 성공적으로 전송된 후의 처리

            // 필드 초기화
            setTitle('');
            setContent('');
            setTags('');
            alert('Post has been successfully submitted!');
        } catch (error) {
            console.error('게시글 제출에 실패했습니다:', error);
            alert('please try again after logging in');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div style={{minHeight:"40px", display:"grid", placeItems:"center", marginTop:"0px"}}>
                <h3>Write Post</h3>
                <input
                    type='text'
                    className='wr-input-css'
                    placeholder="Please enter a title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    className='wr-input-css'
                    placeholder="Please enter a content"
                    style={{minHeight:"300px", paddingTop:"10px"}}
                    value={content}
                    onChange={handleContentChange}
                />
                <input
                    type='text'
                    className='wr-input-css'
                    placeholder="Enter tags (each tag is separated by #) Example: #Tag1 #Tag2"
                    value={tags}
                    onChange={handleTagsChange}
                />
            </div>
            <div style={{placeItems:"center", display:"grid"}}>
            <div className="wr-input-css1" style={{marginLeft:'0px'}}>
            <div style={{ display: 'flex', width: '800px', height:'50px', backgroundColor:'white'}}>
            <button style={{fontSize: '16px', borderRadius: '15px', border:'1px solid gray', width:'150px'}} className="wr-button-css">
            add video URL
            </button>
            <div style={{ width: '20px' }} />
            <button style={{fontSize: '16px', borderRadius: '15px', border:'1px solid gray', width:'150px', marginRight:'50px' }}  className="wr-button-css">
            add timeline
            </button>
            <button type="submit" style={{ fontSize: '16px', borderRadius: '15px', border:'1px solid gray', width:'100px', marginLeft:'400px'}}  className="wr-button-css">
            POST
            </button>
            </div>
            </div>
            </div>
        </form>
        
      </div>
    );
};

export default WriteCommunity;
