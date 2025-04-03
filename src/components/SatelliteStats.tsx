
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Globe, Server, BarChart } from 'lucide-react';

// Mock satellites data
const mockSatellites = [
  { id: 'SAT-001', status: 'Active', uptime: '99.9%', location: 'LEO', type: 'Communication' },
  { id: 'SAT-002', status: 'Active', uptime: '99.7%', location: 'GEO', type: 'Weather' },
  { id: 'SAT-003', status: 'Maintenance', uptime: '95.2%', location: 'MEO', type: 'Navigation' },
  { id: 'SAT-004', status: 'Active', uptime: '99.8%', location: 'LEO', type: 'Communication' },
  { id: 'SAT-005', status: 'Active', uptime: '99.9%', location: 'GEO', type: 'Research' },
];

const SatelliteStats: React.FC = () => {
  const [activeSatellites, setActiveSatellites] = useState(48);
  const [dataProcessed, setDataProcessed] = useState(1024); // in TB
  const [errorRate, setErrorRate] = useState(0.03); // percentage
  const [satellites, setSatellites] = useState(mockSatellites);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate changing stats
      const satelliteDelta = Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      setActiveSatellites(prev => prev + satelliteDelta);
      
      const dataDelta = Math.floor(Math.random() * 10) - 3; // -3 to +6
      setDataProcessed(prev => Math.max(900, prev + dataDelta));
      
      const errorDelta = (Math.random() * 0.01) - 0.005; // -0.005 to +0.005
      setErrorRate(prev => Math.max(0.01, Math.min(0.1, prev + errorDelta)));
      
      // Occasionally change satellite status
      if (Math.random() > 0.8) {
        const updatedSatellites = [...satellites];
        const indexToUpdate = Math.floor(Math.random() * satellites.length);
        
        updatedSatellites[indexToUpdate] = {
          ...updatedSatellites[indexToUpdate],
          status: updatedSatellites[indexToUpdate].status === 'Active' ? 'Maintenance' : 'Active',
          uptime: updatedSatellites[indexToUpdate].status === 'Active' ? 
            (parseFloat(updatedSatellites[indexToUpdate].uptime) - 1).toFixed(1) + '%' :
            (parseFloat(updatedSatellites[indexToUpdate].uptime) + 1).toFixed(1) + '%'
        };
        
        setSatellites(updatedSatellites);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [satellites]);
  
  return (
    <div className="grid-item h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Satellite className="w-5 h-5 text-sat-500" />
          <h3 className="font-medium">Satellite Network</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-sat-500 animate-pulse" />
          <span className="text-foreground/70">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-background/50 rounded-lg">
          <div className="flex justify-center mb-2">
            <Satellite className="w-6 h-6 text-sat-500" />
          </div>
          <p className="text-2xl font-bold">{activeSatellites}</p>
          <p className="text-xs text-foreground/70">Active Satellites</p>
        </div>
        <div className="text-center p-4 bg-background/50 rounded-lg">
          <div className="flex justify-center mb-2">
            <Server className="w-6 h-6 text-sat-500" />
          </div>
          <p className="text-2xl font-bold">{dataProcessed}</p>
          <p className="text-xs text-foreground/70">TB Processed</p>
        </div>
        <div className="text-center p-4 bg-background/50 rounded-lg">
          <div className="flex justify-center mb-2">
            <BarChart className="w-6 h-6 text-sat-500" />
          </div>
          <p className="text-2xl font-bold">{errorRate.toFixed(2)}%</p>
          <p className="text-xs text-foreground/70">Error Rate</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground/70 mb-2">Network Status</h4>
        <div className="flex -space-x-2">
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-sat-100 border-2 border-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Satellite className="w-5 h-5 text-sat-800" />
          </motion.div>
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-sat-200 border-2 border-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Globe className="w-5 h-5 text-sat-800" />
          </motion.div>
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-sat-300 border-2 border-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Server className="w-5 h-5 text-sat-800" />
          </motion.div>
          <div className="ml-4 flex items-center">
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <h4 className="text-sm font-medium text-foreground/70 mb-2">Satellite Status</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-foreground/70 border-b border-border">
              <th className="pb-2 text-left font-medium">ID</th>
              <th className="pb-2 text-left font-medium">Status</th>
              <th className="pb-2 text-left font-medium">Uptime</th>
              <th className="pb-2 text-left font-medium">Location</th>
              <th className="pb-2 text-left font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map((satellite, index) => (
              <motion.tr 
                key={satellite.id} 
                className="border-b border-border/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="py-3">{satellite.id}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    satellite.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {satellite.status}
                  </span>
                </td>
                <td className="py-3">{satellite.uptime}</td>
                <td className="py-3">{satellite.location}</td>
                <td className="py-3">{satellite.type}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SatelliteStats;
