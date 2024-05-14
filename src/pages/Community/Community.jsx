import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/video/community');
        const result = await response.json();
        if (response.ok) {
          if (result.postList && Array.isArray(result.postList)) { // 'postList'가 배열인지 확인
            setPosts(result.postList); // 'postList' 배열을 상태에 저장
          } else {
            console.error('Expected postList array but received:', result);
          }
        } else {
          console.error('Server responded with an error:', result);
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
