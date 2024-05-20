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
        try {
            const response = await fetch(`/api/post/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment })
            });
            if (response.ok) {
                console.log('Comment added');
                setComment(''); // Clear the input after sending
            } else {
                throw new Error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="post-container">
            {post ? (
                <article>
                    <h1 className="post-title">{post.posttitle}</h1>
                    <p className="post-content">{post.postcontent}</p>
                    <div className="post-actions">
                        <button onClick={submitComment} className="btn edit">Edit</button>
                        <button onClick={submitComment} className="btn delete">Delete</button>
                        <button onClick={submitComment} className="btn like">Like</button>
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
