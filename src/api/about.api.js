import api from './axios';

// Public APIs
export const getPublicAboutProfile = async () => {
  const response = await api.get('/about/public');
  return response.data;
};

// Admin APIs
export const getAboutProfile = async () => {
  const response = await api.get('/about/admin');
  return response.data;
};

export const createOrUpdateAboutProfile = async (formData) => {
  const response = await api.post('/about/admin', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateAboutProfile = async (id, formData) => {
  const response = await api.put(`/about/admin/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProfilePicture = async (id) => {
  const response = await api.delete(`/about/admin/${id}/picture`);
  return response.data;
};

export const deleteLogo = async (id) => {
  const response = await api.delete(`/about/admin/${id}/logo`);
  return response.data;
};

export const deleteCV = async (id) => {
  const response = await api.delete(`/about/admin/${id}/cv`);
  return response.data;
};
