
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Signal, Cloud, ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for signal strength
const mockSignalData = [78, 75, 82, 79, 85, 82, 79, 76, 80, 83, 78, 81, 77, 79, 82, 78, 80, 75, 83, 79];
const mockTimeLabels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

const SignalVisualizer: React.FC = () => {
  const [signalStrength, setSignalStrength] = useState(82);
  const [signalQuality, setSignalQuality] = useState('Excellent');
  const [signalTrend, setSignalTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [activeIndex, setActiveIndex] = useState(mockSignalData.length - 1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate changing signal strength
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      let newStrength = signalStrength + delta;
      newStrength = Math.max(65, Math.min(95, newStrength)); // Keep between 65-95
      setSignalStrength(newStrength);
      
      // Update signal quality based on strength
      if (newStrength >= 80) {
        setSignalQuality('Excellent');
      } else if (newStrength >= 70) {
        setSignalQuality('Good');
      } else {
        setSignalQuality('Fair');
      }
      
      // Update trend
      if (delta > 0) {
        setSignalTrend('up');
      } else if (delta < 0) {
        setSignalTrend('down');
      } else {
        setSignalTrend('stable');
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [signalStrength]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawChart = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Settings
      const padding = { top: 20, right: 20, bottom: 20, left: 20 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      
      // Calculate scales
      const xScale = chartWidth / (mockSignalData.length - 1);
      const yScale = chartHeight / 40; // Data range is roughly 65-95
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      
      ctx.beginPath();
      ctx.moveTo(padding.left, height - padding.bottom - (mockSignalData[0] - 60) * yScale);
      
      for (let i = 1; i < mockSignalData.length; i++) {
        const x = padding.left + i * xScale;
        const y = height - padding.bottom - (mockSignalData[i] - 60) * yScale;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw line
      ctx.beginPath();
      ctx.moveTo(padding.left, height - padding.bottom - (mockSignalData[0] - 60) * yScale);
      
      for (let i = 1; i < mockSignalData.length; i++) {
        const x = padding.left + i * xScale;
        const y = height - padding.bottom - (mockSignalData[i] - 60) * yScale;
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw points
      for (let i = 0; i < mockSignalData.length; i++) {
        const x = padding.left + i * xScale;
        const y = height - padding.bottom - (mockSignalData[i] - 60) * yScale;
        
        ctx.beginPath();
        ctx.arc(x, y, i === activeIndex ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = i === activeIndex ? '#0EA5E9' : 'rgba(14, 165, 233, 0.5)';
        ctx.fill();
      }
      
      // Draw x-axis labels (only every 4th label to avoid overcrowding)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.font = '8px Inter';
      ctx.textAlign = 'center';
      
      for (let i = 0; i < mockSignalData.length; i += 4) {
        const x = padding.left + i * xScale;
        ctx.fillText(mockTimeLabels[i], x, height - 5);
      }
    };
    
    drawChart();
    
    const handleResize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawChart();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex]);
  
  return (
    <div className="grid-item h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Signal className="w-5 h-5 text-sat-500" />
          <h3 className="font-medium">Signal Strength</h3>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-sat-500 animate-pulse" />
          <span className="text-foreground/70">Live</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="signal-dot" />
            <div className="signal-wave" />
            <div className="signal-wave" style={{ animationDelay: '0.5s' }} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{signalStrength}%</h2>
            <div className="flex items-center text-sm">
              <span className={`${
                signalQuality === 'Excellent' ? 'text-green-500' : 
                signalQuality === 'Good' ? 'text-yellow-500' : 'text-orange-500'
              }`}>
                {signalQuality}
              </span>
              <span className="mx-2 text-foreground/30">•</span>
              <div className="flex items-center">
                {signalTrend === 'up' && <ArrowUp className="w-3 h-3 text-green-500 mr-1" />}
                {signalTrend === 'down' && <ArrowDown className="w-3 h-3 text-orange-500 mr-1" />}
                <span className={`${
                  signalTrend === 'up' ? 'text-green-500' : 
                  signalTrend === 'down' ? 'text-orange-500' : 'text-foreground/70'
                }`}>
                  {signalTrend === 'up' ? 'Improving' : 
                   signalTrend === 'down' ? 'Degrading' : 'Stable'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="w-5 h-5 text-foreground/50" />
          <span className="text-sm text-foreground/70">Clear Weather</span>
        </div>
      </div>
      
      <div className="flex-1 relative min-h-[150px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-background/50 rounded-md">
          <p className="text-sm text-foreground/70 mb-1">Latency</p>
          <p className="text-lg font-medium">42ms</p>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-md">
          <p className="text-sm text-foreground/70 mb-1">Error Rate</p>
          <p className="text-lg font-medium">0.03%</p>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-md">
          <p className="text-sm text-foreground/70 mb-1">Uptime</p>
          <p className="text-lg font-medium">99.9%</p>
        </div>
      </div>
    </div>
  );
};

export default SignalVisualizer;
