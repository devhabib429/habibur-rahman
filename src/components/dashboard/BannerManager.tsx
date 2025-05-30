import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  is_visible: boolean;
  content: string;
}

const BannerManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState<BannerData>({
    id: 0,
    title: '',
    subtitle: '',
    location: '',
    dates: '',
    is_visible: true,
    content: ''
  });

  const { data: banner, isLoading } = useQuery({
    queryKey: ['eventBanner'],
    queryFn: async () => {
      console.log('Fetching banner data in BannerManager...');
      const { data, error } = await supabase
        .from('event_banners')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching banner in BannerManager:', error);
        throw error;
      }
      
      console.log('Banner data received in BannerManager:', data);
      return data as BannerData;
    },
    retry: false
  });

  React.useEffect(() => {
    if (banner) {
      setFormData(banner);
    }
  }, [banner]);

  const updateBanner = useMutation({
    mutationFn: async (newData: BannerData) => {
      console.log('Updating banner with data:', newData);
      const { error } = await supabase
        .from('event_banners')
        .update({
          title: newData.title,
          subtitle: newData.subtitle,
          location: newData.location,
          dates: newData.dates,
          is_visible: newData.is_visible,
          content: newData.content
        })
        .eq('id', newData.id);
      
      if (error) {
        console.error('Error updating banner:', error);
        throw error;
      }
      return newData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventBanner'] });
      toast({
        title: "Success",
        description: "Banner updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error in update mutation:', error);
      toast({
        title: "Error",
        description: "Failed to update banner",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanner.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Event Banner Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div>
                <Label>Dates</Label>
                <Input
                  value={formData.dates}
                  onChange={(e) => setFormData(prev => ({ ...prev, dates: e.target.value }))}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px]"
                  placeholder="Enter the detailed content for this banner..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Banner Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle the banner visibility
                  </p>
                </div>
                <Switch
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_visible: checked }))}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BannerManager;