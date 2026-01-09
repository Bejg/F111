import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.log('Błąd podczas ładowania posta:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!currentUser) {
      alert('Musisz być zalogowany, aby usunąć post');
      return;
    }

    if (post.authorId !== currentUser.id) {
      alert('Możesz usuwać tylko swoje posty');
      return;
    }

    if (window.confirm('Czy na pewno chcesz usunąć ten post?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
          data: { userId: currentUser.id }
        });
        alert('Post został usunięty');
        navigate('/');
      } catch (error) {
        console.log('Błąd podczas usuwania posta:', error);
        alert('Nie udało się usunąć posta.');
      }
    }
  };

  if (!post) {
    return null;
  }

  const isOwner = currentUser && post.authorId === currentUser.id;
  const authorName = post.authorUsername || 'Nieznany autor';

  return (
    <div className="post-detail-container">
      <div className="post-detail-box">
        <div className="post-back-section">
          <Link to="/" className="button second-button">&larr; Powrót</Link>
        </div>
        <div className="post-detail-content">
          <div className="post-detail-header">
            <h1>{post.title}</h1>
            {isOwner && (
              <div className="post-actions">
                <Link to={`/edit-post/${post._id}`} className="button">Edytuj</Link>
                <button
                  onClick={handleDelete}
                  className="button delete-button"
                >
                  Usuń
                </button>
              </div>
            )}
          </div>
          <div className="post-info">
            <span>
              Autor: {isOwner ? (
                <Link to={`/user/${currentUser.id}`}>Ty</Link>
              ) : (
                <Link to={`/user/${post.authorId}`}>{authorName}</Link>
              )}
            </span>
            <span>Utworzono: {new Date(post.createdAt).toLocaleDateString()}</span>
            <span>Zaktualizowano: {new Date(post.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="post-text">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;