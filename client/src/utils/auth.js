export const getCurrentUser = () => {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  return userId && username ? { id: userId, username } : null;
};

export const login = (userData) => {
  localStorage.setItem('userId', userData.id);
  localStorage.setItem('username', userData.username);
};

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  window.location.reload();
};