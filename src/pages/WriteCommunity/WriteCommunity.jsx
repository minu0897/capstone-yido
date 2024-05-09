import React, { useState } from "react";
import './WriteCommunity.css';

const WriteCommunity = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();  // 폼 제출 시 페이지 리로드 방지

        const formData = {
            title,
            content,
            tags
        };

        try {
            const response = await fetch('YOUR_BACKEND_URL/api/posts', {  // 백엔드 URL로 적절히 변경
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
            console.log(result); // 성공적으로 전송된 후의 처리를 추가할 수 있습니다.

            // 필드 초기화
            setTitle('');
            setContent('');
            setTags('');
            alert('Post submitted successfully!');
        } catch (error) {
            console.error('Failed to submit the post:', error);
            alert('Failed to submit the post.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div  style={{minHeight:"40px", display:"grid", placeItems:"center", marginTop:"0px"}}>
                <h3>Write</h3>
                <input
                    type='text'
                    className='input-css'
                    placeholder="Please enter a Title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    className='input-css'
                    placeholder="Please enter a Content"
                    style={{minHeight:"300px", paddingTop:"10px"}}
                    value={content}
                    onChange={handleContentChange}
                />
                <input
                    type='text'
                    className='input-css'
                    placeholder="Please enter a Tags (Each tag is separated by #) Ex #Tag #Yido"
                    value={tags}
                    onChange={handleTagsChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default WriteCommunity;
