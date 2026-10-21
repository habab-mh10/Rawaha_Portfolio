import api from './axios';

// Public APIs
export const getPublishedServices = async () => {
  const response = await api.get('/services/public');
  return response.data;
};

// Admin APIs
export const getAllServices = async (params = {}) => {
  const response = await api.get('/services/admin', { params });
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await api.get(`/services/admin/${id}`);
  return response.data;
};

export const createService = async (formData) => {
  const response = await api.post('/services/admin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateService = async (id, formData) => {
  const response = await api.put(`/services/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/admin/${id}`);
  return response.data;
};

export const updateServiceOrder = async (id, displayOrder) => {
  const response = await api.patch(`/services/admin/${id}/order`, { displayOrder });
  return response.data;
};
