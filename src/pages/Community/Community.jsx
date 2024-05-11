import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/community');
        const result = await response.json();
        if (result.posts && Array.isArray(result.posts)) { // 'posts' 키를 확인하고 배열인지 검사
          setPosts(result.posts); // 'posts' 배열을 상태에 저장
        } else {
          console.error('Expected posts array but received:', result);
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
