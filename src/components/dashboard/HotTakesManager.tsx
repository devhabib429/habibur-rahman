import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const HotTakesManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    opinion: "",
    explanation: "",
  });

  const queryClient = useQueryClient();

  const { data: hotTakes, isLoading } = useQuery({
    queryKey: ['hotTakes'],
    queryFn: async () => {
      console.log('Fetching hot takes...');
      const { data, error } = await supabase
        .from('hot_takes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching hot takes:', error);
        throw error;
      }
      console.log('Fetched hot takes:', data);
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newTake: any) => {
      console.log('Creating new hot take:', newTake);
      const { data, error } = await supabase
        .from('hot_takes')
        .insert([newTake])
        .select();
      
      if (error) {
        console.error('Error creating hot take:', error);
        throw error;
      }
      console.log('Created hot take:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotTakes'] });
      toast.success("Hot take added successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error("Failed to add hot take");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTake: any) => {
      console.log('Updating hot take:', updatedTake);
      const { data, error } = await supabase
        .from('hot_takes')
        .update(updatedTake)
        .eq('id', updatedTake.id)
        .select();
      
      if (error) {
        console.error('Error updating hot take:', error);
        throw error;
      }
      console.log('Updated hot take:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotTakes'] });
      toast.success("Hot take updated successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error("Failed to update hot take");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting hot take:', id);
      const { error } = await supabase
        .from('hot_takes')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting hot take:', error);
        throw error;
      }
      console.log('Deleted hot take:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotTakes'] });
      toast.success("Hot take deleted successfully!");
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error("Failed to delete hot take");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    
    if (!formData.category || !formData.opinion || !formData.explanation) {
      toast.error("Please fill in all fields");
      return;
    }

    const takeData = {
      category: formData.category,
      opinion: formData.opinion,
      explanation: formData.explanation,
    };

    if (isEditing) {
      updateMutation.mutate({ ...takeData, id: formData.id });
    } else {
      createMutation.mutate(takeData);
    }
  };

  const handleEdit = (take: any) => {
    setFormData(take);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: "", category: "", opinion: "", explanation: "" });
    setIsEditing(false);
  };

  if (isLoading) {
    return <div className="text-black">Loading hot takes...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-black mb-4">
          {isEditing ? "Edit Hot Take" : "Add New Hot Take"}
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-white border-gray-200 text-black"
            required
          />
          
          <Input
            placeholder="Opinion"
            value={formData.opinion}
            onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
            className="bg-white border-gray-200 text-black"
            required
          />
          
          <Textarea
            placeholder="Explanation"
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            className="bg-white border-gray-200 text-black"
            required
          />
        </div>

        <div className="flex gap-2">
          <Button 
            type="submit"
            className="bg-black text-white hover:bg-gray-800"
          >
            {isEditing ? "Update" : "Add"} Hot Take
          </Button>
          {isEditing && (
            <Button 
              variant="outline" 
              onClick={resetForm}
              className="border-black text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-black font-semibold">Category</TableHead>
              <TableHead className="text-black font-semibold">Opinion</TableHead>
              <TableHead className="text-black font-semibold">Explanation</TableHead>
              <TableHead className="text-black font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotTakes?.map((take) => (
              <TableRow key={take.id} className="border-t border-gray-200">
                <TableCell className="text-black">{take.category}</TableCell>
                <TableCell className="text-black">{take.opinion}</TableCell>
                <TableCell className="text-black">{take.explanation}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(take)}
                      className="hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4 text-black" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(take.id)}
                      className="hover:bg-gray-100"
                    >
                      <Trash className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HotTakesManager;