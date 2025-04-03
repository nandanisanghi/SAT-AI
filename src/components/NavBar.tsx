
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Satellite, BarChart, Wifi, Info, Menu, X, Terminal, Shield } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Satellite className="w-4 h-4 mr-2" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart className="w-4 h-4 mr-2" /> },
    { name: 'Bandwidth', path: '/bandwidth', icon: <Wifi className="w-4 h-4 mr-2" /> },
    { name: 'Command Center', path: '/command', icon: <Terminal className="w-4 h-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4 mr-2" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-transparent backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Satellite className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SAT-AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-cyan-400 bg-white/10'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/10'
                }`}
              >
                {item.icon}
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
            
            <Link
              to="/dashboard"
              className="ml-2 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md hover:from-blue-700 hover:to-cyan-600 transition-colors"
            >
              <Shield className="w-4 h-4 mr-2" />
              <span>Connect Satellite</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden backdrop-blur-sm bg-white/50 mt-2 mx-4 rounded-lg overflow-hidden"
        >
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 flex items-center transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-cyan-400 bg-white/10'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/80'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="m-3 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md hover:from-blue-700 hover:to-cyan-600 transition-colors"
            >
              <Shield className="w-4 h-4 mr-2" />
              <span>Connect Satellite</span>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default NavBar;
