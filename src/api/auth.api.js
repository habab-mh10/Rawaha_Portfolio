import axios from './axios';

// Admin login
export const login = async (email, password) => {
  const response = await axios.post('/admin/auth/login', { email, password });
  return response.data;
};

// Admin logout
export const logout = async () => {
  const response = await axios.post('/admin/auth/logout');
  return response.data;
};

// Get current admin user
export const getMe = async () => {
  const response = await axios.get('/admin/auth/me');
  return response.data;
};

// Update password
export const updatePassword = async (currentPassword, newPassword) => {
  const response = await axios.put('/admin/auth/password', {
    currentPassword,
    newPassword,
  });
  return response.data;
};
