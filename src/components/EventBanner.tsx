import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
      try {
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
      } catch (err) {
        console.error('Failed to fetch banner data:', err);
        throw err;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
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