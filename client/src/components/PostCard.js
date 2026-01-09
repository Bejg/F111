import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostCard.css';

const PostCard = ({ post, currentUser, showEditButton = false }) => {
  const isOwnPost = currentUser && post.authorId === currentUser.id;

  const getAuthorName = () => {
    if (isOwnPost) {
      return 'Ty';
    }
    return post.authorUsername || 'Nieznany autor';
  };

  const authorLink = isOwnPost ? `/user/${currentUser.id}` : `/user/${post.authorId}`;

  return (
    <div className={`post-card ${isOwnPost ? 'own-post' : ''}`}>
      <h3 className="post-title">
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <div className="post-details">
        <span>Autor: <Link to={authorLink}>{getAuthorName()}</Link></span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="post-excerpt">
        {post.content.substring(0, 120)}{post.content.length > 120 ? '...' : ''}
      </p>
    </div>
  );
};

export default PostCard;