
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SpaceCommandInterface from '../components/SpaceCommandInterface';

const CommandCenter: React.FC = () => {
  return (
    <Layout>
      <div className="page-container bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 min-h-[calc(100vh-6rem)]">
        <div className="section-container py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">Space Command Interface</h1>
            <p className="text-blue-300">Access the knowledge of the cosmos</p>
          </motion.div>
          
          <SpaceCommandInterface />
        </div>
      </div>
    </Layout>
  );
};

export default CommandCenter;
