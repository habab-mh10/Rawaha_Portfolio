import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../../assets/images/logo.png';

// Cloudinary logo as fallback
const CLOUDINARY_LOGO = 'https://res.cloudinary.com/myownportfolio/image/upload/v1791620211/portfolio/brand/logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard',    path: '/admin/dashboard',    icon: DashboardIcon },
    { name: 'Projects',     path: '/admin/projects',     icon: WorkIcon },
    { name: 'Pricing',      path: '/admin/pricing',      icon: DesignServicesIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: StarIcon },
    { name: 'Messages',     path: '/admin/messages',     icon: MessageIcon },
    { name: 'Orders',       path: '/admin/orders',       icon: ShoppingCartIcon },
    { name: 'Technologies', path: '/admin/technologies', icon: CodeIcon },
    { name: 'About Me',     path: '/admin/about',        icon: InfoIcon },
    { name: 'Team',         path: '/admin/team',         icon: GroupIcon },
    { name: 'Homepage',     path: '/admin/homepage',     icon: HomeIcon },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-card-bg border-r border-card shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-card flex-shrink-0 px-4">
          <img src={Logo} alt="Logo" className="w-10 h-10 object-contain flex-shrink-0" onError={(e) => { e.target.src = CLOUDINARY_LOGO; }} />
          <span className="ml-2 text-lg font-bold text-text-primary truncate">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-md transition-colors ${
                      isActive
                        ? 'bg-accent-primary text-white'
                        : 'text-text-secondary hover:bg-[var(--bg-primary)] hover:text-text-primary'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3 font-medium truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-card p-4 flex-shrink-0">
          <p className="text-xs text-text-secondary text-center">
            © 2024 Muhammad Rawaha
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
