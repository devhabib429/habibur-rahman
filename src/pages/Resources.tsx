import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResourceCard from '../components/resources/ResourceCard';
import ResourcesHero from '../components/resources/ResourcesHero';
import { Tag } from 'lucide-react';

const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTAxNjcsImV4cCI6MjA1MDE4NjE2N30.Z_UIgomBp_4xxNaq8GTg3ax6SXFgFg4q4xr5BGYvYFA'
);

const Resources = () => {
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get('type') || 'blogs';

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', contentType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('type', contentType === 'blogs' ? 'blog' : 'video')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Group resources by category
  const groupedResources = React.useMemo(() => {
    if (!resources) return [];
    
    const groups: { [key: string]: typeof resources } = {};
    resources.forEach(resource => {
      const category = resource.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(resource);
    });
    
    return Object.entries(groups).map(([category, items]) => ({
      category,
      items,
    }));
  }, [resources]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <ResourcesHero contentType={contentType} />
        
        <div className="container mx-auto px-4 py-16">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading resources...</div>
          ) : (
            groupedResources.map((category, idx) => (
              <div key={idx} className="mb-16">
                <div className="flex items-center gap-2 mb-8">
                  <Tag className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-semibold text-white">{category.category}</h2>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {category.items.map((resource, index) => (
                    <ResourceCard key={resource.id} resource={resource} index={index} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;