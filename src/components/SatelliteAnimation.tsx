
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Satellite as SatelliteIcon } from 'lucide-react';

const SatelliteAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Orbit path animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    
    // Animation variables
    let rotation = 0;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.3;
    
    const drawOrbit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background stars
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.2;
        const opacity = Math.random();
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Draw Earth
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw orbit paths (multiple for visual effect)
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(
          centerX, 
          centerY, 
          orbitRadius + i*15, 
          (orbitRadius + i*15) * 0.6, 
          0, 0, Math.PI * 2
        );
        ctx.strokeStyle = `rgba(${120 + i*40}, ${120 + i*20}, ${255}, ${0.3 - i*0.08})`;
        ctx.lineWidth = 2 - i*0.5;
        ctx.stroke();
      }
      
      // Draw Earth with gradient
      const earthGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
      earthGradient.addColorStop(0, 'rgba(64, 145, 255, 1)');
      earthGradient.addColorStop(0.5, 'rgba(64, 116, 255, 0.9)');
      earthGradient.addColorStop(1, 'rgba(32, 96, 200, 0.8)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();
      
      // Create atmosphere glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 45, centerX, centerY, 70);
      gradient.addColorStop(0, 'rgba(100, 181, 255, 0.6)');
      gradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();
      
      // Add some cloud detail to Earth
      for (let i = 0; i < 8; i++) {
        const cloudAngle = (i / 8) * Math.PI * 2;
        const cloudX = centerX + Math.cos(cloudAngle) * 30;
        const cloudY = centerY + Math.sin(cloudAngle) * 30;
        
        ctx.beginPath();
        ctx.arc(cloudX, cloudY, 10 + Math.random() * 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      }
      
      // Draw signal waves periodically
      const time = Date.now() / 1000;
      if (Math.sin(time * 2) > 0) {
        const signalCount = 3;
        for (let i = 0; i < signalCount; i++) {
          const size = 20 + i * 15;
          ctx.beginPath();
          ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(80, 210, 255, ${0.5 - i * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Request next frame
      requestAnimationFrame(drawOrbit);
    };
    
    drawOrbit();
    
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Main Satellite */}
      <motion.div 
        animate={{ 
          rotate: 360,
          y: [0, -15, 0],
          x: [0, 10, 0, -10, 0],
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute z-10"
        style={{ 
          left: 'calc(50% + 180px)', 
          top: 'calc(50% - 20px)'
        }}
      >
        <div className="relative">
          <div className="w-28 h-14 relative">
            {/* Satellite body */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg shadow-lg border border-blue-400/30"></div>
            
            {/* Solar panels */}
            <div className="absolute -left-20 top-2 w-16 h-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-sm transform rotate-10 border border-blue-300/50"></div>
            <div className="absolute -right-20 top-2 w-16 h-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-sm transform -rotate-10 border border-blue-300/50"></div>
            
            {/* Satellite antenna */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 w-1 h-8 bg-slate-400"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 w-4 h-4 rounded-full border-2 border-slate-300"></div>
            
            {/* Small lights */}
            <div className="absolute top-2 right-3 w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
            <div className="absolute bottom-2 left-3 w-1 h-1 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-blue-500/30 rounded-full -z-10 blur-md"
          />
        </div>
      </motion.div>
      
      {/* Small secondary satellite */}
      <motion.div 
        animate={{ 
          rotate: 360,
          y: [0, 10, 0],
          x: [0, -5, 0, 5, 0],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute z-10"
        style={{ 
          left: 'calc(50% - 150px)', 
          top: 'calc(50% + 50px)'
        }}
      >
        <div className="relative transform scale-75">
          <SatelliteIcon className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-cyan-500/20 rounded-full -z-10 blur-md"
          />
        </div>
      </motion.div>
      
      {/* Satellite signal beam */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute z-5 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform rotate-45"
        style={{ 
          width: '200px',
          left: 'calc(50% + 100px)', 
          top: 'calc(50% + 10px)',
        }}
      />
      
      {/* Secondary signal beam */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute z-5 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -rotate-45"
        style={{ 
          width: '150px',
          left: 'calc(50% - 100px)', 
          top: 'calc(50% + 50px)',
        }}
      />
    </div>
  );
};

export default SatelliteAnimation;
