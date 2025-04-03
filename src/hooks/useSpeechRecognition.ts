
import { useState, useCallback, useEffect } from 'react';
import { IWindow } from '@/types/space-command';
import { toast } from '@/components/ui/use-toast';

interface UseSpeechRecognitionOptions {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export const useSpeechRecognition = (options?: UseSpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const startListening = useCallback(() => {
    if (isListening) return;
    
    setIsListening(true);
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const windowWithSpeech = window as unknown as IWindow;
      const SpeechRecognitionApi = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
      
      if (SpeechRecognitionApi) {
        const recognition = new SpeechRecognitionApi();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          console.log('Voice recognition activated');
        };
        
        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const command = event.results[current][0].transcript;
          setTranscript(command);
          
          if (options?.onResult) {
            options.onResult(command);
          }
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          
          if (options?.onError) {
            options.onError(event.error);
          }
          
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
          
          if (options?.onEnd) {
            options.onEnd();
          }
        };
        
        recognition.start();
        
        return () => {
          recognition.abort();
        };
      }
    } else {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive",
      });
      
      setTimeout(() => setIsListening(false), 2000);
      
      if (options?.onError) {
        options.onError("Speech recognition not supported");
      }
    }
  }, [isListening, options]);
  
  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);
  
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);
  
  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening: () => {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    }
  };
};
