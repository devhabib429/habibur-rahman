import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-xl font-semibold">Connect With Me</h3>
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/in/habibur-rahman-b59038195/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/HRahman429"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:your@email.com"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;