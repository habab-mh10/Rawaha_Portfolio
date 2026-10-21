import axios from './axios';

// ========== Public APIs ==========

// Submit new order
export const submitOrder = async (data) => {
  const response = await axios.post('/orders', data);
  return response.data;
};

// ========== Admin APIs ==========

// Get order statistics
export const getOrderStats = async () => {
  const response = await axios.get('/orders/admin/stats');
  return response.data;
};

// Get all orders
export const getOrders = async (params = {}) => {
  const response = await axios.get('/orders/admin/all', { params });
  return response.data;
};

// Get single order
export const getOrder = async (id) => {
  const response = await axios.get(`/orders/admin/${id}`);
  return response.data;
};

// Update order status
export const updateOrderStatus = async (id, status, adminNotes) => {
  const response = await axios.put(`/orders/admin/${id}/status`, {
    status,
    adminNotes,
  });
  return response.data;
};

// Update order
export const updateOrder = async (id, data) => {
  const response = await axios.put(`/orders/admin/${id}`, data);
  return response.data;
};

// Delete order
export const deleteOrder = async (id) => {
  const response = await axios.delete(`/orders/admin/${id}`);
  return response.data;
};
