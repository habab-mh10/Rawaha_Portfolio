import axios from './axios';

// ========== Public APIs ==========

// Get all published pricing packages
export const getAllPackages = async () => {
  const response = await axios.get('/pricing');
  return response.data;
};

// Get single package by ID
export const getPackageById = async (id) => {
  const response = await axios.get(`/pricing/${id}`);
  return response.data;
};

// ========== Admin APIs ==========

// Get all packages (admin)
export const getAdminPackages = async () => {
  const response = await axios.get('/pricing/admin/all');
  return response.data;
};

// Create new package
export const createPackage = async (data) => {
  const response = await axios.post('/pricing/admin/create', data);
  return response.data;
};

// Update package
export const updatePackage = async (id, data) => {
  const response = await axios.put(`/pricing/admin/${id}`, data);
  return response.data;
};

// Delete package
export const deletePackage = async (id) => {
  const response = await axios.delete(`/pricing/admin/${id}`);
  return response.data;
};
