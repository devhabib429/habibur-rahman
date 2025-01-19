import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  displayContent?: string;
}

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const [isTyping, setIsTyping] = useState(false);

  const typeMessage = async (message: string, index: number) => {
    setIsTyping(true);
    const messageChars = message.split('');
    for (let i = 0; i <= messageChars.length; i++) {
      setMessages(prev => prev.map((msg, idx) => 
        idx === index 
          ? { ...msg, displayContent: message.slice(0, i) }
          : msg
      ));
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    setIsTyping(false);
  };

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isTyping) return;

    try {
      setIsLoading(true);
      const userMessage = message.trim();
      setMessages(prev => [...prev, { role: 'user', content: userMessage, displayContent: userMessage }]);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '', 
        displayContent: '▋'
      }]);

      console.log('Sending chat request to edge function...');
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { prompt: userMessage }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      console.log('Received response:', data);

      setMessages(prev => {
        const newMessages = prev.slice(0, -1);
        return [...newMessages, { role: 'assistant' as const, content: data.response, displayContent: '' }];
      });
      
      typeMessage(data.response, messages.length + 1);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => prev.slice(0, -1));
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <ChatInterface onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-6">
              <div className="space-y-6 mb-6 max-h-[60vh] overflow-y-auto custom-scrollbar p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-4 rounded-2xl max-w-[80%] whitespace-pre-wrap break-words ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white ml-auto' 
                          : 'bg-gray-100 text-black mr-auto'
                      }`}
                    >
                      {message.displayContent === '▋' ? (
                        <span className="inline-block animate-pulse">▋</span>
                      ) : (
                        message.displayContent || message.content
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="sticky bottom-0 bg-white pt-4 border-t">
                <ChatInterface onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;