import api from './axios';

// Public APIs
export const getPublishedTeamMembers = async () => {
  const response = await api.get('/team/public');
  return response.data;
};

// Admin APIs
export const getAllTeamMembers = async (params = {}) => {
  const response = await api.get('/team/admin', { params });
  return response.data;
};

export const getTeamMemberById = async (id) => {
  const response = await api.get(`/team/admin/${id}`);
  return response.data;
};

export const createTeamMember = async (formData) => {
  const response = await api.post('/team/admin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTeamMember = async (id, formData) => {
  const response = await api.put(`/team/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team/admin/${id}`);
  return response.data;
};

export const updateTeamMemberOrder = async (id, displayOrder) => {
  const response = await api.patch(`/team/admin/${id}/order`, { displayOrder });
  return response.data;
};
