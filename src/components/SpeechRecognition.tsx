
import React, { useState, useCallback } from 'react';
import { Mic, MicOff, Satellite, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useCommandProcessor } from '@/utils/commandProcessor';
import SpeechFeedback from '@/components/voice-ui/SpeechFeedback';
import CommandSuggestions from '@/components/voice-ui/CommandSuggestions';

interface SpeechRecognitionProps {
  onCommand?: (command: string) => void;
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({ onCommand }) => {
  const [feedback, setFeedback] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const handleRecognitionResult = useCallback((command: string) => {
    setProcessing(true);
    setFeedback(`Processing: "${command}"`);
    
    const result = processCommand(command);
    setFeedback(result);
    
    setTimeout(() => {
      setProcessing(false);
      setFeedback('');
    }, 5000);
  }, []);
  
  const { isListening, transcript, toggleListening } = useSpeechRecognition({
    onResult: handleRecognitionResult,
    onError: (error) => setFeedback(`Error: ${error}`),
  });
  
  const { processCommand } = useCommandProcessor();
  
  const handleSuggestionClick = (command: string) => {
    setProcessing(true);
    const result = processCommand(command);
    setFeedback(result);
    
    setTimeout(() => {
      setProcessing(false);
      setFeedback('');
    }, 5000);
  };
  
  return (
    <div className="relative z-20">
      <motion.div
        className="glass-container p-4 rounded-lg max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Satellite className="w-5 h-5 text-purple-400" />
            <h3 className="font-medium">SAT-AI Voice Assistant</h3>
          </div>
          
          <motion.button
            onClick={toggleListening}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full p-3 transition-colors ${
              isListening 
                ? 'bg-red-500/20 hover:bg-red-500/30' 
                : 'bg-purple-500/20 hover:bg-purple-500/30'
            }`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-red-400" />
            ) : (
              <Mic className="w-5 h-5 text-purple-400" />
            )}
          </motion.button>
        </div>
        
        <SpeechFeedback 
          isListening={isListening}
          transcript={transcript}
          feedback={feedback}
          processing={processing}
        />
        
        <CommandSuggestions onSuggestionClick={handleSuggestionClick} />
        
        <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Info className="w-3 h-3" />
          <span>Click mic or tap suggestions to try</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeechRecognition;
