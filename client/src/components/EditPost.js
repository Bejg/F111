import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    if (!user) {
      alert('Musisz być zalogowany, aby edytować ten post.');
      navigate('/login');
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
        const fetchedPost = response.data;

        if (fetchedPost.authorId !== user.id) {
          alert('Możesz edytować tylko swoje posty');
          navigate(`/posts/${id}`);
          return;
        }

        setPost(fetchedPost);
        setTitle(fetchedPost.title);
        setContent(fetchedPost.content);

      } catch (error) {
        console.log('Błąd podczas ładowania posta:', error);
        alert('Nie udało się załadować posta.');
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Musisz być zalogowany, aby edytować post.');
      return;
    }

    if (post?.authorId !== currentUser.id) {
      alert('Możesz edytować tylko swoje posty.');
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, { title, content, userId: currentUser.id });
      alert('Zaktualizowano post');
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log('Błąd podczas edycji posta:', error);
      alert('Nie udało się zaktualizować posta');
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="edit-post-container">
      <div className="container">
        <div className="post-back-section">
            <Link to="/" className="button second-button">&larr; Powrót</Link>
        </div>
        <div className="edit-post-card">
          <h2>Edytuj post: {post.title}</h2>
          <p>Autor: <Link to={`/user/${post.authorId}`}>{post.authorUsername}</Link></p>
          <form className="edit-post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Tytuł:</label>
              <input
                id="title"
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">Treść:</label>
              <textarea
                id="content"
                className="form-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="buttons-container">
              <button type="submit" className="button">
                Zaktualizuj post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;