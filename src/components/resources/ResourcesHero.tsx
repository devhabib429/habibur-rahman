import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Youtube } from 'lucide-react';

interface ResourcesHeroProps {
  contentType: string;
}

const ResourcesHero = ({ contentType }: ResourcesHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative py-24 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-block p-4 bg-white rounded-full border border-black/10 shadow-lg"
          >
            {contentType === 'blogs' ? (
              <BookOpen className="w-10 h-10 text-black animate-pulse" />
            ) : (
              <Youtube className="w-10 h-10 text-black animate-pulse" />
            )}
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-black"
          >
            {contentType === 'blogs' ? 'Technical Blog Posts' : 'Video Tutorials'}
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
          >
            {contentType === 'blogs' 
              ? 'Deep dives into DevOps practices, ERPNext solutions, and cloud architecture.' 
              : 'Step-by-step video guides for implementing DevOps and ERPNext solutions.'}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourcesHero;