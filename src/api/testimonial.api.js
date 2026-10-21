import api from './axios';

// Public APIs
export const getPublishedTestimonials = async (params = {}) => {
  const response = await api.get('/testimonials/public', { params });
  return response.data;
};

// Admin APIs
export const getAllTestimonials = async (params = {}) => {
  const response = await api.get('/testimonials/admin', { params });
  return response.data;
};

export const getTestimonialById = async (id) => {
  const response = await api.get(`/testimonials/admin/${id}`);
  return response.data;
};

export const createTestimonial = async (formData) => {
  const response = await api.post('/testimonials/admin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTestimonial = async (id, formData) => {
  const response = await api.put(`/testimonials/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/testimonials/admin/${id}`);
  return response.data;
};

export const updateTestimonialOrder = async (id, displayOrder) => {
  const response = await api.patch(`/testimonials/admin/${id}/order`, { displayOrder });
  return response.data;
};
