
import { useState } from 'react';
import { Message } from '@/types/space-command';
import { toast } from "@/components/ui/use-toast";

export const useAIResponse = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const initializeMessages = () => {
    const initialMessage: Message = {
      id: '1',
      content: 'Greetings, commander. How can I assist you with space and satellite information today?',
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  };

  const fetchFromOpenAI = async (prompt: string): Promise<string> => {
    try {
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

      if (!response.ok || process.env.OPENAI_API_KEY === 'sk-dummy-key-for-demo') {
        console.log("Using fallback response for OpenAI");
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (prompt.toLowerCase().includes('satellite')) {
          return "Satellites are objects that orbit around larger celestial bodies. Earth-orbiting satellites serve various purposes including communications, weather forecasting, navigation, and Earth observation. They can be placed in different orbits such as Low Earth Orbit (LEO), Medium Earth Orbit (MEO), and Geostationary Orbit (GEO) depending on their intended function.";
        }
        
        if (prompt.toLowerCase().includes('mission') || prompt.toLowerCase().includes('nasa')) {
          return "Space missions are organized efforts to send spacecraft to explore space or celestial bodies. NASA, ESA, ROSCOSMOS, ISRO, and CNSA are some of the major space agencies conducting various missions. Notable missions include the Apollo program (Moon landings), the Mars rovers, Voyager (interstellar mission), and the James Webb Space Telescope for deep space observation.";
        }
        
        if (prompt.toLowerCase().includes('star') || prompt.toLowerCase().includes('planet')) {
          return "Stars are massive, luminous spheres of plasma held together by gravity, with our Sun being the closest star to Earth. Planets are celestial bodies that orbit stars and are not massive enough to cause thermonuclear fusion. Our solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Exoplanets are planets outside our solar system, with thousands discovered to date.";
        }
        
        return "Space exploration represents humanity's efforts to investigate outer space using telescopes, satellites, space probes, and human spaceflight. Major achievements include the first artificial satellite (Sputnik 1, 1957), first human in space (Yuri Gagarin, 1961), first Moon landing (Apollo 11, 1969), and the ongoing International Space Station. Current frontiers include Mars exploration, searching for habitable exoplanets, and understanding dark matter and dark energy.";
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
      
    } catch (error) {
      console.error("OpenAI fetch error:", error);
      throw new Error("Failed to get response from space information system");
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      const responseContent = await fetchFromOpenAI(content);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      toast({
        title: "Communication Error",
        description: "Unable to connect to space information system. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    initializeMessages,
    sendMessage
  };
};
