import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Update {
  id: string;
  title: string;
  description: string;
  update_type: string;
  version?: string;
  link?: string;
  tags?: string[];
}

interface UpdatesManagerProps {
  type: 'erpnext' | 'devops';
}

const UpdatesManager = ({ type }: UpdatesManagerProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingUpdate, setEditingUpdate] = React.useState<Update | null>(null);

  const form = useForm<Omit<Update, 'id'>>({
    defaultValues: {
      title: '',
      description: '',
      update_type: 'feature',
      version: '',
      link: '',
      tags: [],
    },
  });

  const tableName = type === 'erpnext' ? 'erpnext_updates' : 'devops_updates';

  const { data: updates, isLoading } = useQuery({
    queryKey: [tableName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Update[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newUpdate: Omit<Update, 'id'>) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert([newUpdate])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      toast.success('Update added successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to add update');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (update: Update) => {
      const { data, error } = await supabase
        .from(tableName)
        .update({
          title: update.title,
          description: update.description,
          update_type: update.update_type,
          version: update.version,
          link: update.link,
          tags: update.tags,
        })
        .eq('id', update.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      toast.success('Update modified successfully');
      setIsOpen(false);
      setEditingUpdate(null);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to modify update');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      toast.success('Update deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete update');
    },
  });

  const onSubmit = (data: Omit<Update, 'id'>) => {
    if (editingUpdate) {
      updateMutation.mutate({ ...data, id: editingUpdate.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (update: Update) => {
    setEditingUpdate(update);
    form.reset({
      title: update.title,
      description: update.description,
      update_type: update.update_type,
      version: update.version,
      link: update.link,
      tags: update.tags,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      deleteMutation.mutate(id);
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
        <h2 className="text-2xl font-bold text-gray-900">
          {type === 'erpnext' ? 'ERPNext' : 'DevOps'} Updates
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingUpdate(null);
                form.reset({
                  title: '',
                  description: '',
                  update_type: 'feature',
                  version: '',
                  link: '',
                  tags: [],
                });
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Update
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingUpdate ? 'Edit Update' : 'Add New Update'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100 border-gray-300 text-gray-900" />
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
                      <FormLabel className="text-gray-900">Description</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100 border-gray-300 text-gray-900" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="update_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Update Type</FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-900"
                        >
                          <option value="feature">Feature</option>
                          <option value="bugfix">Bug Fix</option>
                          <option value="announcement">Announcement</option>
                          <option value="tutorial">Tutorial</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Version (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100 border-gray-300 text-gray-900" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Link (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100 border-gray-300 text-gray-900" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input 
                          value={field.value?.join(', ') || ''}
                          onChange={(e) => {
                            const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                            field.onChange(tags);
                          }}
                          className="bg-gray-100 border-gray-300 text-gray-900"
                          placeholder="e.g. Security, Performance, UI"
                        />
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
                  {editingUpdate ? 'Update' : 'Add'} Update
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence>
        <div className="grid gap-4">
          {updates?.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{update.title}</h3>
                  <p className="text-gray-600">{update.description}</p>
                  {update.version && (
                    <p className="text-sm text-gray-500">Version: {update.version}</p>
                  )}
                  {update.tags && update.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {update.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {update.link && (
                    <a
                      href={update.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(update)}
                    className="hover:bg-purple-500/20"
                  >
                    <Pencil className="w-4 h-4 text-purple-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(update.id)}
                    className="hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default UpdatesManager;
