import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Hasła nie pasują do siebie');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, { username, password });
      alert('Zarejestrowano pomyślnie');
      navigate('/login');
    } catch (err) {
      console.log('Błąd podczas rejestracji:', err);
      if (err.response && err.response.status === 409) {
        setError('Użytkownik o tej nazwie już istnieje.');
      } else {
        setError('Rejestracja nie powiodła się. Spróbuj ponownie.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="register-card">
          <h2>Utwórz konto</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reg-username" className="form-label">Nazwa użytkownika:</label>
              <input
                id="reg-username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">Hasło:</label>
              <input
                id="reg-password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm-password" className="form-label">Potwierdź hasło:</label>
              <input
                id="reg-confirm-password"
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="buttons-container">
              <button type="submit" className="button register-button">
                Zarejestruj się
              </button>
            </div>
          </form>

          <div className="register-link-container">
            <Link to="/login" className="nav-link">Zaloguj się</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;