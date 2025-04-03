
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAIResponse } from '@/hooks/useAIResponse';
import MessageList from '@/components/space-command/MessageList';
import MessageInput from '@/components/space-command/MessageInput';

const SpaceCommandInterface: React.FC = () => {
  const { messages, isLoading, initializeMessages, sendMessage } = useAIResponse();
  
  useEffect(() => {
    initializeMessages();
  }, []);

  return (
    <Card className="flex flex-col w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-navy-950/30 backdrop-blur-md border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none">
        <Star className="w-3 h-3 text-white animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20 pointer-events-none">
        <Star className="w-2 h-2 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
        <div className="flex items-center space-x-2">
          <Satellite className="w-5 h-5 text-blue-400" />
          <h3 className="font-medium text-blue-300">Space Intelligence</h3>
        </div>
      </div>
      
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
      />
      
      <MessageInput 
        onSendMessage={sendMessage} 
        isLoading={isLoading} 
      />
    </Card>
  );
};

export default SpaceCommandInterface;
