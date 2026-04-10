import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/admin/cars', label: 'Manage Cars', icon: 'bi-car-front' },
    { path: '/admin/bookings', label: 'Manage Bookings', icon: 'bi-calendar-check' },
    { path: '/admin/users', label: 'Manage Users', icon: 'bi-people' },
    { path: '/admin/reports', label: 'Reports', icon: 'bi-graph-up' },
  ];

  return (
    <div className="flex min-h-screen bg-hyper-dark">
      {/* Sidebar */}
      <div className="w-64 bg-glass-dark/50 border-r border-white/10 fixed h-screen overflow-y-auto pt-20">
        <div className="p-6">
          <h5 className="text-lg font-bold text-white mb-8">⚙️ Admin Panel</h5>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`bi ${item.icon} mr-3 text-lg`}></i>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;