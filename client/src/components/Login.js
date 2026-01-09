import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { username, password });
      authLogin(response.data.user);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log('Błąd logowania:', error);
      if (error.response && error.response.status === 401) {
        setError('Błędna nazwa użytkownika lub hasło.');
      } else {
        setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="login-card">
          <h2>Zaloguj się na swoje konto</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Nazwa użytkownika:</label>
              <input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Hasło:</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="buttons-container">
              <button type="submit" className="button login-button">
                Zaloguj się
              </button>
            </div>
          </form>

          <div className="login-link-container">
            <Link to="/register" className="nav-link">Zarejestruj się</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;