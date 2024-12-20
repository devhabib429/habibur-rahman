import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTg4MDgsImV4cCI6MjAyNDUzNDgwOH0.HCYi6SXD42qk8lB7HqvH_dqTEBpwgmqk_TZGjKqbYIg'
);

const EventBanner = () => {
  const { data: banner, isLoading } = useQuery({
    queryKey: ['eventBanner'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_banners')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading || !banner || !banner.is_visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#7E69AB] to-[#9b87f5] p-4 rounded-lg shadow-lg"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-white">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Globe className="w-6 h-6 animate-pulse" />
          <div>
            <h3 className="font-bold text-lg">{banner.title}</h3>
            <p className="text-xl font-semibold">{banner.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{banner.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{banner.dates}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventBanner;