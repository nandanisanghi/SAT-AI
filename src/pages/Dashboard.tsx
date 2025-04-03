
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SignalVisualizer from '../components/SignalVisualizer';
import BandwidthMonitor from '../components/BandwidthMonitor';
import SatelliteStats from '../components/SatelliteStats';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="page-container bg-white">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Satellite Command Center</h1>
            <p className="text-foreground/70">Real-time monitoring and AI-powered insights</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <SignalVisualizer />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <BandwidthMonitor />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <SatelliteStats />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
