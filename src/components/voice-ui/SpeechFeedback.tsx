
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SpeechFeedbackProps {
  isListening: boolean;
  transcript: string;
  feedback: string;
  processing: boolean;
}

const SpeechFeedback: React.FC<SpeechFeedbackProps> = ({ 
  isListening, 
  transcript, 
  feedback, 
  processing 
}) => {
  return (
    <AnimatePresence mode="wait">
      {(isListening || feedback || transcript) && (
        <motion.div
          key="feedback"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-2 overflow-hidden"
        >
          {isListening && (
            <div className="flex justify-center space-x-1 my-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{ height: ['8px', '16px', '8px'] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
          
          {transcript && (
            <div className="text-sm bg-purple-500/10 p-2 rounded my-2">
              <span className="font-medium">You said:</span> {transcript}
            </div>
          )}
          
          {processing && !feedback && (
            <div className="flex justify-center items-center p-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400 mr-2" />
              <span className="text-sm">Processing command...</span>
            </div>
          )}
          
          {feedback && (
            <div className="text-sm bg-blue-500/10 p-2 rounded my-2">
              <span className="font-medium">Response:</span> {feedback}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechFeedback;
