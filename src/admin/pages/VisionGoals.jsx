import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as visiongoalsAPI from '../../api/visiongoals.api';

const VisionGoals = () => {
  const [visionData, setVisionData] = useState({
    title: '',
    content: '',
    published: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch vision & goals data
  const fetchVisionGoals = async () => {
    try {
      setLoading(true);
      const response = await visiongoalsAPI.getAdminVisionGoals();
      if (response.success && response.data) {
        setVisionData(response.data);
      }
    } catch (error) {
      console.error('Error fetching vision & goals:', error);
      toast.error('Failed to fetch vision & goals data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisionGoals();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVisionData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!visionData.content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSubmitting(true);
    try {
      const response = await visiongoalsAPI.updateVisionGoals(visionData);
      if (response.success) {
        toast.success('Vision & Goals updated successfully');
        setVisionData(response.data);
      }
    } catch (error) {
      console.error('Error updating vision & goals:', error);
      toast.error(error.response?.data?.message || 'Failed to update vision & goals');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Vision & Goals Management</h1>
        <p className="text-gray-600">Manage the vision and goals section displayed on the About page.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              name="title"
              value={visionData.title}
              onChange={handleInputChange}
              placeholder="e.g., Our Goals and Vision"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={visionData.content}
              onChange={handleInputChange}
              required
              rows={8}
              placeholder="Write your goals and vision statement here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              This content will be displayed on the About page below the main about section.
            </p>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Published Status</h3>
              <p className="text-sm text-gray-500">
                {visionData.published 
                  ? 'This section is currently visible on your About page' 
                  : 'This section is currently hidden from your About page'
                }
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={visionData.published}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--accent-primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-primary)]"></div>
            </label>
          </div>

          {/* Preview */}
          {visionData.content && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                  {visionData.title || 'Our Goals and Vision'}
                </h2>
                <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                  {visionData.content}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting || !visionData.content.trim()}
              className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-medium hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {submitting ? 'Updating...' : 'Update Vision & Goals'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisionGoals;