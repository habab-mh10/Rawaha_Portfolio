import axios from './axios';

// ========== Public APIs ==========

// Get all published projects
export const getProjects = async (params = {}) => {
  const response = await axios.get('/projects', { params });
  return response.data;
};

// Get single project by slug
export const getProjectBySlug = async (slug) => {
  const response = await axios.get(`/projects/${slug}`);
  return response.data;
};

// ========== Admin APIs ==========

// Get all projects (admin)
export const getAdminProjects = async (params = {}) => {
  const response = await axios.get('/projects/admin/all', { params });
  return response.data;
};

// Get single project by ID (admin)
export const getAdminProject = async (id) => {
  const response = await axios.get(`/projects/admin/${id}`);
  return response.data;
};

// Create new project
export const createProject = async (formData) => {
  const response = await axios.post('/projects/admin/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update project
export const updateProject = async (id, formData) => {
  const response = await axios.put(`/projects/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete project
export const deleteProject = async (id) => {
  const response = await axios.delete(`/projects/admin/${id}`);
  return response.data;
};

// Upload project images
export const uploadProjectImages = async (id, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await axios.post(`/projects/admin/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete project image
export const deleteProjectImage = async (projectId, imageId) => {
  const response = await axios.delete(`/projects/admin/${projectId}/images/${imageId}`);
  return response.data;
};

// Upload project video
export const uploadProjectVideo = async (id, file) => {
  const formData = new FormData();
  formData.append('video', file);

  const response = await axios.post(`/projects/admin/${id}/video`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete project video
export const deleteProjectVideo = async (id) => {
  const response = await axios.delete(`/projects/admin/${id}/video`);
  return response.data;
};

// Get project statistics
export const getProjectStats = async () => {
  const response = await axios.get('/projects/admin/stats');
  return response.data;
};
