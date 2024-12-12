import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6">
            <h3 className="text-2xl font-light font-['Space_Grotesk']">Get in Touch</h3>
            <p className="text-gray-300 font-['Inter'] max-w-md">
              Ready to transform your business with modern DevOps practices and ERPNext solutions? Let's connect.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-light font-['Space_Grotesk']">Newsletter</h3>
            <p className="text-gray-300 font-['Inter']">
              Subscribe for insights on DevOps and ERPNext
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-['Inter']"
                  required
                />
                <Button 
                  type="submit"
                  className="mt-3 w-full md:w-auto bg-primary hover:bg-primary/90 text-white transition-all transform hover:scale-105"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400 font-['Inter']">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;