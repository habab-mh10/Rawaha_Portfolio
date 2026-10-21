import api from './axios';

// Public APIs
export const getPublicVisionGoals = async () => {
  const response = await api.get('/visiongoals/public');
  return response.data;
};

// Admin APIs
export const getAdminVisionGoals = async () => {
  const response = await api.get('/visiongoals/admin');
  return response.data;
};

export const updateVisionGoals = async (data) => {
  const response = await api.put('/visiongoals/admin', data);
  return response.data;
};