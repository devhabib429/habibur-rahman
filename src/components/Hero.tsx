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
      {/* Enhanced KubeCon Banner - Now below navbar */}
      <div className="fixed top-16 left-0 right-0 z-50">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 backdrop-blur-sm p-4 md:p-3"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="animate-pulse text-xl">🎉</span>
                <p className="text-white text-sm md:text-base font-medium">
                  Currently attending KubeCon + CloudNative India 2024!
                </p>
              </div>
              <a 
                href="https://events.linuxfoundation.org/kubecon-cloudnativecon-india/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white text-sm md:text-base hover:text-white/90 underline underline-offset-2 transition-colors"
              >
                Let's connect and discuss cloud-native solutions!
              </a>
            </div>
          </div>
        </motion.div>
      </div>

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
            <Terminal className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light mb-6 text-white font-['Space_Grotesk'] tracking-tight"
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-['Inter'] leading-relaxed"
          >
            Expert in implementing robust DevOps practices with CI/CD pipelines, Kubernetes orchestration, and cloud-native solutions. Specialized in ERPNext customization, integration, and optimization for streamlined business operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/start-project"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Start Project
            </Link>
            <button
              onClick={scrollToNewsletter}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Subscribe Newsletter
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
