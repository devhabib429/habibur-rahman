import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

// Create a single Supabase client instance
const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTg4MDgsImV4cCI6MjAyNDUzNDgwOH0.HCYi6SXD42qk8lB7HqvH_dqTEBpwgmqk_TZGjKqbYIg'
);

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  is_visible: boolean;
}

const EventBanner = () => {
  const { data: banner, isLoading, error } = useQuery({
    queryKey: ['eventBanner'],
    queryFn: async () => {
      console.log('Fetching banner data...');
      const { data, error } = await supabase
        .from('event_banners')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching banner:', error);
        throw error;
      }
      
      console.log('Banner data received:', data);
      return data as BannerData;
    }
  });

  if (isLoading) {
    console.log('Banner is loading...');
    return null;
  }

  if (error) {
    console.error('Banner error:', error);
    return null;
  }

  if (!banner || !banner.is_visible) {
    console.log('Banner is not visible or no data:', banner);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#7E69AB] to-[#9b87f5] py-2"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-white text-sm md:text-base">
          <Globe className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-semibold">{banner.title}:</span>
          <span>{banner.subtitle}</span>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{banner.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{banner.dates}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventBanner;