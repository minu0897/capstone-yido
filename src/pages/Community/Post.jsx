import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';

const Post = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${postId}`);
                if (!response.ok) throw new Error('Post could not be fetched');
                const data = await response.json();
                setPost(data);
                setComments(data.comments);
                setEditedTitle(data.postTitle);
                setEditedContent(data.postContent);
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
            parentCommentId: '', // 현재는 null로 설정, 필요에 따라 변경 가능
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
                const newComment = await response.json(); // Retrieve the added comment
                setComments([...comments, newComment]); // Update the comments state to include the new comment
                setComment(''); // 댓글 입력란 초기화
                console.log('Comment added');
            } else {
                const errorResponse = await response.json();
                throw new Error(`Failed to add comment: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const editPost = async () => {
        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postTitle: editedTitle, postContent: editedContent })
            });
            if (!response.ok) {
                throw new Error('Failed to edit post');
            }
            const updatedPost = await response.json();
            setPost(updatedPost);
            setEditMode(false);
            console.log('Post updated');
        } catch (error) {
            console.error('Error updating post:', error);
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
            {post ? (
                <article>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <button onClick={editPost} className="btn save">Save</button>
                        </>
                    ) : (
                        <>
                            <h1 className="post-title">{post.postTitle}</h1>
                            <p className="post-content">{post.postContent}</p>
                            <div className="post-actions">
                                <button onClick={() => setEditMode(true)} className="btn edit">Edit</button>
                                <button onClick={deletePost} className="btn delete">Delete</button>
                                <button onClick={submitComment} className="btn like">Like</button>
                            </div>
                        </>
                    )}
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
