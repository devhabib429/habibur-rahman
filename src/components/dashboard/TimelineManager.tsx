import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Briefcase, Code, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTAxNjcsImV4cCI6MjA1MDE4NjE2N30.Z_UIgomBp_4xxNaq8GTg3ax6SXFgFg4q4xr5BGYvYFA'
);

interface TimelineExperience {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  icon_type: 'calendar' | 'briefcase' | 'code';
}

const TimelineManager = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingExperience, setEditingExperience] = React.useState<TimelineExperience | null>(null);

  const form = useForm<Omit<TimelineExperience, 'id'>>({
    defaultValues: {
      year: '',
      title: '',
      company: '',
      description: '',
      icon_type: 'code',
    },
  });

  const { data: experiences, isLoading } = useQuery({
    queryKey: ['timeline-experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('timeline_experiences')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) throw error;
      return data as TimelineExperience[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newExperience: Omit<TimelineExperience, 'id'>) => {
      const { data, error } = await supabase
        .from('timeline_experiences')
        .insert([newExperience])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline-experiences'] });
      toast.success('Experience added successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to add experience');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (experience: TimelineExperience) => {
      const { data, error } = await supabase
        .from('timeline_experiences')
        .update({
          year: experience.year,
          title: experience.title,
          company: experience.company,
          description: experience.description,
          icon_type: experience.icon_type,
        })
        .eq('id', experience.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline-experiences'] });
      toast.success('Experience updated successfully');
      setIsOpen(false);
      setEditingExperience(null);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to update experience');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('timeline_experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline-experiences'] });
      toast.success('Experience deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete experience');
    },
  });

  const onSubmit = (data: Omit<TimelineExperience, 'id'>) => {
    if (editingExperience) {
      updateMutation.mutate({ ...data, id: editingExperience.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (experience: TimelineExperience) => {
    setEditingExperience(experience);
    form.reset({
      year: experience.year,
      title: experience.title,
      company: experience.company,
      description: experience.description,
      icon_type: experience.icon_type,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteMutation.mutate(id);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="w-6 h-6" />;
      case 'briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'code':
        return <Code className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Timeline Experiences</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingExperience(null);
                form.reset({
                  year: '',
                  title: '',
                  company: '',
                  description: '',
                  icon_type: 'code',
                });
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border border-purple-500/20">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingExperience ? 'Edit Experience' : 'Add New Experience'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Year</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-purple-500/20 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-purple-500/20 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-purple-500/20 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-purple-500/20 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Icon Type</FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="w-full bg-gray-800 border border-purple-500/20 rounded-md p-2 text-white"
                        >
                          <option value="code">Code</option>
                          <option value="briefcase">Briefcase</option>
                          <option value="calendar">Calendar</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingExperience ? 'Update' : 'Add'} Experience
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence>
        <div className="grid gap-4">
          {experiences?.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-600 rounded-lg">
                  {getIcon(experience.icon_type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{experience.title}</h3>
                  <p className="text-gray-400">{experience.company} - {experience.year}</p>
                  <p className="text-sm text-gray-300 mt-1">{experience.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(experience)}
                  className="hover:bg-purple-500/20"
                >
                  <Pencil className="w-4 h-4 text-purple-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(experience.id)}
                  className="hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TimelineManager;