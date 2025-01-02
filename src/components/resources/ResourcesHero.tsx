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
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient-y" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-block p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full border border-gray-700/30 shadow-lg"
          >
            {contentType === 'blogs' ? (
              <BookOpen className="w-10 h-10 text-primary animate-pulse" />
            ) : (
              <Youtube className="w-10 h-10 text-primary animate-pulse" />
            )}
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-y"
          >
            {contentType === 'blogs' ? 'Technical Blog Posts' : 'Video Tutorials'}
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
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