import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, SendHorizontal, MessageSquare, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Chat = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, displayContent?: string }>>([]);
  const { toast } = useToast();
  const [isTyping, setIsTyping] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippet(text);
      setTimeout(() => setCopiedSnippet(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Code snippet has been copied successfully!",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const formatMessage = (content: string) => {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const paragraphRegex = /\n\n/g;
    
    let formattedContent = content;
    let codeBlocks: string[] = [];
    
    // Replace code blocks with placeholders
    formattedContent = formattedContent.replace(codeBlockRegex, (_, language, code) => {
      codeBlocks.push(code.trim());
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });
    
    // Split into paragraphs
    const paragraphs = formattedContent.split(paragraphRegex);
    
    return paragraphs.map(paragraph => {
      // Replace code block placeholders with actual formatted code blocks
      if (paragraph.startsWith('__CODE_BLOCK_')) {
        const index = parseInt(paragraph.replace('__CODE_BLOCK_', '').replace('__', ''));
        const code = codeBlocks[index];
        return (
          <div key={index} className="relative my-4 group">
            <div className="absolute right-2 top-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(code)}
                className="h-8 w-8 bg-gray-800/50 hover:bg-gray-700/50"
              >
                {copiedSnippet === code ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            <pre className="relative bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono text-gray-200">{code}</code>
            </pre>
          </div>
        );
      }
      return <p key={paragraph.slice(0, 20)} className="mb-4 leading-relaxed">{paragraph}</p>;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    try {
      setIsLoading(true);
      const userMessage = input.trim();
      setMessages(prev => [...prev, { role: 'user', content: userMessage, displayContent: userMessage }]);
      setInput("");

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '', 
        displayContent: '▋'
      }]);

      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { prompt: userMessage }
      });

      if (error) throw error;

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16 flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <MessageSquare className="h-8 w-8 animate-bounce" />
              Chat with AI Assistant
            </h1>
            <p className="text-purple-300 animate-pulse">Powered by Mixtral-8x7B</p>
          </div>
          
          <div className="flex-1 bg-gray-800/30 rounded-2xl shadow-2xl backdrop-blur-lg border border-purple-500/20 flex flex-col overflow-hidden animate-scale-in max-h-[60vh]">
            <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20 animate-fade-in">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse text-purple-400" />
                  <p className="text-purple-300">Start a conversation with the AI assistant</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-[80%] animate-fade-in shadow-lg ${
                      message.role === 'user' 
                        ? 'bg-purple-500/20 text-white backdrop-blur-sm border border-purple-500/30 hover:bg-purple-500/30 transition-colors' 
                        : 'bg-gray-700/50 text-gray-200 backdrop-blur-sm border border-gray-600/30 hover:bg-gray-700/70 transition-colors'
                    }`}
                    style={{
                      animation: `fade-in 0.3s ease-out ${index * 0.1}s`,
                      opacity: 0,
                      animationFillMode: 'forwards'
                    }}
                  >
                    {message.displayContent === '▋' ? (
                      <span className="inline-block animate-pulse">▋</span>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        {formatMessage(message.displayContent || message.content)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-purple-500/20 animate-fade-in bg-gray-800/50 backdrop-blur-lg">
              <div className="flex gap-2 items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading || isTyping}
                  className="flex-1 bg-gray-700/50 border-purple-500/30 focus:border-purple-500 text-white placeholder:text-gray-400 transition-all duration-200 hover:bg-gray-700/70 focus:ring-2 focus:ring-purple-500/50 rounded-xl"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || isTyping}
                  className="bg-purple-500 hover:bg-purple-600 text-white transition-all duration-200 hover:scale-105 active:scale-95 rounded-xl px-6"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;