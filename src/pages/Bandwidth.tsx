import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Wifi, Activity, ArrowUp, ArrowDown, Zap, AlertTriangle, Satellite } from 'lucide-react';

// Mock data
const initialServices = [
  { id: 1, name: 'Emergency Response', current: 35, min: 25, max: 50, status: 'Optimal' },
  { id: 2, name: 'Military Operations', current: 25, min: 20, max: 40, status: 'Optimal' },
  { id: 3, name: 'IoT Sensors', current: 15, min: 10, max: 20, status: 'Optimal' },
  { id: 4, name: 'Commercial Communications', current: 15, min: 5, max: 25, status: 'Warning' },
  { id: 5, name: 'Scientific Research', current: 10, min: 5, max: 15, status: 'Optimal' },
];

const hourlyData = [
  { hour: '00:00', usage: 65 },
  { hour: '01:00', usage: 62 },
  { hour: '02:00', usage: 60 },
  { hour: '03:00', usage: 58 },
  { hour: '04:00', usage: 55 },
  { hour: '05:00', usage: 58 },
  { hour: '06:00', usage: 62 },
  { hour: '07:00', usage: 68 },
  { hour: '08:00', usage: 75 },
  { hour: '09:00', usage: 82 },
  { hour: '10:00', usage: 85 },
  { hour: '11:00', usage: 88 },
  { hour: '12:00', usage: 90 },
  { hour: '13:00', usage: 92 },
  { hour: '14:00', usage: 89 },
  { hour: '15:00', usage: 85 },
  { hour: '16:00', usage: 82 },
  { hour: '17:00', usage: 80 },
  { hour: '18:00', usage: 78 },
  { hour: '19:00', usage: 75 },
  { hour: '20:00', usage: 72 },
  { hour: '21:00', usage: 70 },
  { hour: '22:00', usage: 68 },
  { hour: '23:00', usage: 65 },
];

const satellites = [
  { id: 'SAT-001', allocation: 25, region: 'North America', status: 'Optimal' },
  { id: 'SAT-002', allocation: 20, region: 'Europe', status: 'Optimal' },
  { id: 'SAT-003', allocation: 15, region: 'Asia', status: 'Warning' },
  { id: 'SAT-004', allocation: 15, region: 'South America', status: 'Optimal' },
  { id: 'SAT-005', allocation: 10, region: 'Africa', status: 'Optimal' },
  { id: 'SAT-006', allocation: 15, region: 'Australia', status: 'Optimal' },
];

const Bandwidth: React.FC = () => {
  const [services, setServices] = useState(initialServices);
  const [currentUsage, setCurrentUsage] = useState(68); // percentage
  const [maxCapacity, setMaxCapacity] = useState(10000); // Gbps
  const [recommendedChanges, setRecommendedChanges] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fluctuations in current usage
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      setCurrentUsage(prev => Math.max(50, Math.min(95, prev + delta)));
      
      // Update services occasionally
      if (Math.random() > 0.7) {
        const updatedServices = [...services];
        const indexToUpdate = Math.floor(Math.random() * services.length);
        const currentDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        
        let newCurrent = updatedServices[indexToUpdate].current + currentDelta;
        newCurrent = Math.max(
          updatedServices[indexToUpdate].min, 
          Math.min(updatedServices[indexToUpdate].max, newCurrent)
        );
        
        updatedServices[indexToUpdate] = {
          ...updatedServices[indexToUpdate],
          current: newCurrent,
          status: newCurrent > updatedServices[indexToUpdate].max * 0.9 ? 'Warning' : 'Optimal'
        };
        
        setServices(updatedServices);
        
        // Generate random AI recommendations
        if (Math.random() > 0.8) {
          const recommendations = [
            'Reallocate 5% from Commercial to Emergency Response during peak hours',
            'Reduce IoT bandwidth by 2% during low activity periods',
            'Increase Scientific Research allocation by 3% for upcoming space weather event',
            'Optimize Military Operations bandwidth for upcoming satellite maintenance',
            'Adjust Commercial Communications buffer to account for regional traffic spikes'
          ];
          
          setRecommendedChanges([
            recommendations[Math.floor(Math.random() * recommendations.length)],
            recommendations[Math.floor(Math.random() * recommendations.length)]
          ]);
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [services]);
  
  return (
    <Layout>
      <div className="page-container">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Bandwidth Management</h1>
            <p className="text-foreground/70">AI-powered bandwidth allocation and optimization</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-container rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5 text-sat-500" />
                  <h3 className="font-medium">Current Usage</h3>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-sat-500 animate-pulse" />
                  <span className="text-foreground/70">Live</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={currentUsage > 80 ? "#EF4444" : "#0EA5E9"}
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 45 * currentUsage / 100} ${2 * Math.PI * 45 * (100 - currentUsage) / 100}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentUsage}%</div>
                      <div className="text-xs text-foreground/70">of capacity</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full">
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 mb-1">Used</p>
                    <p className="text-lg font-medium">{((maxCapacity * currentUsage) / 100 / 1000).toFixed(1)} Tbps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/70 mb-1">Available</p>
                    <p className="text-lg font-medium">{((maxCapacity * (100 - currentUsage)) / 100 / 1000).toFixed(1)} Tbps</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground/70 mb-3">Network Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm">Uplink</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ArrowUp className="w-3 h-3 text-sat-500" />
                      <span className="text-sm font-medium">3.2 Tbps</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm">Downlink</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ArrowDown className="w-3 h-3 text-sat-500" />
                      <span className="text-sm font-medium">3.6 Tbps</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm">Latency</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3 text-sat-500" />
                      <span className="text-sm font-medium">42 ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-container rounded-xl p-6 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-sat-500" />
                  <h3 className="font-medium">24-Hour Usage</h3>
                </div>
              </div>
              
              <div className="h-[240px] relative">
                <div className="flex justify-between absolute top-0 w-full text-xs text-foreground/50">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
                
                <div className="absolute left-0 top-4 bottom-6 w-[1px] bg-foreground/10"></div>
                <div className="absolute left-1/4 top-4 bottom-6 w-[1px] bg-foreground/10"></div>
                <div className="absolute left-2/4 top-4 bottom-6 w-[1px] bg-foreground/10"></div>
                <div className="absolute left-3/4 top-4 bottom-6 w-[1px] bg-foreground/10"></div>
                <div className="absolute right-0 top-4 bottom-6 w-[1px] bg-foreground/10"></div>
                
                <div className="h-full pt-6 pb-8 flex items-end">
                  {hourlyData.map((data, index) => (
                    <div 
                      key={data.hour} 
                      className="flex-1 h-full flex flex-col justify-end items-center group relative"
                    >
                      <div 
                        className={`w-full max-w-[12px] rounded-t-sm ${
                          data.usage > 80 ? 'bg-red-500' : 'bg-sat-500'
                        }`}
                        style={{ height: `${data.usage}%` }}
                      ></div>
                      
                      <div className="absolute bottom-[-28px] text-[10px] text-foreground/70 transform -rotate-45 origin-top-left">
                        {data.hour}
                      </div>
                      
                      <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {data.usage}% at {data.hour}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-container rounded-xl p-6 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-sat-500" />
                  <h3 className="font-medium">Service Allocation</h3>
                </div>
                <div className="px-2 py-1 bg-sat-100 text-sat-700 rounded-md text-xs font-medium">
                  AI Optimized
                </div>
              </div>
              
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service.id} className="bg-background/50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{service.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{service.current}%</span>
                        {service.status === 'Warning' && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    
                    <div className="relative h-2 bg-background rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full ${
                          service.status === 'Warning' ? 'bg-yellow-500' : 'bg-sat-500'
                        }`}
                        style={{ width: `${service.current}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-foreground/70">
                      <span>Min: {service.min}%</span>
                      <span>Max: {service.max}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {recommendedChanges.length > 0 && (
                <div className="mt-6 bg-sat-50 border border-sat-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-4 h-4 text-sat-500" />
                    <h4 className="font-medium text-sm">AI Recommendations</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {recommendedChanges.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-sat-500 mt-0.5">•</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-container rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Satellite className="w-5 h-5 text-sat-500" />
                  <h3 className="font-medium">Satellite Distribution</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                {satellites.map(satellite => (
                  <div key={satellite.id} className="flex items-center space-x-4">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 36 36">
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
                            stroke={satellite.status === 'Warning' ? "#F59E0B" : "#0EA5E9"}
                            strokeWidth="3"
                            strokeDasharray={`${satellite.allocation}, 100`}
                          />
                        </svg>
                      </div>
                      <span className="text-[9px] font-bold">{satellite.allocation}%</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{satellite.id}</span>
                        <span className={`text-xs ${
                          satellite.status === 'Warning' ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {satellite.status}
                        </span>
                      </div>
                      <span className="text-xs text-foreground/70">{satellite.region}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground/70 mb-3">Global Coverage</h4>
                <div className="relative w-full h-[140px] bg-sat-50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop')] bg-cover bg-center"></div>
                  
                  {satellites.map((satellite, index) => {
                    const randomX = 20 + (index * 30) % 80;
                    const randomY = 20 + ((index * 23) % 60);
                    
                    return (
                      <div 
                        key={satellite.id} 
                        className="absolute"
                        style={{ left: `${randomX}%`, top: `${randomY}%` }}
                      >
                        <div className="relative">
                          <div className="w-2 h-2 rounded-full bg-sat-500"></div>
                          <div className="absolute w-6 h-6 rounded-full border border-sat-300 animate-ping opacity-50"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bandwidth;
