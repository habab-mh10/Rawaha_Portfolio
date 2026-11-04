import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../../assets/images/logo.png';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/secret/admin/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) navigate('/secret/admin/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-md">

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <img src={Logo} alt="Logo" className="w-16 mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 mb-1">
            <AdminPanelSettingsIcon className="text-[var(--accent-primary)]" sx={{ fontSize: 28 }} />
            <h1 className="text-3xl font-bold text-text-primary">Admin Panel</h1>
          </div>
          <p className="text-text-secondary text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Card */}
        <div className="bg-card-bg shadow-soft border border-card p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                  <EmailOutlinedIcon sx={{ fontSize: 20 }} />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--bg-primary)] border border-card rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="ownerrawiporfolio@rawaha.me"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                  <LockOutlinedIcon sx={{ fontSize: 20 }} />
                </span>
                <input
                  type={showPwd ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 bg-[var(--bg-primary)] border border-card rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="••••••••"
                />
                {/* Show / hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd
                    ? <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                    : <VisibilityOutlinedIcon   sx={{ fontSize: 20 }} />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-accent-primary text-white font-semibold rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <AdminPanelSettingsIcon sx={{ fontSize: 18 }} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">
          © 2026 Muhammad Rawaha. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
