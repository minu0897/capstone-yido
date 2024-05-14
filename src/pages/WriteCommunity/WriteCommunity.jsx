import React, { useState } from "react";
import './WriteCommunity.css';

const WriteCommunity = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(''); // 태그를 일단 문자열로 입력 받음

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value); // 입력된 전체 문자열을 저장

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
            alert('게시글이 성공적으로 제출되었습니다!');
        } catch (error) {
            console.error('게시글 제출에 실패했습니다:', error);
            alert('게시글을 제출하는데 실패했습니다.');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div style={{minHeight:"40px", display:"grid", placeItems:"center", marginTop:"0px"}}>
                <h3>글 작성하기</h3>
                <input
                    type='text'
                    className='wr-input-css'
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    className='wr-input-css'
                    placeholder="내용을 입력하세요"
                    style={{minHeight:"300px", paddingTop:"10px"}}
                    value={content}
                    onChange={handleContentChange}
                />
                <input
                    type='text'
                    className='wr-input-css'
                    placeholder="태그를 입력하세요 (각 태그는 #으로 구분됩니다) 예: #태그1 #태그2"
                    value={tags}
                    onChange={handleTagsChange}
                />
            </div>
            <div style={{placeItems:"center", display:"grid"}}>
            <div className="wr-input-css1" style={{marginLeft:'0px'}}>
            <div style={{ display: 'flex', width: '800px', height:'50px', backgroundColor:'white'}}>
            <button style={{fontSize: '16px', borderRadius: '15px', border:'1px solid gray', width:'100px'}} className="wr-button-css">
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
