import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-light font-['Space_Grotesk'] mb-6">Get in Touch</h3>
          <p className="text-gray-300 font-['Inter'] max-w-md mx-auto mb-8">
            Ready to transform your business with modern DevOps practices and ERPNext solutions? Let's connect.
          </p>
          <div className="flex justify-center space-x-4">
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
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400 font-['Inter']">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;