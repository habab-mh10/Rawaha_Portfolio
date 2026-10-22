import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderStats } from '../../api/order.api';
import { getProjectStats } from '../../api/project.api';
import { getMessageStats } from '../../api/message.api';
import { toast } from 'react-toastify';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MessageIcon from '@mui/icons-material/Message';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const StatsCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-card-bg border border-card rounded-lg p-6 shadow-soft">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    featuredProjects: 0,
    draftProjects: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    totalMessages: 0,
    unreadMessages: 0,
    repliedMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async (showToast = false) => {
    try {
      if (showToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Fetch all stats in parallel
      const [projectResponse, orderResponse, messageResponse] = await Promise.all([
        getProjectStats().catch(() => ({ data: { total: 0, published: 0, draft: 0, featured: 0 } })),
        getOrderStats().catch(() => ({ data: { total: 0, pending: 0, inProgress: 0, completed: 0 } })),
        getMessageStats().catch(() => ({ data: { total: 0, unread: 0, replied: 0 } })),
      ]);

      setStats({
        totalProjects: projectResponse.data.total || 0,
        publishedProjects: projectResponse.data.published || 0,
        featuredProjects: projectResponse.data.featured || 0,
        draftProjects: projectResponse.data.draft || 0,
        totalOrders: orderResponse.data.total || 0,
        completedOrders: orderResponse.data.completed || 0,
        pendingOrders: orderResponse.data.pending || 0,
        inProgressOrders: orderResponse.data.inProgress || 0,
        totalMessages: messageResponse.data.total || 0,
        unreadMessages: messageResponse.data.unread || 0,
        repliedMessages: messageResponse.data.replied || 0,
      });

      if (showToast) {
        toast.success('Dashboard refreshed successfully');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (showToast) {
        toast.error('Failed to refresh dashboard');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <button
          onClick={() => fetchStats(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          <RefreshIcon className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={WorkIcon}
          color="bg-[var(--accent-primary)]"
        />
        <StatsCard
          title="Published Projects"
          value={stats.publishedProjects}
          icon={DashboardIcon}
          color="bg-green-500"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCartIcon}
          color="bg-purple-500"
        />
        <StatsCard
          title="Messages"
          value={stats.totalMessages}
          icon={MessageIcon}
          color="bg-orange-500"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-card-bg border border-card rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <WorkIcon /> Project Stats
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Total Projects</span>
              <span className="font-bold text-text-primary">{stats.totalProjects}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Published</span>
              <span className="font-bold text-green-600">{stats.publishedProjects}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Featured</span>
              <span className="font-bold text-yellow-600">{stats.featuredProjects}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Draft</span>
              <span className="font-bold text-gray-600">{stats.draftProjects}</span>
            </div>
          </div>
        </div>

        <div className="bg-card-bg border border-card rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <ShoppingCartIcon /> Order Stats
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Total Orders</span>
              <span className="font-bold text-text-primary">{stats.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Pending</span>
              <span className="font-bold text-orange-600">{stats.pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">In Progress</span>
              <span className="font-bold text-[var(--accent-primary)]">{stats.inProgressOrders}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Completed</span>
              <span className="font-bold text-green-600">{stats.completedOrders}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Stats & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card-bg border border-card rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <MessageIcon /> Message Stats
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Total Messages</span>
              <span className="font-bold text-text-primary">{stats.totalMessages}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-card">
              <span className="text-text-secondary">Unread</span>
              <span className="font-bold text-red-600">{stats.unreadMessages}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Replied</span>
              <span className="font-bold text-green-600">{stats.repliedMessages}</span>
            </div>
          </div>
          {stats.unreadMessages > 0 && (
            <a
              href="/admin/messages"
              className="mt-4 block w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-center"
            >
              View {stats.unreadMessages} Unread Message{stats.unreadMessages !== 1 ? 's' : ''}
            </a>
          )}
        </div>

        <div className="bg-card-bg border border-card rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--accent-primary)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
            >
              <WorkIcon fontSize="small" /> Add New Project
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <MessageIcon fontSize="small" />
              Check Messages {stats.unreadMessages > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.unreadMessages}</span>}
            </Link>
            <Link
              to="/admin/about"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <PersonIcon fontSize="small" /> Edit About Me / Upload Logo &amp; CV
            </Link>
            <Link
              to="/admin/visiongoals"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <TrackChangesIcon fontSize="small" /> Edit Vision &amp; Goals
            </Link>
            <Link
              to="/admin/pricing"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <PriceChangeIcon fontSize="small" /> Manage Pricing
            </Link>
            <Link
              to="/admin/testimonials"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <StarIcon fontSize="small" /> Manage Testimonials
            </Link>
            <Link
              to="/admin/team"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <GroupIcon fontSize="small" /> Manage Team
            </Link>
            <Link
              to="/admin/portfolio"
              className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)] border border-card text-text-primary rounded-md hover:bg-card-bg transition-colors"
            >
              <ImageIcon fontSize="small" /> View Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 bg-card-bg border border-card rounded-lg p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-text-primary mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-green-800">Backend Server</p>
              <p className="text-sm text-green-600">Running on port 5001</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-green-800">Database</p>
              <p className="text-sm text-green-600">MongoDB Connected</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-green-800">Cloudinary</p>
              <p className="text-sm text-green-600">Media Storage Active</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-text-secondary text-center">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
