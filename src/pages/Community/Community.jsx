import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await fetch('/api/post', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // 데이터 파싱
        console.log('API response:', result); // 데이터 구조 확인
        console.log(result.Array);
        // 배열인지 확인 후 상태 업데이트
        if (Array.isArray(result)) {
          setPosts(result);
        } else {
          console.error('게시글 배열이 예상대로 받지 못함:', result);
        }
      } catch (error) {
        console.error('게시글을 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 로딩 종료
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
        <Link to={'/WriteCommunity'} style={{ textDecoration: 'none', color: 'black' }}>
          <img src="https://png.pngtree.com/png-clipart/20211020/ourlarge/pngtree-red-pencil-clipart-png-image_3995136.png" width={'20px'} height={'20px'}/>
          post
        </Link>
      </div>
      <div style={communityBoxStyle}>
        {loading ? (
          <p>Loading Posts...</p>
        ) : (
          posts.length > 0 ? (
            posts.map(post => (
              <Link to={`/post/${post.postId}`} key={post.postId}>
                <Card
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  content={post.content}
                  likes={post.like}
                  tags={post.postTags}
                />
              </Link>
            ))
          ) : (
            <p>No posts to display.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Community;
