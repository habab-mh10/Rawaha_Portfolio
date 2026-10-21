import api from './axios';

// Public APIs
export const submitMessage = async (messageData) => {
  const response = await api.post('/messages/public', messageData);
  return response.data;
};

// Admin APIs
export const getAllMessages = async (params = {}) => {
  const response = await api.get('/messages/admin', { params });
  return response.data;
};

export const getMessageById = async (id) => {
  const response = await api.get(`/messages/admin/${id}`);
  return response.data;
};

export const toggleReadStatus = async (id, read) => {
  const response = await api.patch(`/messages/admin/${id}/read`, { read });
  return response.data;
};

export const markAsReplied = async (id, replyMessage) => {
  const response = await api.patch(`/messages/admin/${id}/reply`, { replyMessage });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/admin/${id}`);
  return response.data;
};

export const bulkDeleteMessages = async (messageIds) => {
  const response = await api.post('/messages/admin/bulk-delete', { messageIds });
  return response.data;
};

export const getMessageStats = async () => {
  const response = await api.get('/messages/admin/stats');
  return response.data;
};
