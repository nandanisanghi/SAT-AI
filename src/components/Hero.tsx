
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Signal, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`;
        ctx.fill();
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      
      <div className="container px-4 mx-auto z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <span className="inline-block px-3 py-1 bg-sat-100 text-sat-700 rounded-full text-sm font-medium">
              Next-Generation Technology
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            AI-Driven Satellite <br className="hidden sm:block" />
            Communication System
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            Cutting-edge artificial intelligence for optimal satellite performance, 
            bandwidth allocation, and deep-space communication.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              to="/dashboard" 
              className="px-6 py-3 bg-sat-500 hover:bg-sat-600 text-white rounded-md font-medium transition-colors duration-300"
            >
              Explore Dashboard
            </Link>
            <Link 
              to="/about" 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-md font-medium transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-20 left-0 right-0"
      >
        <div className="container mx-auto px-4">
          <div className="glass-container rounded-xl max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-sat-100 rounded-lg">
                  <Satellite className="w-6 h-6 text-sat-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Signal Optimization</h3>
                  <p className="text-sm text-foreground/70">AI-powered signal strength analysis and enhancement</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-sat-100 rounded-lg">
                  <Signal className="w-6 h-6 text-sat-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Bandwidth Allocation</h3>
                  <p className="text-sm text-foreground/70">Dynamic resource management for optimal performance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-sat-100 rounded-lg">
                  <Zap className="w-6 h-6 text-sat-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Real-time Analysis</h3>
                  <p className="text-sm text-foreground/70">Instant insights and performance metrics</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-sat-100 rounded-lg">
                  <Globe className="w-6 h-6 text-sat-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Global Coverage</h3>
                  <p className="text-sm text-foreground/70">Comprehensive worldwide satellite network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
