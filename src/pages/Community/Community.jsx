import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';

const Community = () => {
  const [posts, setPosts] = useState([]); // Store post data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          const errorResult = await response.json();
          console.error('Server responded with an error:', errorResult);
          throw new Error('Bad request');
        }
        const result = await response.json();
        // Adjust the handling based on the structure of your backend response
        if (Array.isArray(result)) {
          setPosts(result); // Assuming direct array if result is an array
        } else if (result.postList && Array.isArray(result.postList)) {
          setPosts(result.postList);
        } else {
          console.error('Expected array of posts but received:', result);
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
        <div className='heading'>Community</div>
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
              tags={post.tags} // Ensure that tags is passed as an array
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
