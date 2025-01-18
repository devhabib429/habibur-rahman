import React, { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BannerContentState {
  title: string;
  subtitle: string;
}

const BannerContent = () => {
  const location = useLocation();
  const bannerData = location.state as BannerContentState | null;
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no banner data was passed through navigation, redirect to home
  if (!bannerData) {
    console.log('No banner data found in location state, redirecting to home');
    return <Navigate to="/" replace />;
  }

  const { data: banner, isLoading, error } = useQuery({
    queryKey: ['eventBanner'],
    queryFn: async () => {
      console.log('Fetching banner content...');
      const { data, error } = await supabase
        .from('event_banners')
        .select('content')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching banner content:', error);
        throw error;
      }
      
      console.log('Banner content received:', data);
      return data;
    }
  });
  
  const content = banner?.content || 'No content available.';

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + content[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, content]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading content. Please try again later.</div>
      </div>
    );
  }

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