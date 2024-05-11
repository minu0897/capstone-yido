import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts'); // 백엔드 API 경로에서 데이터 가져오기
        const data = await response.json(); // 응답을 JSON 형태로 변환
        if (Array.isArray(data)) {  // 데이터가 배열인지 확인
          setPosts(data); // 상태에 데이터 설정
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error); // 오류 발생시 콘솔에 출력
      }
    };

    fetchData(); // 데이터 가져오기 함수 호출
  }, []); // 컴포넌트 마운트시 한 번만 실행

  const communityBoxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  };

  return (
    <div className='community'>
      <div className='centerDiv'>
        <div className='heading'>
          Community
        </div>
      </div>
      <div className='write' style={{ marginLeft: '1000px' }}>
        <Link to={'/WriteCommunity'} style={{ textDecoration: 'none', color: 'black' }}>
          <img src="https://png.pngtree.com/png-clipart/20211020/ourlarge/pngtree-red-pencil-clipart-png-image_3995136.png" width={'20px'} height={'20px'}/>
          Write
        </Link>
      </div>
      <div style={communityBoxStyle}>
        {posts.length > 0 ? (
          posts.map(post => (
            <Card
              key={post.postId}
              postId={post.postId}
              title={post.title}
              content={post.content}
              likes={post.likes}
              dislikes={post.dislikes}
            />
          ))
        ) : (
          <p>Loading posts...</p> // 로딩 메시지 표시
        )}
      </div>
    </div>
  );
};

export default Community;
