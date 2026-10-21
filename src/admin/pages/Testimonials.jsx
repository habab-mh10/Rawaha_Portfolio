import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../api/testimonial.api';

const MAX_TESTIMONIALS = 5;

const Testimonials = () => {
  const [testimonials, setTestimonials]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [showModal, setShowModal]         = useState(false);
  const [editing, setEditing]             = useState(null);
  const [submitting, setSubmitting]       = useState(false);
  const [photoPreview, setPhotoPreview]   = useState(null);
  const [photoFile, setPhotoFile]         = useState(null);

  const emptyForm = { clientName: '', testimonial: '', designation: '' };
  const [form, setForm] = useState(emptyForm);

  /* ─── fetch ─── */
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getAllTestimonials();
      // response shape: { data: { testimonials: [...] } }
      setTestimonials(res.data?.testimonials ?? res.data ?? []);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  /* ─── handlers ─── */
  const handleInput = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    if (testimonials.length >= MAX_TESTIMONIALS) {
      toast.error('Maximum 5 testimonials reached. Delete one to add a new one.');
      return;
    }
    setEditing(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setPhotoPreview(null);
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      clientName:  t.clientName,
      testimonial: t.testimonial,
      designation: t.designation || '',
    });
    setPhotoFile(null);
    setPhotoPreview(t.clientPhoto?.url || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim() || !form.testimonial.trim()) {
      toast.error('Name and feedback are required');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('clientName',  form.clientName.trim());
      fd.append('testimonial', form.testimonial.trim());
      fd.append('designation', form.designation.trim());
      if (photoFile) fd.append('clientPhoto', photoFile);

      if (editing) {
        await updateTestimonial(editing._id, fd);
        toast.success('Testimonial updated');
      } else {
        await createTestimonial(fd);
        toast.success('Testimonial added');
      }
      fetchTestimonials();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch {
      toast.error('Failed to delete testimonial');
    }
  };

  /* ─── render ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]" />
      </div>
    );
  }

  const slots = MAX_TESTIMONIALS - testimonials.length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {testimonials.length}/{MAX_TESTIMONIALS} used —&nbsp;
            {slots > 0
              ? `${slots} slot${slots > 1 ? 's' : ''} remaining`
              : <span className="text-red-500 font-medium">Limit reached</span>}
          </p>
        </div>
        <button
          onClick={openAdd}
          disabled={testimonials.length >= MAX_TESTIMONIALS}
          className="bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Slot indicator */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: MAX_TESTIMONIALS }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-all ${
              i < testimonials.length ? 'bg-[var(--accent-primary)]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Cards */}
      {testimonials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-400 text-lg">No testimonials yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "Add Testimonial" to create the first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
              {/* Avatar + info */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  {t.clientPhoto?.url
                    ? <img src={t.clientPhoto.url} alt={t.clientName} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                        {t.clientName.charAt(0).toUpperCase()}
                      </div>
                  }
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{t.clientName}</p>
                  <p className="text-sm text-gray-500 truncate">{t.designation || '—'}</p>
                </div>
              </div>

              {/* Feedback */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">"{t.testimonial}"</p>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
                <button
                  onClick={() => openEdit(t)}
                  className="flex-1 py-1.5 text-sm bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded hover:bg-[var(--accent-primary)]/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="flex-1 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                {editing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Photo upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      {photoPreview
                        ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">👤</div>
                      }
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="flex-1 text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--accent-primary)]/10 file:text-[var(--accent-primary)] hover:file:bg-[var(--accent-primary)]/20"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={form.clientName}
                    onChange={handleInput}
                    required
                    placeholder="e.g. Sarah Johnson"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-sm"
                  />
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profession / Title
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleInput}
                    placeholder="e.g. CEO, TechStart Inc"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-sm"
                  />
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="testimonial"
                    value={form.testimonial}
                    onChange={handleInput}
                    required
                    rows={5}
                    placeholder="What did the client say about your work?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-sm resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-sm bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50"
                  >
                    {submitting ? 'Saving…' : editing ? 'Update' : 'Add'}
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

export default Testimonials;
