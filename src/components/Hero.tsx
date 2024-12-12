import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Database } from "lucide-react";

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

  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Terminal className="w-12 h-12 text-primary inline-block" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-light mb-6 text-white font-['Space_Grotesk']"
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-['Inter'] leading-relaxed"
          >
            Specialized in implementing ERPNext solutions and DevOps practices to streamline your business operations and enhance efficiency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <a
              href="#contact"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-105"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;