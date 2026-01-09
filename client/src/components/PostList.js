import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
          params: { sortBy, sortOrder }
        });
        setPosts(response.data);
      } catch (error) {
        console.log('Błąd podczas ładowania postów:', error);
      }
    };
    fetchPosts();
  }, [sortBy, sortOrder]);

  return (
    <div className="all-posts">
      <div className="posts-container">
        <div className="posts-header">
          <h1>Posty</h1>
          {currentUser && (
            <Link to="/create-post" className="button">
              Utwórz post
            </Link>
          )}
        </div>

        <div className="sort-options">
          <div className="form-group">
            <label htmlFor="sortBy" className="form-label">Sortuj wg:</label>
            <select
              id="sortBy"
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Data</option>
              <option value="title">Tytuł</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sortOrder" className="form-label">Kolejność:</label>
            <select
              id="sortOrder"
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Malejąco</option>
              <option value="asc">Rosnąco</option>
            </select>
          </div>
        </div>

        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} currentUser={currentUser} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts-message">
            <p>Brak postów.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;