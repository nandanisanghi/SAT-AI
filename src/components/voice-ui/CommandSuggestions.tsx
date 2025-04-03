
import React from 'react';
import { Wand2 } from 'lucide-react';

interface CommandSuggestionsProps {
  onSuggestionClick: (command: string) => void;
}

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    { label: "Dashboard", command: "show dashboard" },
    { label: "Command Center", command: "open command center" },
    { label: "Satellite info", command: "how many satellites are there" },
  ];
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <div 
          key={index}
          onClick={() => onSuggestionClick(suggestion.command)}
          className="text-xs bg-purple-500/20 hover:bg-purple-500/30 px-3 py-1 rounded-full cursor-pointer transition-colors flex items-center"
        >
          <Wand2 className="w-3 h-3 mr-1" /> {suggestion.label}
        </div>
      ))}
    </div>
  );
};

export default CommandSuggestions;
