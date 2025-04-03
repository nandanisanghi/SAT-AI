
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SatelliteAnimation from '../components/SatelliteAnimation';
import SpeechRecognition from '../components/SpeechRecognition';
import { MessageCircle, Brain, Zap, Shield } from 'lucide-react';

const Index: React.FC = () => {
  const handleCommand = (command: string) => {
    console.log('Command received:', command);
    // Additional command handling logic could be added here
  };

  // AI Assistant model animation variants
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        {/* Satellite animation in the background */}
        <div className="absolute inset-0 z-0">
          <SatelliteAnimation />
        </div>
        
        {/* Title and description */}
        <motion.div 
          className="relative z-10 text-center px-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            SAT-AI Command
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-100/90">
            Use your voice to control the satellite system and navigate the platform.
            Try asking questions about satellites or navigating to different pages.
          </p>
        </motion.div>
        
        {/* AI Assistant Model Visualization */}
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-28 h-28 mx-auto">
            {/* Outer pulsing rings */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-md"
              variants={pulseVariants}
              animate="pulse"
            />
            <motion.div 
              className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-sm"
              variants={pulseVariants}
              animate="pulse"
              transition={{ delay: 0.5 }}
            />
            
            {/* Core of the AI model visualization */}
            <motion.div 
              className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-600 backdrop-blur-sm shadow-lg border border-white/20"
              animate={{ 
                rotate: 360,
                boxShadow: ["0 0 10px rgba(101, 39, 190, 0.5)", "0 0 20px rgba(47, 211, 230, 0.5)", "0 0 10px rgba(101, 39, 190, 0.5)"]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Central brain icon */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-white/90"
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain size={32} className="stroke-cyan-300" />
            </motion.div>
            
            {/* Orbiting particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-cyan-400"
                initial={{ 
                  x: 14,
                  y: 14,
                }}
                animate={{
                  x: [14, 14 * Math.cos(2 * Math.PI * (i/3))],
                  y: [14, 14 * Math.sin(2 * Math.PI * (i/3))],
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Speech recognition component */}
        <motion.div 
          className="relative z-10 w-full max-w-md px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <SpeechRecognition onCommand={handleCommand} />
        </motion.div>
        
        {/* Feature highlights */}
        <motion.div 
          className="relative z-10 w-full max-w-4xl mt-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Voice Navigation",
                description: "Navigate through the satellite platform using simple voice commands",
                icon: <MessageCircle className="w-8 h-8 mb-3 text-cyan-400" />
              },
              {
                title: "AI Intelligence",
                description: "Advanced AI models for real-time satellite data analysis and predictions",
                icon: <Brain className="w-8 h-8 mb-3 text-purple-400" />
              },
              {
                title: "Secure Interface",
                description: "End-to-end encrypted communication with military-grade security",
                icon: <Shield className="w-8 h-8 mb-3 text-pink-400" />
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-lg font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{feature.title}</h3>
                  <p className="text-blue-100/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
