
import React, { useState } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "@/components/ui/use-toast";
import { IWindow } from '@/types/space-command';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const windowWithSpeech = window as unknown as IWindow;
        const SpeechRecognitionApi = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
        
        if (SpeechRecognitionApi) {
          const recognition = new SpeechRecognitionApi();
          
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
          };
          
          recognition.onend = () => {
            setIsListening(false);
          };
          
          recognition.start();
        }
      } else {
        toast({
          title: "Speech Recognition Unavailable",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive",
        });
        setIsListening(false);
      }
    } else {
      setIsListening(false);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="p-3 border-t border-blue-500/30 bg-navy-900/20">
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
          className="flex-1 bg-navy-900/30 border-blue-500/30 focus-visible:ring-blue-500/50 text-blue-100 placeholder:text-blue-300/50"
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
    </div>
  );
};

export default MessageInput;
