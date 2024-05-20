import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${postId}`);
                if (!response.ok) throw new Error('Post could not be fetched');
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async () => {
        const commentData = {
            postId: postId, // URL에서 가져온 postId 사용
            parentCommentId: null, // 현재는 null로 설정, 필요에 따라 변경 가능
            content: comment // 사용자가 입력한 댓글 내용
        };
    
        try {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData) // 전송할 데이터를 JSON 문자열로 변환
            });
            if (response.ok) {
                console.log('Comment added');
                setComment(''); // 댓글 입력란 초기화
            } else {
                const errorResponse = await response.json();
                throw new Error(`Failed to add comment: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="post-container">
            {post ? (
                <article>
                    <h1 className="post-title">{post.postTitle}</h1>
                    <p className="post-content">{post.postContent}</p>
                    <div className="post-actions">
                        <button onClick={submitComment} className="btn edit">Edit</button>
                        <button onClick={submitComment} className="btn delete">Delete</button>
                        <button onClick={submitComment} className="btn like">Like</button>
                        {postId}
                    </div>
                    <div className="comment-section">
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            className="comment-input"
                            placeholder="Write a comment..."
                        ></textarea>
                        <button onClick={submitComment} className="btn comment-btn">Post Comment</button>
                    </div>
                </article>
            ) : (
                <p className="loading">Loading post...</p>
            )}
        </div>
    );
};

export default Post;
