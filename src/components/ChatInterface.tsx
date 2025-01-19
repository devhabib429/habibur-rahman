import React, { useState } from "react";
import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInterfaceProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface = ({ onSubmit, isLoading }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput("");
  };

  const exampleQuestions = [
    "What is the difference between deep and shallow copy in Python?",
    "How are binary search trees implemented in Java?",
    "What are the key features of React Hooks?"
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-8">
      {!input && (
        <>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">The AI search companion, optimized for developers.</h1>
          </div>

          <div className="space-y-4 w-full">
            <div className="text-sm font-medium">Explore:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {exampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className="bg-[#dcf8c6] hover:bg-[#c5e9a5] text-black rounded-full text-sm border-none"
                  onClick={() => {
                    setInput(question);
                    onSubmit(question);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center bg-white rounded-full shadow-sm">
          <div className="absolute left-3 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="pl-10 pr-16 py-6 w-full text-base rounded-full border-gray-200 focus:border-gray-300 focus:ring-gray-300"
          />
          
          <div className="absolute right-3">
            <Button
              type="submit"
              disabled={isLoading}
              size="icon"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>

      {!input && (
        <div className="text-sm text-gray-500">
          To write multiple lines, simply use Shift + ↵
        </div>
      )}
    </div>
  );
};

export default ChatInterface;