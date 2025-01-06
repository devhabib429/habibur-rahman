import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResourceCard from '../components/resources/ResourceCard';
import ResourcesHero from '../components/resources/ResourcesHero';
import { Tag, Loader2 } from 'lucide-react';

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
    const categoryOrder = ['DevOps', 'ERPNext', 'Cloud Architecture', 'General']; // Define preferred order
    
    resources.forEach(resource => {
      const category = resource.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(resource);
    });
    
    // Return categories in the preferred order
    return categoryOrder
      .filter(category => groups[category]?.length > 0)
      .map(category => ({
        category,
        items: groups[category],
      }));
  }, [resources]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <ResourcesHero contentType={contentType} />
        
        <div className="container mx-auto px-4 py-16">
          {isLoading ? (
            <div className="flex items-center justify-center text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Loading resources...</span>
            </div>
          ) : groupedResources.length === 0 ? (
            <div className="text-center text-gray-400">
              No {contentType} available at the moment.
            </div>
          ) : (
            <div className="space-y-16">
              {groupedResources.map((category, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                      <Tag className="w-5 h-5 text-primary relative z-10" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                      {category.category}
                    </h2>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 blur-3xl -z-10" />
                    {category.items.map((resource, index) => (
                      <ResourceCard 
                        key={resource.id} 
                        resource={{
                          ...resource,
                          link: resource.url
                        }} 
                        index={index} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;