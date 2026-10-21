import api from './axios';

// Public APIs
export const getPublishedTechnologies = async (params = {}) => {
  const response = await api.get('/technologies/public', { params });
  return response.data;
};

// Admin APIs
export const getAllTechnologies = async (params = {}) => {
  const response = await api.get('/technologies/admin', { params });
  return response.data;
};

export const getTechnologyById = async (id) => {
  const response = await api.get(`/technologies/admin/${id}`);
  return response.data;
};

export const createTechnology = async (formData) => {
  const response = await api.post('/technologies/admin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTechnology = async (id, formData) => {
  const response = await api.put(`/technologies/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTechnology = async (id) => {
  const response = await api.delete(`/technologies/admin/${id}`);
  return response.data;
};

export const updateTechnologyOrder = async (id, displayOrder) => {
  const response = await api.patch(`/technologies/admin/${id}/order`, { displayOrder });
  return response.data;
};
