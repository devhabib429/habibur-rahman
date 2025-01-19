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
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          {messages.length === 0 ? (
            <ChatInterface onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <div className="flex flex-col h-[calc(100vh-12rem)]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#efeae2] bg-opacity-30">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`relative max-w-[80%] px-4 py-2 rounded-lg shadow-sm
                        ${message.role === 'user' 
                          ? 'bg-[#dcf8c6] text-black ml-auto rounded-tr-none' 
                          : 'bg-white text-black mr-auto rounded-tl-none'
                        }
                      `}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {message.displayContent === '▋' ? (
                          <span className="inline-block animate-pulse">▋</span>
                        ) : (
                          message.displayContent || message.content
                        )}
                      </div>
                      <div className="text-[10px] text-gray-500 text-right mt-1">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t bg-[#f0f2f5] p-4">
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