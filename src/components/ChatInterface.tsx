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
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">The AI search companion, optimized for developers.</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything or paste any URL..."
            className="pl-10 pr-20 py-6 w-full text-base rounded-full border-gray-200 focus:border-gray-300 focus:ring-gray-300"
          />
          
          <div className="absolute right-3 flex items-center space-x-2">
            <Button
              type="submit"
              disabled={isLoading}
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <Send className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </Button>
          </div>
        </div>
      </form>

      <div className="text-sm text-gray-500">
        To write multiple lines, simply use Shift + ↵
      </div>

      <div className="space-y-4 w-full">
        <div className="text-sm font-medium">Explore:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {exampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="secondary"
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-sm"
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
    </div>
  );
};

export default ChatInterface;