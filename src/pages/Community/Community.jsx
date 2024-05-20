import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts', { // 엔드포인트 경로 확인
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          const errorResult = await response.json();
          console.error('서버로부터 오류 응답:', errorResult);
          throw new Error('잘못된 요청');
        }
        const result = await response.json();
        if (result && Array.isArray(result)) { // 배열 직접 확인
          setPosts(result);
        } else {
          console.error('게시글 배열이 예상대로 받지 못함:', result);
        }
      } catch (error) {
        console.error('게시글을 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const communityBoxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  };

  return (
    <div className='community'>
      <div className='centerDiv'>
        <div className='heading'>Community</div>
      </div>
      <div className='write' style={{ marginLeft: '1000px' }}>
        <Link to={'/write-community'} style={{ textDecoration: 'none', color: 'black' }}>
          <img src="https://png.pngtree.com/png-clipart/20211020/ourlarge/pngtree-red-pencil-clipart-png-image_3995136.png" width={'20px'} height={'20px'}/>
          post
        </Link>
      </div>
      <div style={communityBoxStyle}>
        {posts.length > 0 ? (
          posts.map(post => (
            <Link to={`/post/${post.postId}`} key={post.postId}>
              <Card
                key={post.postId}
                postId={post.postId}
                title={post.title}
                content={post.content}
                likes={post.like} // 'like' 속성을 'likes'로 변경해야 할 수도 있음
                tags={post.postTags}
              />
            </Link>
          ))
        ) : (
          <p>Loading Posts...</p>
        )}
      </div>
    </div>
  );
};

export default Community;
