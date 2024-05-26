import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import './WriteCommunity.css';

const WriteCommunity = ({ videoId, videoName }) => {
    const navigate = useNavigate(); // navigate 함수 사용을 위한 훅 호출
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        const tagsArray = tags.split('#').map(tag => tag.trim()).filter(tag => tag !== '');
        const formData = {
            title,
            content,
            tags: tagsArray
        };

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            console.log(result); // 성공적으로 전송된 후의 처리

            // 폼 제출 후 커뮤니티 페이지로 리디렉션
            navigate('/Community'); 

            // 필드 초기화
            setTitle('');
            setContent('');
            setTags('');
            alert('Post has been successfully submitted!');
        } catch (error) {
            console.error('게시글 제출에 실패했습니다:', error);
            alert('Please try again after logging in');
            navigate('/Login');
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
                        required
                    />
                    <textarea
                        className='wr-input-css'
                        placeholder="Please enter a content"
                        style={{minHeight:"300px", paddingTop:"10px"}}
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                    <input
                        type='text'
                        className='wr-input-css'
                        placeholder="Enter tags (each tag is separated by #) Example: #Tag1 #Tag2"
                        value={tags}
                        onChange={handleTagsChange}
                        required
                    />
                </div>
                <div className="center-button">
            <button type="submit" className="wr-button-css">
                POST
            </button>
            </div>
            </form>
        </div>
    );
};

export default WriteCommunity;
