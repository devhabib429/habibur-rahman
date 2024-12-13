import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-white font-['Space_Grotesk']">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8 font-['Inter']">
            Subscribe to our newsletter for the latest insights on DevOps and ERPNext
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-['Inter']"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-all transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;