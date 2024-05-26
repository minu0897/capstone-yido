import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import {AuthContext} from '../Login/AuthContext';

const Post = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { currentUser } = useContext(AuthContext); // Assuming 'currentUser' contains the 'memberId'

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${postId}`);
                if (!response.ok) throw new Error('Post could not be fetched');
                const data = await response.json();
                setPost(data);
                setComments(data.comments);
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
            postId: postId,
            content: comment
        };

        try {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            });
            if (response.ok) {
                const newComment = await response.json();
                setComments(prevComments => [...prevComments, newComment]); // 새 댓글 추가
                setComment(''); // 입력란 초기화

                // 댓글 추가 후 0.2초 지연 시키고 강제 재렌더링
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            } else {
                const errorResponse = await response.json();
                throw new Error(`Failed to add comment: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const deletePost = async () => {
        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted');
            navigate('/Community'); // Redirect to the Community page after deleting the post
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="post-container">
            {console.log(post)};
            {post ? (
                <article>
                    <h1 className="post-title">{post.postTitle}</h1>
                    <p className='post-content'> by {post.postWriter}</p>
                    <p className="post-content">{post.postContent}</p>
                    <div className="post-tags">
                        {post.postTags && post.postTags.map((tag, index) => (
                            <span key={index} className="post-tag">#{tag}</span>
                        ))}
                    </div>
                    <div className="post-actions">
                        {/* Only show the delete button if the current user is the post's writer */}
                        {currentUser && currentUser.memberId === post.postWriter && (
                            <button onClick={deletePost} className="btn delete">Delete</button>
                        )}
                    </div>
                    <div className="comment-section">
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            className="comment-input"
                            placeholder="Write a comment..."
                        ></textarea>
                        <button onClick={submitComment} className="btn comment-btn">Post Comment</button>
                        <div className="comments-list">
                            {comments.map((c) => (
                                <div key={c.commentId} className="comment">
                                    <p className="comment-content">{c.commentContent}</p>
                                    <p className="comment-writer">By {c.commentWriter}</p>
                                    <div className="comment-stats">
                                        <span className="likes">{c.commentLike} Likes</span>
                                        <span className="dislikes">{c.commentDislike} Dislikes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            ) : (
                <p className="loading">Loading post...</p>
            )}
        </div>
    );
};

export default Post;
