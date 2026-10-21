import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const goToPublicSite = () => {
    navigate('/');
  };

  return (
    <header className="bg-card-bg border-b border-card shadow-sm h-20 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-[var(--bg-primary)] transition-colors"
      >
        <MenuIcon className="text-text-primary" />
      </button>

      {/* Center: Page Title (optional) */}
      <div className="hidden lg:block">
        <h1 className="text-xl font-semibold text-text-primary">Portfolio CMS</h1>
      </div>

      {/* Right: User Menu */}
      <div className="flex items-center gap-4">
        {/* View Public Site */}
        <button
          onClick={goToPublicSite}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--bg-primary)] hover:bg-accent-primary hover:text-white transition-colors text-text-secondary"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="hidden sm:inline">View Site</span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[var(--bg-primary)] transition-colors"
          >
            <AccountCircleIcon className="text-text-primary w-8 h-8" />
            <span className="hidden sm:inline text-text-primary font-medium">
              {user?.name || 'Admin'}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-card rounded-md shadow-lg z-20">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-card">
                    <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                    <p className="text-xs text-text-secondary">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-text-secondary hover:bg-[var(--bg-primary)] hover:text-text-primary transition-colors"
                  >
                    <LogoutIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
