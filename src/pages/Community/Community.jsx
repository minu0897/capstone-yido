import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState({}); // 객체 형태로 상태 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/video/community');
        const result = await response.json();
        if (result.posts && typeof result.posts === 'object' && !Array.isArray(result.posts)) { // 객체인지 확인
          setPosts(result.posts); // 객체 그대로 상태에 저장
        } else {
          console.error('Expected posts object but received:', result);
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
        {Object.keys(posts).length > 0 ? (
          Object.values(posts).map((post, index) => (
            <Card
              key={index}
              postId={post.postId} // postId는 객체 내부에 포함되어 있어야 합니다
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
