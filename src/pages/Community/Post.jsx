import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

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

    // Dummy function placeholders
    const handleDelete = () => console.log("Delete post");
    const handleEdit = () => console.log("Edit post");
    const handleLike = () => console.log("Like post");

    return (
        <div className="post-container">
            {post ? (
                <article>
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-content">{post.content}</p>
                    <div className="post-actions">
                        <button onClick={handleEdit} className="btn edit">Edit</button>
                        <button onClick={handleDelete} className="btn delete">Delete</button>
                        <button onClick={handleLike} className="btn like">Like</button>
                    </div>
                </article>
            ) : (
                <p className="loading">Loading post...</p>
            )}
        </div>
    );
};

export default Post;
