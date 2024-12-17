import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Server, Database, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "DevOps & ERPNext Solutions";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    newsletterSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-16 min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 animate-gradient-y bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center gap-4"
          >
            <Terminal className="w-12 h-12 text-primary animate-pulse" />
            <Server className="w-12 h-12 text-secondary hidden md:block" />
            <Database className="w-12 h-12 text-accent hidden md:block" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent font-['Space_Grotesk'] tracking-tight"
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-['Inter'] leading-relaxed"
          >
            Expert in implementing robust DevOps practices with CI/CD pipelines, Kubernetes orchestration, and cloud-native solutions. Specialized in ERPNext customization, integration, and optimization for streamlined business operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              to="/start-project"
              className="relative group overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <button
              onClick={scrollToNewsletter}
              className="relative group overflow-hidden bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10">Subscribe Newsletter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;