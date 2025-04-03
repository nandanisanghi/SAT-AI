
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Signal, 
  BarChart, 
  Brain, 
  Globe, 
  Server, 
  Database, 
  Network, 
  Satellite, 
  RadioTower 
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Signal className="w-10 h-10 text-sat-500" />,
      title: 'AI-Based Signal Strength Optimization',
      description: 'Advanced machine learning models predict signal loss and automatically adjust transmission parameters for optimal performance in all conditions.'
    },
    {
      icon: <BarChart className="w-10 h-10 text-sat-500" />,
      title: 'Smart Bandwidth Resource Allocation',
      description: 'Dynamic bandwidth allocation using AI to ensure priority services receive adequate resources while maximizing overall network efficiency.'
    },
    {
      icon: <Brain className="w-10 h-10 text-sat-500" />,
      title: 'Neural Network-Based Communication',
      description: 'Deep learning models for data compression and error correction, significantly enhancing long-distance satellite communications.'
    },
    {
      icon: <Zap className="w-10 h-10 text-sat-500" />,
      title: 'Real-Time Data Visualization',
      description: 'Comprehensive dashboards provide instant insights into network performance, enabling quick decisions and optimizations.'
    },
    {
      icon: <Database className="w-10 h-10 text-sat-500" />,
      title: 'Intelligent Error Correction',
      description: 'AI-powered algorithms that automatically detect and correct transmission errors, ensuring data integrity across the network.'
    },
    {
      icon: <Network className="w-10 h-10 text-sat-500" />,
      title: 'Adaptive Network Routing',
      description: 'Smart routing protocols that continuously optimize data paths across the satellite network based on current conditions.'
    }
  ];

  const technologies = [
    { name: 'Artificial Intelligence', icon: <Brain className="w-5 h-5 text-sat-500" /> },
    { name: 'Machine Learning', icon: <BarChart className="w-5 h-5 text-sat-500" /> },
    { name: 'Neural Networks', icon: <Network className="w-5 h-5 text-sat-500" /> },
    { name: 'Satellite Communications', icon: <Satellite className="w-5 h-5 text-sat-500" /> },
    { name: 'Signal Processing', icon: <Signal className="w-5 h-5 text-sat-500" /> },
    { name: 'Cloud Computing', icon: <Server className="w-5 h-5 text-sat-500" /> },
    { name: 'Real-time Analytics', icon: <Zap className="w-5 h-5 text-sat-500" /> },
    { name: 'Global Networks', icon: <Globe className="w-5 h-5 text-sat-500" /> }
  ];
  
  return (
    <Layout>
      <div className="page-container">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-3 py-1 bg-sat-100 text-sat-700 rounded-full text-sm font-medium mb-4">
              About SAT-AI
            </span>
            <h1 className="text-4xl font-bold mb-6">Revolutionizing Satellite Communications with AI</h1>
            <p className="text-xl text-foreground/70">
              Our cutting-edge platform integrates artificial intelligence with satellite technology
              to deliver unparalleled performance, reliability, and efficiency in global communications.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-container rounded-xl p-6 flex flex-col items-start transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
              >
                <div className="p-3 bg-sat-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-container rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Core Technologies</h2>
              <div className="grid grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                    <div className="p-2 bg-sat-100 rounded-md">
                      {tech.icon}
                    </div>
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-sat-500/10 rounded-full animate-pulse-slow"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-dashed border-sat-300 rounded-full animate-[spin_20s_linear_infinite]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 border border-sat-200 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-32 h-32 glass-container rounded-full flex items-center justify-center z-10">
                    <Satellite className="w-16 h-16 text-sat-500" />
                  </div>
                  
                  <div className="absolute" style={{ top: '-30px', left: '60%' }}>
                    <div className="glass-container rounded-full p-3">
                      <Signal className="w-6 h-6 text-sat-500" />
                    </div>
                  </div>
                  
                  <div className="absolute" style={{ bottom: '0', left: '20%' }}>
                    <div className="glass-container rounded-full p-3">
                      <Brain className="w-6 h-6 text-sat-500" />
                    </div>
                  </div>
                  
                  <div className="absolute" style={{ top: '40%', left: '-30px' }}>
                    <div className="glass-container rounded-full p-3">
                      <Globe className="w-6 h-6 text-sat-500" />
                    </div>
                  </div>
                  
                  <div className="absolute" style={{ top: '70%', right: '-20px' }}>
                    <div className="glass-container rounded-full p-3">
                      <RadioTower className="w-6 h-6 text-sat-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-container rounded-xl p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Explore our dashboard to see our AI-driven satellite communication system in action. 
              Witness real-time optimization and intelligent bandwidth allocation at work.
            </p>
            <Link 
              to="/dashboard" 
              className="inline-block px-8 py-4 bg-sat-500 hover:bg-sat-600 text-white rounded-md font-medium transition-colors duration-300"
            >
              Explore Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
