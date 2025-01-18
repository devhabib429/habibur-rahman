import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerContentState {
  title: string;
  subtitle: string;
  description?: string;
}

const BannerContent = () => {
  const location = useLocation();
  const bannerData = location.state as BannerContentState;
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const description = `Welcome to our latest event! We're excited to share more details about "${bannerData.title}". 
  ${bannerData.subtitle}
  
  Join us for an incredible experience where we'll explore innovative solutions and connect with industry leaders.
  
  What to expect:
  - In-depth discussions
  - Networking opportunities
  - Live demonstrations
  - Interactive sessions
  
  Don't miss this opportunity to be part of something extraordinary!`;

  useEffect(() => {
    if (currentIndex < description.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + description[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 30); // Adjust speed of typing here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, description]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              {bannerData.title}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8"
            >
              {bannerData.subtitle}
            </motion.h2>

            <div className="prose prose-lg max-w-none">
              <pre className="font-sans whitespace-pre-wrap text-gray-700 leading-relaxed">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-black ml-1"
                >
                </motion.span>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;