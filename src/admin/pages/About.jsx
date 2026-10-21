import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getAboutProfile,
  createOrUpdateAboutProfile,
  updateAboutProfile,
  deleteProfilePicture,
  deleteLogo,
  deleteCV,
} from '../../api/about.api';

/* ── tiny reusable upload card ── */
const AssetCard = ({ label, hint, accept, currentUrl, currentName, onFile, onDelete, deleting }) => {
  const inputRef = useRef(null);
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{hint}</p>
        </div>
        {currentUrl && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
            title="Remove"
          >
            <DeleteIcon fontSize="small" />
          </button>
        )}
      </div>

      {/* Preview */}
      {currentUrl && (
        <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center p-2">
          {accept.includes('pdf') ? (
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--accent-primary)] underline break-all"
            >
              {currentName || 'View current CV ↗'}
            </a>
          ) : (
            <img src={currentUrl} alt={label} className="max-h-28 object-contain" />
          )}
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-gray-300 hover:border-[var(--accent-primary)] text-gray-500 hover:text-[var(--accent-primary)] rounded-lg text-sm transition-all duration-200"
      >
        <CloudUploadIcon fontSize="small" />
        {currentUrl ? 'Replace' : 'Upload'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
    </div>
  );
};

/* ── main admin About page ── */
const About = () => {
  const [profile, setProfile]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting]     = useState('');  // 'picture'|'logo'|'cv'|''

  // new file selections (not yet uploaded)
  const [newLogo,    setNewLogo]    = useState(null);
  const [newCV,      setNewCV]      = useState(null);
  const [newPicture, setNewPicture] = useState(null);

  // form text fields
  const [form, setForm] = useState({
    name: '', headline: '', phone: '', email: '', biography: '',
    skills: '', whatsapp: '', linkedin: '', github: '', instagram: '',
  });

  /* ── fetch ── */
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getAboutProfile();
      if (res.success && res.data) {
        const d = res.data;
        setProfile(d);
        setForm({
          name:      d.name      || '',
          headline:  d.headline  || '',
          phone:     d.phone     || '',
          email:     d.email     || '',
          biography: d.biography || '',
          skills:    (d.skills || []).join(', '),
          whatsapp:  d.socialLinks?.whatsapp  || '',
          linkedin:  d.socialLinks?.linkedin  || '',
          github:    d.socialLinks?.github    || '',
          instagram: d.socialLinks?.instagram || '',
        });
      }
    } catch {
      // no profile yet — fresh create
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── save ── */
  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name',      form.name);
      fd.append('headline',  form.headline);
      fd.append('phone',     form.phone);
      fd.append('email',     form.email);
      fd.append('biography', form.biography);

      // skills as JSON array
      const skillsArr = form.skills.split(',').map(s => s.trim()).filter(Boolean);
      fd.append('skills', JSON.stringify(skillsArr));

      // social links as JSON
      fd.append('socialLinks', JSON.stringify({
        whatsapp:  form.whatsapp,
        linkedin:  form.linkedin,
        github:    form.github,
        instagram: form.instagram,
      }));

      // files — only append if user picked a new one
      if (newPicture) fd.append('profilePicture', newPicture);
      if (newLogo)    fd.append('logo',           newLogo);
      if (newCV)      fd.append('cv',             newCV);

      let res;
      if (profile?._id) {
        res = await updateAboutProfile(profile._id, fd);
      } else {
        res = await createOrUpdateAboutProfile(fd);
      }

      if (res.success) {
        toast.success('Profile saved successfully');
        setNewLogo(null); setNewCV(null); setNewPicture(null);
        await fetchProfile();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── individual asset delete helpers ── */
  const handleDeletePicture = async () => {
    if (!profile?._id) return;
    setDeleting('picture');
    try {
      await deleteProfilePicture(profile._id);
      toast.success('Profile picture removed');
      await fetchProfile();
    } catch { toast.error('Failed to remove picture'); }
    finally { setDeleting(''); }
  };

  const handleDeleteLogo = async () => {
    if (!profile?._id) return;
    setDeleting('logo');
    try {
      await deleteLogo(profile._id);
      toast.success('Logo removed');
      await fetchProfile();
    } catch { toast.error('Failed to remove logo'); }
    finally { setDeleting(''); }
  };

  const handleDeleteCV = async () => {
    if (!profile?._id) return;
    setDeleting('cv');
    try {
      await deleteCV(profile._id);
      toast.success('CV removed');
      await fetchProfile();
    } catch { toast.error('Failed to remove CV'); }
    finally { setDeleting(''); }
  };

  /* ── local preview URLs ── */
  const logoPreview    = newLogo    ? URL.createObjectURL(newLogo)    : profile?.logo?.url;
  const cvPreview      = newCV      ? URL.createObjectURL(newCV)      : profile?.cv?.url;
  const picturePreview = newPicture ? URL.createObjectURL(newPicture) : profile?.profilePicture?.url;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]" />
    </div>
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">About Me Editor</h1>
        <p className="text-gray-500 text-sm">
          Manage your profile, upload your Logo and CV — they will be served from Cloudinary.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* ── Brand Assets ── */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Brand Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <AssetCard
              label="Website Logo"
              hint="PNG / SVG recommended"
              accept="image/*"
              currentUrl={logoPreview}
              onFile={setNewLogo}
              onDelete={handleDeleteLogo}
              deleting={deleting === 'logo'}
            />
            <AssetCard
              label="CV / Resume"
              hint="PDF only, max 20 MB"
              accept="application/pdf,.pdf"
              currentUrl={cvPreview}
              currentName={newCV?.name || 'View current CV ↗'}
              onFile={setNewCV}
              onDelete={handleDeleteCV}
              deleting={deleting === 'cv'}
            />
            <AssetCard
              label="Profile Picture"
              hint="JPG / PNG recommended"
              accept="image/*"
              currentUrl={picturePreview}
              onFile={setNewPicture}
              onDelete={handleDeletePicture}
              deleting={deleting === 'picture'}
            />
          </div>
        </section>

        {/* ── Profile Info ── */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'name',      label: 'Full Name',  required: true  },
              { name: 'headline',  label: 'Headline'                     },
              { name: 'phone',     label: 'Phone'                        },
              { name: 'email',     label: 'Email',      type: 'email'    },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={f.type || 'text'}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  required={f.required}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
            <textarea
              name="biography"
              value={form.biography}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] resize-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills <span className="font-normal text-gray-400">(comma-separated)</span>
            </label>
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              rows={3}
              placeholder="React, Node.js, MongoDB, GSAP…"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] resize-none"
            />
          </div>
        </section>

        {/* ── Social Links ── */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'whatsapp',  label: 'WhatsApp URL'  },
              { name: 'linkedin',  label: 'LinkedIn URL'  },
              { name: 'github',    label: 'GitHub URL'    },
              { name: 'instagram', label: 'Instagram URL' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type="url"
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder="https://…"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Save button ── */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-colors duration-200"
          >
            {submitting ? 'Saving…' : profile?._id ? 'Update Profile' : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default About;
