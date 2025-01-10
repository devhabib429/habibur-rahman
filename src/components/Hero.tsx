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
    <section className="pt-16 min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-white">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 opacity-50" />
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
                  className="mx-2 text-gray-800 hover:text-black transition-colors duration-300"
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
            className="text-4xl md:text-6xl font-bold mb-6 text-black font-['Space_Grotesk'] tracking-tight"
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 font-['Inter'] leading-relaxed"
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
              className="group relative overflow-hidden bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-black/20 z-10"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <button
              onClick={scrollToNewsletter}
              className="group relative overflow-hidden bg-gray-100 hover:bg-gray-200 text-black px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg border border-gray-200"
            >
              <span className="relative z-10">Get ERPNext Updates</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;