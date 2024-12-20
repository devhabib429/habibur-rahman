import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Calendar } from 'lucide-react';

interface EventBannerProps {
  visible?: boolean;
}

const EventBanner = ({ visible = true }: EventBannerProps) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#7E69AB] to-[#9b87f5] p-4 rounded-lg shadow-lg mb-8"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-white">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Globe className="w-6 h-6 animate-pulse" />
          <div>
            <h3 className="font-bold text-lg">Currently Attending:</h3>
            <p className="text-xl font-semibold">KubeCon + CloudNative India 2024</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Bangalore, India</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>March 20-21, 2024</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventBanner;