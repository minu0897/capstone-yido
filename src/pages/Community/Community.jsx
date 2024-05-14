import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/video/community', {
          method: 'GET', // 서버 문서에 따라 메소드 확인
          headers: {
            'Content-Type': 'application/json', // 필요한 경우
          }
        });
        if (!response.ok) {
          // 서버에서 정상적인 응답을 받지 못한 경우 에러 로깅
          const errorResult = await response.json(); // 에러 메시지 파싱
          console.error('Server responded with an error:', errorResult);
          throw new Error('Bad request'); // 적절한 에러 처리
        }
        const result = await response.json();
        if (result.postList && Array.isArray(result.postList)) {
          setPosts(result.postList);
        } else {
          console.error('Expected postList array but received:', result);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

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
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
};

export default Community;
