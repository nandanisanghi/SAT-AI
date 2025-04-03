
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export const useCommandProcessor = () => {
  const navigate = useNavigate();
  
  const processCommand = (command: string, customCommandHandler?: (command: string) => void) => {
    const normalizedCommand = command.toLowerCase();
    let feedback = '';
    
    if (normalizedCommand.match(/dashboard|control panel|statistics|stats/i)) {
      feedback = 'Navigating to dashboard...';
      toast({
        title: "Command Recognized",
        description: "Navigating to dashboard",
        variant: "default",
      });
      setTimeout(() => navigate('/dashboard'), 1000);
    }
    else if (normalizedCommand.match(/command|command center|mission control|space command/i)) {
      feedback = 'Opening command center...';
      toast({
        title: "Command Recognized",
        description: "Opening command center",
        variant: "default",
      });
      setTimeout(() => navigate('/command'), 1000);
    }
    else if (normalizedCommand.match(/bandwidth|network|connection|data flow/i)) {
      feedback = 'Navigating to bandwidth monitor...';
      toast({
        title: "Command Recognized",
        description: "Opening bandwidth monitor",
        variant: "default",
      });
      setTimeout(() => navigate('/bandwidth'), 1000);
    }
    else if (normalizedCommand.match(/about|info|information|help/i)) {
      feedback = 'Opening about page...';
      toast({
        title: "Command Recognized",
        description: "Opening about page",
        variant: "default",
      });
      setTimeout(() => navigate('/about'), 1000);
    }
    else if (normalizedCommand.match(/home|main|start|beginning/i)) {
      feedback = 'Returning to home...';
      toast({
        title: "Command Recognized",
        description: "Returning to home",
        variant: "default",
      });
      setTimeout(() => navigate('/'), 1000);
    }
    else if (normalizedCommand.match(/how many satellites|satellite count|number of satellites/i)) {
      feedback = 'There are thousands of satellites orbiting Earth. Currently, about 7,500 operational satellites are tracked, but many more inactive ones exist.';
    }
    else if (normalizedCommand.match(/geostationary|geo orbit|clarke orbit/i)) {
      feedback = 'A geostationary orbit is 35,786 km above Earth\'s equator. Satellites in this orbit appear stationary from the ground because they complete one orbit in the same time Earth rotates once.';
    }
    else {
      if (customCommandHandler) {
        customCommandHandler(command);
      } else {
        feedback = 'I couldn\'t understand that command. Try asking for navigation or satellite information.';
      }
    }
    
    return feedback;
  };
  
  return { processCommand };
};
