import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout as authLogout } from '../utils/auth';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    authLogout();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="main-nav">
      <div className="nav-container">
        <Link to="/" className="logo">
          <h1>Blog</h1>
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-item">Strona główna</Link>
          {currentUser ? (
            <>
              <Link to={`/user/${currentUser.id}`} className="nav-item">{currentUser.username}</Link>
              <button
                onClick={handleLogout}
                className="nav-item"
              >
                Wyloguj się
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-item">Zarejestruj się</Link>
              <Link to="/login" className="nav-item">Zaloguj się</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;