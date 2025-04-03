import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Zap, Activity, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data for bandwidth allocation
const mockServicesData = [
  { id: 1, name: 'Emergency Response', allocation: 35, priority: 'High', status: 'Optimal' },
  { id: 2, name: 'Military Operations', allocation: 25, priority: 'High', status: 'Optimal' },
  { id: 3, name: 'IoT Sensors', allocation: 15, priority: 'Medium', status: 'Optimal' },
  { id: 4, name: 'Commercial', allocation: 15, priority: 'Low', status: 'Warning' },
  { id: 5, name: 'Research', allocation: 10, priority: 'Medium', status: 'Optimal' },
];

const BandwidthMonitor: React.FC = () => {
  const [totalBandwidth, setTotalBandwidth] = useState(8500); // in Mbps
  const [usedBandwidth, setUsedBandwidth] = useState(5780); // in Mbps
  const [services, setServices] = useState(mockServicesData);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate bandwidth fluctuations
      const delta = Math.floor(Math.random() * 200) - 100; // -100 to +100
      const newUsed = Math.max(5000, Math.min(8000, usedBandwidth + delta));
      setUsedBandwidth(newUsed);
      
      // Update service allocations occasionally
      if (Math.random() > 0.7) {
        const updatedServices = [...services];
        const indexToUpdate = Math.floor(Math.random() * services.length);
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        
        let newAllocation = updatedServices[indexToUpdate].allocation + delta;
        newAllocation = Math.max(5, Math.min(40, newAllocation));
        
        // Adjust other allocations to keep total at 100%
        const diff = updatedServices[indexToUpdate].allocation - newAllocation;
        updatedServices[indexToUpdate].allocation = newAllocation;
        
        if (diff !== 0) {
          const indexToAdjust = (indexToUpdate + 1) % services.length;
          updatedServices[indexToAdjust].allocation += diff;
        }
        
        setServices(updatedServices);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [usedBandwidth, services]);
  
  const bandwidthPercentage = Math.round((usedBandwidth / totalBandwidth) * 100);
  
  return (
    <div className="grid-item h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Wifi className="w-5 h-5 text-sat-500" />
          <h3 className="font-medium">Bandwidth Allocation</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-sat-500 animate-pulse" />
          <span className="text-foreground/70">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-foreground/70 mb-2">Total Bandwidth</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{(totalBandwidth / 1000).toFixed(1)}</span>
            <span className="ml-1 text-foreground/70">Gbps</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-foreground/70 mb-2">Current Usage</p>
          <div className="flex items-center">
            <div className="mr-3">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{(usedBandwidth / 1000).toFixed(1)}</span>
                <span className="ml-1 text-foreground/70">Gbps</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-background relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="3"
                  strokeDasharray={`${bandwidthPercentage}, 100`}
                />
              </svg>
              <span className="absolute text-xs font-semibold">{bandwidthPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground/70 mb-2">Service Allocation</h4>
        <div className="h-6 w-full bg-background rounded-full overflow-hidden flex">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ width: 0 }}
              animate={{ width: `${service.allocation}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${
                service.priority === 'High' ? 'bg-sat-600' : 
                service.priority === 'Medium' ? 'bg-sat-400' : 'bg-sat-300'
              } ${index === 0 ? 'rounded-l-full' : ''} ${
                index === services.length - 1 ? 'rounded-r-full' : ''
              }`}
              onMouseEnter={() => setSelectedService(service.id)}
              onMouseLeave={() => setSelectedService(null)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-foreground/70 border-b border-border">
              <th className="pb-2 text-left font-medium">Service</th>
              <th className="pb-2 text-center font-medium">Allocation</th>
              <th className="pb-2 text-center font-medium">Priority</th>
              <th className="pb-2 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <motion.tr 
                key={service.id} 
                className={`border-b border-border/50 ${
                  selectedService === service.id ? 'bg-background/50' : ''
                }`}
                initial={false}
                animate={selectedService === service.id ? { backgroundColor: 'rgba(14, 165, 233, 0.1)' } : {}}
              >
                <td className="py-3">{service.name}</td>
                <td className="py-3 text-center">{service.allocation}%</td>
                <td className="py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    service.priority === 'High' ? 'bg-red-100 text-red-700' : 
                    service.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {service.priority}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center">
                    {service.status === 'Optimal' ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    <span className={service.status === 'Optimal' ? 'text-green-500' : 'text-yellow-500'}>
                      {service.status}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BandwidthMonitor;
