import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import PostCard from './PostCard';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const isOwnProfile = currentUser && currentUser.id === id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`);
        setUser(userResponse.data);

        const postsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
          params: { authorId: id }
        });
        setUserPosts(postsResponse.data || []);
      } catch (error) {
        console.log('Błąd podczas pobierania profilu użytkownika:', error);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="container">
          <div className="post-back-section">
            <Link to="/" className="button second-button">&larr; Powrót</Link>
          </div>
          <p>Użytkownik nie znaleziony.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="container">
        <div className="post-back-section">
            <Link to="/" className="button second-button">&larr; Powrót</Link>
        </div>
        <div className="user-profile-header">
          <h1>Profil użytkownika</h1>
        </div>

        <div className="user-profile-card">
          <h3>Informacje o profilu</h3>
          <div className="user-profile-info">
            <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
            <p><strong>Członek od:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="user-profile-posts-section">
          <h2>{isOwnProfile ? 'Twoje posty' : 'Posty tego użytkownika'}</h2>

          {userPosts.length === 0 ? (
            <p className="no-posts-message">{isOwnProfile ? 'Nie utworzyłeś jeszcze żadnych postów.' : 'Ten użytkownik nie utworzył jeszcze żadnych postów.'}</p>
          ) : (
            <div className="posts-grid">
              {userPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUser={currentUser}
                  showEditButton={isOwnProfile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;