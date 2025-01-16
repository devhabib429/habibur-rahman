import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
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
import { Pencil, Trash, Plus } from "lucide-react";

const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTAxNjcsImV4cCI6MjA1MDE4NjE2N30.Z_UIgomBp_4xxNaq8GTg3ax6SXFgFg4q4xr5BGYvYFA'
);

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
      const { data, error } = await supabase
        .from('hot_takes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newTake: any) => {
      const { data, error } = await supabase
        .from('hot_takes')
        .insert([newTake]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotTakes'] });
      toast.success("Hot take added successfully!");
      resetForm();
    },
    onError: () => {
      toast.error("Failed to add hot take");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTake: any) => {
      const { data, error } = await supabase
        .from('hot_takes')
        .update(updatedTake)
        .eq('id', updatedTake.id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotTakes'] });
      toast.success("Hot take updated successfully!");
      resetForm();
    },
    onError: () => {
      toast.error("Failed to update hot take");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hot_takes')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotTakes'] });
      toast.success("Hot take deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete hot take");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    return <div className="text-white">Loading hot takes...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-black mb-4">
          {isEditing ? "Edit Hot Take" : "Add New Hot Take"}
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-white border-gray-200 text-black"
            />
          </div>
          
          <div>
            <Input
              placeholder="Opinion"
              value={formData.opinion}
              onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
              className="bg-white border-gray-200 text-black"
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Explanation"
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              className="bg-white border-gray-200 text-black"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            {isEditing ? "Update" : "Add"} Hot Take
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="rounded-md border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Category</TableHead>
              <TableHead className="text-black">Opinion</TableHead>
              <TableHead className="text-black">Explanation</TableHead>
              <TableHead className="text-black text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotTakes?.map((take) => (
              <TableRow key={take.id}>
                <TableCell className="text-black">{take.category}</TableCell>
                <TableCell className="text-black">{take.opinion}</TableCell>
                <TableCell className="text-black">{take.explanation}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(take)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(take.id)}
                    >
                      <Trash className="h-4 w-4" />
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