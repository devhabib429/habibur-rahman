import { useState } from "react";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "https://www.linkedin.com/in/habibur-rahman-b59038195/",
      label: "LinkedIn"
    },
    { 
      icon: <Github className="h-5 w-5" />, 
      href: "https://x.com/HRahman429",
      label: "X (Twitter)"
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: "mailto:your@email.com",
      label: "Email"
    }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white shadow-sm z-50 border-b border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-light text-black font-['Space_Grotesk']">
              Habibur Rahman<span className="text-black">.</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-black focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-3 space-y-1 flex justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black block transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;