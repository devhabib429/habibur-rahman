import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
}

const ScheduleManager = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<ScheduleItem | null>(null);

  const form = useForm<Omit<ScheduleItem, 'id'>>({
    defaultValues: {
      title: '',
      date: '',
      time: '',
    },
  });

  const { data: scheduleItems, isLoading } = useQuery({
    queryKey: ['schedule-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule_items')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data as ScheduleItem[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newItem: Omit<ScheduleItem, 'id'>) => {
      const { data, error } = await supabase
        .from('schedule_items')
        .insert([newItem])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-items'] });
      toast.success('Schedule item added successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to add schedule item');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (item: ScheduleItem) => {
      const { data, error } = await supabase
        .from('schedule_items')
        .update({
          title: item.title,
          date: item.date,
          time: item.time,
        })
        .eq('id', item.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-items'] });
      toast.success('Schedule item updated successfully');
      setIsOpen(false);
      setEditingItem(null);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to update schedule item');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('schedule_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-items'] });
      toast.success('Schedule item deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete schedule item');
    },
  });

  const onSubmit = (data: Omit<ScheduleItem, 'id'>) => {
    if (editingItem) {
      updateMutation.mutate({ ...data, id: editingItem.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (item: ScheduleItem) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      date: item.date,
      time: item.time,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule item?')) {
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
        <h2 className="text-2xl font-bold text-white">Schedule Items</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingItem(null);
                form.reset({
                  title: '',
                  date: '',
                  time: '',
                });
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border border-purple-500/20">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingItem ? 'Edit Schedule Item' : 'Add New Schedule Item'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Date</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-purple-500/20 text-white" placeholder="e.g. April 15, 2024" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Time</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-800 border-purple-500/20 text-white" placeholder="e.g. 10:00 AM PST" />
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
                  {editingItem ? 'Update' : 'Add'} Schedule Item
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence>
        <div className="grid gap-4">
          {scheduleItems?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.date} at {item.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="hover:bg-purple-500/20"
                  >
                    <Pencil className="w-4 h-4 text-purple-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
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

export default ScheduleManager;