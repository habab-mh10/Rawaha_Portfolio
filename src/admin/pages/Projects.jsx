import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as projectAPI from '../../api/project.api';

const Projects = () => {
  const [projects, setProjects]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [showModal, setShowModal]       = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting]     = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    technologies: '',
    liveUrl: '',
    featured:  false,
    published: true,
  });

  const [mediaFile, setMediaFile]       = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType]       = useState(null); // 'image' | 'video'
  const fileInputRef                    = useRef(null);

  /* ─── fetch ─── */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAdminProjects();
      setProjects(response.data || []);
    } catch {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  /* ─── handlers ─── */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMediaFile(file);
    setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
    const reader = new FileReader();
    reader.onloadend = () => setMediaPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile && !editingProject) {
      toast.error('Please upload an image or video');
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('title',       formData.title);
      data.append('description', formData.description);
      data.append('category',    formData.category);
      data.append('liveUrl',     formData.liveUrl || '');
      data.append('featured',    formData.featured  ? 'true' : 'false');
      data.append('published',   formData.published ? 'true' : 'false');
      if (formData.technologies) {
        formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
          .forEach(t => data.append('technologies[]', t));
      }
      if (mediaFile) {
        data.append(mediaType === 'image' ? 'images' : 'video', mediaFile);
      }

      if (editingProject) {
        await projectAPI.updateProject(editingProject._id, data);
        toast.success('Project updated');
      } else {
        await projectAPI.createProject(data);
        toast.success('Project created');
      }
      fetchProjects();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title:        project.title,
      description:  project.description,
      category:     project.category,
      technologies: project.technologies?.join(', ') || '',
      liveUrl:      project.liveUrl || '',
      featured:     project.featured  ?? false,
      published:    project.published ?? true,
    });
    setMediaFile(null);
    if (project.images?.[0]?.url) {
      setMediaPreview(project.images[0].url);
      setMediaType('image');
    } else if (project.video?.url) {
      setMediaPreview(project.video.url);
      setMediaType('video');
    } else {
      setMediaPreview(null);
      setMediaType(null);
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await projectAPI.deleteProject(id);
      toast.success('Project deleted');
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
    setFormData({ title: '', description: '', category: '', technologies: '', liveUrl: '', featured: false, published: true });
  };

  /* ─── render ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-5 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          + Add Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {['Image', 'Title', 'Category', 'Featured', 'Published', 'Live URL', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-10 text-center text-gray-400">
                    No projects yet. Click "+ Add Project" to create one.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 whitespace-nowrap">
                      {project.images?.[0]?.url
                        ? <img src={project.images[0].url} alt={project.title} className="h-11 w-11 object-cover rounded-lg flex-shrink-0" />
                        : <div className="h-11 w-11 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                      }
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-gray-900 max-w-[160px] truncate">{project.title}</p>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                        {project.category}
                      </span>
                    </td>
                    {/* Featured badge */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      {project.featured
                        ? <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">⭐ Featured</span>
                        : <span className="text-gray-300 text-xs">—</span>
                      }
                    </td>
                    {/* Published badge */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      {project.published
                        ? <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Live</span>
                        : <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">Draft</span>
                      }
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {project.liveUrl
                        ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--accent-primary)] hover:underline text-sm truncate max-w-[140px] block">View ↗</a>
                        : <span className="text-gray-400 text-xs">—</span>
                      }
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <button onClick={() => handleEdit(project)} className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] text-sm mr-3">Edit</button>
                      <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Modal header */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* ── Upload zone ── */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image or Video {!editingProject && <span className="text-red-500">*</span>}
                    {editingProject && <span className="text-gray-400 font-normal ml-1">(leave empty to keep current)</span>}
                  </label>

                  {/* Drop zone / button */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        const syntheticEvent = { target: { files: [file] } };
                        handleMediaChange(syntheticEvent);
                      }
                    }}
                    className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 group
                      ${mediaPreview
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                        : 'border-gray-300 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 bg-gray-50'
                      }`}
                  >
                    {mediaPreview ? (
                      /* Preview */
                      <div className="relative">
                        {mediaType === 'image'
                          ? <img src={mediaPreview} alt="preview" className="w-full h-52 object-cover rounded-xl" />
                          : <video src={mediaPreview} className="w-full h-52 rounded-xl object-cover" />
                        }
                        {/* Overlay change button */}
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-lg">
                            Click to change
                          </span>
                        </div>
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setMediaFile(null); setMediaPreview(null); setMediaType(null); }}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      /* Empty state */
                      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                        {/* Plus icon */}
                        <div className="w-14 h-14 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                          <svg className="w-7 h-7 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">Click to upload image or video</p>
                        <p className="text-xs text-gray-400 mt-1">or drag & drop here</p>
                        <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF, MP4, MOV up to 50MB</p>
                      </div>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="E.g., E-Commerce Platform"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Describe your project..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  >
                    <option value="">Select category…</option>
                    <option value="Web Application">Web Application</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="API">API</option>
                    <option value="ADS & Graphic Designing">ADS & Graphic Designing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Live URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL {formData.category === 'ADS & Graphic Designing' ? 
                      <span className="text-gray-400 font-normal">(optional - opens in portfolio)</span> : 
                      <span className="text-red-500">*</span>
                    }
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    required={formData.category !== 'ADS & Graphic Designing'}
                    placeholder={formData.category === 'ADS & Graphic Designing' ? 
                      "Optional - leave empty to open in portfolio" : 
                      "https://your-project.com"
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                  {formData.category === 'ADS & Graphic Designing' && (
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Leave empty to display this project in a lightbox within your portfolio instead of linking to an external site
                    </p>
                  )}
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                  <p className="text-xs text-gray-400 mt-1">Separate with commas</p>
                </div>

                {/* ── Featured & Published toggles ── */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  {/* Featured */}
                  <label
                    className={`flex-1 flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 select-none ${
                      formData.featured
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-xl leading-none">{formData.featured ? '⭐' : '☆'}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Featured</p>
                      <p className="text-xs text-gray-500 leading-tight">Shows on homepage (max 3)</p>
                    </div>
                    {/* toggle pill */}
                    <div className={`ml-auto w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${formData.featured ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${formData.featured ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </label>

                  {/* Published */}
                  <label
                    className={`flex-1 flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 select-none ${
                      formData.published
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-xl leading-none">{formData.published ? '🟢' : '⚪'}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Published</p>
                      <p className="text-xs text-gray-500 leading-tight">Visible on portfolio</p>
                    </div>
                    {/* toggle pill */}
                    <div className={`ml-auto w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${formData.published ? 'bg-green-400' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${formData.published ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </label>
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-sm bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-colors"
                  >
                    {submitting ? 'Saving…' : editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
