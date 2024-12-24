import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Server, Database, Cloud, Code2, Workflow } from "lucide-react";
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

  const floatingIcons = [
    { icon: <Terminal className="w-8 h-8" />, delay: 0 },
    { icon: <Server className="w-8 h-8" />, delay: 0.2 },
    { icon: <Database className="w-8 h-8" />, delay: 0.4 },
    { icon: <Cloud className="w-8 h-8" />, delay: 0.6 },
    { icon: <Code2 className="w-8 h-8" />, delay: 0.8 },
    { icon: <Workflow className="w-8 h-8" />, delay: 1 }
  ];

  return (
    <section className="pt-16 min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-[#1A1F2C] to-gray-900">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 animate-gradient-y bg-gradient-to-r from-[#8B5CF6]/20 via-[#7E69AB]/20 to-[#D6BCFA]/20 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Floating Icons */}
          <div className="relative h-24 mb-8">
            <div className="absolute inset-0 flex justify-center items-center">
              {floatingIcons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: 1
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.delay
                    },
                    opacity: {
                      duration: 0.5,
                      delay: item.delay
                    }
                  }}
                  className="mx-2 text-[#9b87f5]/80 hover:text-[#9b87f5] transition-colors duration-300"
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#7E69AB] to-[#D6BCFA] font-['Space_Grotesk'] tracking-tight"
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
            Elevate your business with seamless DevOps integration and ERPNext solutions. From CI/CD pipelines to custom ERP modules, we deliver end-to-end digital transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
          >
            <Link
              to="/project-form"
              className="group relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#8B5CF6] text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-[#8B5CF6]/20 z-10"
            >
              <span className="relative z-10">Start Your DevOps Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5] via-[#7E69AB] to-[#D6BCFA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <button
              onClick={scrollToNewsletter}
              className="group relative overflow-hidden bg-[#1A1F2C]/50 backdrop-blur-sm hover:bg-[#1A1F2C] text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg border border-[#8B5CF6]/20"
            >
              <span className="relative z-10">Get ERPNext Updates</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#8B5CF6]/10 to-[#1A1F2C] opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
