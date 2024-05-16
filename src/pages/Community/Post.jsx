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

    return (
        <div>
            {post ? (
                <article>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    {/* Display other post details as needed */}
                </article>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
};

export default Post;
