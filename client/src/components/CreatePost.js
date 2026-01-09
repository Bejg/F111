import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Zaloguj się aby tworzyć posty');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, {
        title,
        content,
        authorId: currentUser.id
      });
      alert('Dodano post');
      navigate('/');
    } catch (error) {
      console.log('Błąd tworzenia posta:', error);
      alert('Nie udało się utworzyć wpisu.');
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <div className="post-back-section">
            <Link to="/" className="button second-button">&larr; Powrót</Link>
        </div>
        <div className="create-post-card">
          <h2>Utwórz nowy post</h2>
          <form className="create-post-form" onSubmit={handleSubmit}>
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
                Utwórz post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;