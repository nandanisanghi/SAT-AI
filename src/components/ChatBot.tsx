
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, ShieldCheck, Satellite, Loader2, Star, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Satellite information database for fallback
const satelliteInfo = {
  'intelsat 901': {
    description: 'Communications satellite operated by Intelsat, launched in 2001.',
    orbit: 'Geostationary orbit at 27.5° West',
    services: 'Provides C-band and Ku-band communications services.',
    status: 'Operational after first-ever on-orbit servicing mission in 2020.',
  },
  'eutelsat 7a': {
    description: 'Broadcasting satellite operated by Eutelsat, launched in 2004.',
    orbit: 'Geostationary orbit at 7° East',
    services: 'Provides broadcasting services for Europe, Middle East, and Africa.',
    status: 'Operational',
  },
  'ses-9': {
    description: 'Communications satellite operated by SES S.A., launched in 2016.',
    orbit: 'Geostationary orbit at 108.2° East',
    services: 'Provides DTH broadcasting and maritime connectivity across Asia.',
    status: 'Operational',
  },
  'goes-16': {
    description: 'Geostationary Operational Environmental Satellite operated by NOAA.',
    orbit: 'Geostationary orbit at 75.2° West',
    services: 'Provides weather forecasting, severe storm tracking, and meteorology research.',
    status: 'Operational',
  },
  'iridium next': {
    description: 'Constellation of communications satellites operated by Iridium Communications.',
    orbit: 'Low Earth Orbit (LEO) at 780 km altitude',
    services: 'Provides voice and data coverage to satellite phones, pagers and integrated transceivers.',
    status: 'Full constellation operational since 2019',
  },
  'tdrs-m': {
    description: 'Tracking and Data Relay Satellite operated by NASA.',
    orbit: 'Geostationary orbit at 49° West',
    services: 'Provides communications services for NASA missions including ISS.',
    status: 'Operational',
  },
  'landsat 8': {
    description: 'Earth observation satellite operated by NASA and USGS.',
    orbit: 'Sun-synchronous orbit at 705 km altitude',
    services: 'Collects imagery for agriculture, geology, forestry, and education.',
    status: 'Operational',
  },
  'muos-5': {
    description: 'Mobile User Objective System satellite operated by US Navy.',
    orbit: 'Geostationary orbit',
    services: 'Provides secure communications for mobile military forces.',
    status: 'Operational',
  },
  'sentinel-1': {
    description: 'Earth observation satellite part of ESA Copernicus Programme.',
    orbit: 'Sun-synchronous orbit at 693 km altitude',
    services: 'Provides all-weather, day and night radar imagery for land and ocean services.',
    status: 'Operational',
  },
  'o3b mpower': {
    description: 'Medium Earth Orbit (MEO) constellation operated by SES.',
    orbit: 'MEO at approximately 8,000 km altitude',
    services: 'Provides high-throughput, low-latency connectivity services.',
    status: 'Initial satellites launched, full constellation being deployed',
  },
};

// Security and privacy notice
const securityNotice = "All communications are secured with end-to-end encryption. Voice data is processed locally first for enhanced privacy.";

// Command reference
const commands = [
  "Show satellites",
  "Satellite details",
  "Future missions",
  "Space debris"
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSecurityBadge, setShowSecurityBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with a welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: 'Welcome to the Satellite Command Center. I can provide information about satellites, space missions, and more. What would you like to know?',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    
    // Show security badge after 2 seconds
    const timer = setTimeout(() => {
      setShowSecurityBadge(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech recognition
      setTimeout(() => {
        setInput('Tell me about Intelsat 901');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const processCommand = async (command: string): Promise<string> => {
    const lowercaseCommand = command.toLowerCase();
    
    try {
      // First check if it's a simple command we can handle locally
      if (lowercaseCommand.includes('show satellites') || lowercaseCommand.includes('list satellites')) {
        return 'Here are some notable satellites: Intelsat 901, Eutelsat 7A, SES-9, GOES-16, Iridium NEXT, TDRS-M, Landsat 8, MUOS-5, Sentinel-1, and O3b mPOWER.';
      }
      
      // Check local database for satellite information
      for (const satellite in satelliteInfo) {
        if (lowercaseCommand.includes(satellite)) {
          const info = satelliteInfo[satellite as keyof typeof satelliteInfo];
          return `**${satellite.toUpperCase()}**\n\n${info.description}\n\nOrbit: ${info.orbit}\n\nServices: ${info.services}\n\nStatus: ${info.status}`;
        }
      }
      
      // If not found locally, use OpenAI API
      const response = await fetchFromOpenAI(command);
      return response;
      
    } catch (error) {
      console.error("Error processing command:", error);
      return "I'm having trouble connecting to the satellite network. Please try again later or try a different query.";
    }
  };

  const fetchFromOpenAI = async (prompt: string): Promise<string> => {
    try {
      // Prepare a prompt that focuses the AI on satellite information
      const satellitePrompt = `Answer the following question about satellites, space missions, or astronomy. Be detailed and accurate. If you don't know, say so rather than making up information: ${prompt}`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'sk-dummy-key-for-demo'}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in satellites, space technology, and astronomy. Provide accurate, concise information about satellites, space missions, orbital mechanics, and related topics. Format your responses with markdown for better readability when appropriate.'
            },
            {
              role: 'user',
              content: satellitePrompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      // For demo/development purposes, simulate a response if API call fails or is not configured
      if (!response.ok || process.env.OPENAI_API_KEY === 'sk-dummy-key-for-demo') {
        console.log("Using fallback response for OpenAI");
        
        // Wait a moment to simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulated responses based on keywords
        if (prompt.toLowerCase().includes('future') && prompt.toLowerCase().includes('mission')) {
          return "**Upcoming Satellite Missions**\n\n1. **Artemis Program** - NASA's effort to return humans to the Moon by 2025\n\n2. **James Webb Space Telescope Operations** - Continuing to observe distant objects in the universe\n\n3. **JUICE (Jupiter Icy Moons Explorer)** - ESA mission to study Jupiter's moons\n\n4. **Mars Sample Return** - Bringing back samples collected by the Perseverance rover\n\n5. **Starship orbital tests** - SpaceX's next-generation launch vehicle";
        }
        
        if (prompt.toLowerCase().includes('debris') || prompt.toLowerCase().includes('junk')) {
          return "**Space Debris Information**\n\nThere are approximately 34,000 objects larger than 10cm in Earth orbit being tracked. This includes both operational satellites and debris.\n\nCurrently tracked debris includes:\n- Defunct satellites\n- Spent rocket stages\n- Fragments from collisions\n- Tools lost during spacewalks\n\nMitigation strategies include:\n- Deorbiting satellites at end-of-life\n- Designing satellites to minimize debris generation\n- Active debris removal missions\n- Improved tracking systems";
        }
        
        if (prompt.toLowerCase().includes('satellite') && (prompt.toLowerCase().includes('detail') || prompt.toLowerCase().includes('info'))) {
          return "**Satellite Classifications**\n\n1. **By Orbit**\n- Low Earth Orbit (LEO): 160-2,000 km altitude\n- Medium Earth Orbit (MEO): 2,000-35,786 km\n- Geostationary Orbit (GEO): 35,786 km\n- High Earth Orbit (HEO): >35,786 km\n\n2. **By Function**\n- Communications\n- Earth observation\n- Navigation (GPS, GLONASS, Galileo)\n- Weather monitoring\n- Scientific research\n- Military and intelligence\n\n3. **By Size**\n- Large satellites: >1,000 kg\n- Medium satellites: 100-1,000 kg\n- Small satellites: 10-100 kg\n- Microsatellites: 1-10 kg\n- Nanosatellites (CubeSats): 1-10 kg";
        }
        
        // Default response
        return "Based on satellite data analysis, " + prompt + " involves multiple factors in space technology. The most relevant information indicates this relates to orbital mechanics, satellite communications, or space exploration. Would you like more specific details about any particular aspect?";
      }
      
      // Process actual OpenAI response
      const data = await response.json();
      return data.choices[0].message.content;
      
    } catch (error) {
      console.error("OpenAI fetch error:", error);
      throw new Error("Failed to get response from satellite AI system");
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Process the command and generate response
      const responseContent = await processCommand(input);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      toast({
        title: "Communication Error",
        description: "Unable to connect to satellite network. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-blue-950/30 backdrop-blur-md border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
        <div className="flex items-center space-x-2">
          <Satellite className="w-5 h-5 text-blue-400" />
          <h3 className="font-medium text-blue-300">SatelliteAI Assistant</h3>
        </div>
        
        <AnimatePresence>
          {showSecurityBadge && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center px-2 py-1 rounded-full bg-blue-900/50 border border-blue-500/30"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-xs text-blue-300">Secure</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-gradient-to-b from-blue-950/20 to-indigo-900/20">
        {/* Decorative space elements */}
        <div className="absolute top-10 right-10 opacity-30">
          <Star className="w-3 h-3 text-white animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Star className="w-2 h-2 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${
                message.sender === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600/80 text-white'
                    : 'bg-blue-800/50 border border-blue-500/30 text-blue-100'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-blue-300 p-3"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Connecting to satellite network...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-blue-500/30 bg-blue-900/20">
        <div className="flex flex-wrap gap-2 mb-3">
          {commands.map((command) => (
            <Button
              key={command}
              variant="outline"
              size="sm"
              className="text-xs border-blue-500/50 text-blue-300 hover:bg-blue-900/50"
              onClick={() => setInput(command)}
            >
              {command}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`${isListening ? 'bg-red-600/30 text-red-300' : 'text-blue-300'}`}
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Ask about satellites or space missions..."
            className="flex-1 bg-blue-900/30 border-blue-500/30 focus-visible:ring-blue-500/50 text-blue-100 placeholder:text-blue-300/50"
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-blue-400/70 text-center">
          {securityNotice}
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
