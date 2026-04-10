import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Cars', href: '/cars' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-hyper-dark/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-orange p-2 group-hover:shadow-neon-blue transition-all duration-300">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <span className="text-text-primary font-bold text-xl hidden sm:inline bg-gradient-to-r from-neon-blue to-neon-orange bg-clip-text text-transparent">
            HYPERDRIVE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="secondary" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
              <div className="relative group">
                <button className="text-text-primary hover:text-neon-blue transition-colors duration-300 flex items-center gap-2">
                  <User size={20} />
                  <span className="text-sm font-medium hidden lg:inline">{user?.name || 'Profile'}</span>
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-glass-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/profile" className="block px-4 py-2 text-text-primary hover:text-neon-blue transition-colors duration-300 text-sm border-b border-white/10">
                    <Settings size={16} className="inline mr-2" />
                    Profile
                  </Link>
                  <Link to="/my-bookings" className="block px-4 py-2 text-text-primary hover:text-neon-blue transition-colors duration-300 text-sm border-b border-white/10">
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-neon-red hover:text-neon-orange transition-colors duration-300 text-sm"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-hyper-dark/95 backdrop-blur-xl border-b border-white/10 animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="secondary" size="sm" className="w-full">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Link to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
                      My Bookings
                    </Button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-neon-red/20 border border-neon-red/50 text-neon-red hover:bg-neon-red/30 transition-colors duration-300 py-2 rounded-lg font-semibold text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;