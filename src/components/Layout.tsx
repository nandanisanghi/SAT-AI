
import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Add the star background to all pages
    document.body.classList.add('stars-background');
    
    return () => {
      document.body.classList.remove('stars-background');
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <motion.main 
        key={location.pathname}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className="pt-24 relative z-10" // Added relative z-10 to ensure content is above the stars
      >
        {children}
      </motion.main>
      
      {/* Star animation for all pages */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  );
};

export default Layout;
