import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Community.css';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';

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

        // 'postSimpleResponses' 배열을 확인 후 상태 업데이트
        if (result.postSimpleResponses && Array.isArray(result.postSimpleResponses)) {
          setPosts(result.postSimpleResponses);
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
    justifyContent: 'center', // Keeps items centered
    flexWrap: 'wrap', // Allows multiple lines
    gap: '10px', // Space between items
    margin: '0 auto', // Centers the container
    maxWidth: '1368px', // Adjust based on the sum of all items' widths in a row
  };

  return (
    <div className='community'>
      <div className='write' style={{  marginBottom: '20px'}}>
        <div style={{height:"40px",backgroundColor:"#F4F4F4",width:"100px",marginLeft:"auto",borderRadius:"10px",color:"black",display:"flex",alignItems:"center"}}>
          <FontAwesomeIcon icon={faPen} style={{ height: "20px", color: "#4C4C4C", marginRight:"5px",marginLeft:"15px" }} />
          Write
        </div>
      </div>

      <div style={communityBoxStyle}>
        {loading ? (
          <p>Loading Posts...</p>
        ) : (
          posts.length > 0 ? (
            posts.map(post => (
              <Link to={`/api/post/${post.postId}`} key={post.postId} style={{ textDecoration: 'none' }}>
                <Card
                  {...(post.videoId ? { videoId: post.videoId } : {})}
                  title={post.title}
                  content={post.content}
                  likes={post.like}
                  tags={post.postTags}
                  writer={post.postWriter}
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
