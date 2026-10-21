import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../../api/team.api';

const Team = () => {
  const [members, setMembers]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editing, setEditing]       = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile]   = useState(null);
  const fileRef = useRef(null);

  const emptyForm = { name: '', role: '', bio: '' };
  const [form, setForm] = useState(emptyForm);

  /* ─── fetch ─── */
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await getAllTeamMembers();
      // response: { data: { teamMembers: [...] } } or { data: [...] }
      const list = res.data?.teamMembers ?? res.data ?? [];
      setMembers(list);
    } catch {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

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
    setEditing(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setPhotoPreview(null);
    setShowModal(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, bio: m.bio || '' });
    setPhotoFile(null);
    setPhotoPreview(m.profilePicture?.url || null);
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
    if (!form.name.trim() || !form.role.trim()) {
      toast.error('Name and profession are required');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name',      form.name.trim());
      fd.append('role',      form.role.trim());
      fd.append('bio',       form.bio.trim());
      fd.append('published', 'true');
      if (photoFile) fd.append('profilePicture', photoFile);

      if (editing) {
        await updateTeamMember(editing._id, fd);
        toast.success('Team member updated');
      } else {
        await createTeamMember(fd);
        toast.success('Team member added');
      }
      fetchMembers();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await deleteTeamMember(id);
      toast.success('Team member deleted');
      fetchMembers();
    } catch {
      toast.error('Failed to delete');
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
          <p className="text-gray-500 text-sm mt-1">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-5 py-2 rounded-lg transition-colors"
        >
          + Add Member
        </button>
      </div>

      {/* Cards grid */}
      {members.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-400 text-lg">No team members yet.</p>
          <p className="text-gray-400 text-sm mt-1">Click "+ Add Member" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  {m.profilePicture?.url
                    ? <img src={m.profilePicture.url} alt={m.name} className="w-full h-full object-cover" />
                    : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold bg-gradient-to-br from-[var(--accent-secondary)]/20 to-[var(--accent-primary)]/20">
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                    )
                  }
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{m.name}</p>
                  <p className="text-sm text-[var(--accent-primary)] truncate">{m.role}</p>
                </div>
              </div>

              {/* Bio */}
              {m.bio && (
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{m.bio}</p>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                <button
                  onClick={() => openEdit(m)}
                  className="flex-1 py-1.5 text-sm bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-lg hover:bg-[var(--accent-primary)]/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="flex-1 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {editing ? 'Edit Member' : 'Add Team Member'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Photo upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`cursor-pointer rounded-xl border-2 border-dashed transition-all group
                      ${photoPreview ? 'border-[var(--accent-primary)]' : 'border-gray-300 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5'}`}
                  >
                    {photoPreview ? (
                      <div className="relative">
                        <img src={photoPreview} alt="preview" className="w-full h-44 object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-lg">Click to change</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPhotoFile(null); setPhotoPreview(null); }}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                        >×</button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mb-2 group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                          <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">Upload profile photo</p>
                        <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInput}
                    required
                    placeholder="e.g. Muhammad Rawaha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                </div>

                {/* Profession / Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profession / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleInput}
                    required
                    placeholder="e.g. Full-Stack Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleInput}
                    rows={4}
                    placeholder="Brief description about this team member..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] resize-none"
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
                    {submitting ? 'Saving…' : editing ? 'Update' : 'Add Member'}
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

export default Team;
