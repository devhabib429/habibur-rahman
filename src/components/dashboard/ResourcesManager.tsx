import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTAxNjcsImV4cCI6MjA1MDE4NjE2N30.Z_UIgomBp_4xxNaq8GTg3ax6SXFgFg4q4xr5BGYvYFA'
);

const ResourcesManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    url: "",
  });

  const queryClient = useQueryClient();

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newResource: any) => {
      const { data, error } = await supabase
        .from('resources')
        .insert([newResource]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success("Resource added successfully!");
      resetForm();
    },
    onError: () => {
      toast.error("Failed to add resource");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedResource: any) => {
      const { data, error } = await supabase
        .from('resources')
        .update(updatedResource)
        .eq('id', updatedResource.id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success("Resource updated successfully!");
      resetForm();
    },
    onError: () => {
      toast.error("Failed to update resource");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success("Resource deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete resource");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resourceData = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      url: formData.url,
    };

    if (isEditing) {
      updateMutation.mutate({ ...resourceData, id: formData.id });
    } else {
      createMutation.mutate(resourceData);
    }
  };

  const handleEdit = (resource: any) => {
    setFormData(resource);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: "", title: "", description: "", type: "", url: "" });
    setIsEditing(false);
  };

  if (isLoading) {
    return <div className="text-white">Loading resources...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          {isEditing ? "Edit Resource" : "Add New Resource"}
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
          
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog">Blog Post</SelectItem>
              <SelectItem value="video">Video Tutorial</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="bg-gray-700/50 border-gray-600 text-white"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            {isEditing ? "Update" : "Add"} Resource
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="rounded-md border border-gray-700 bg-gray-800/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Title</TableHead>
              <TableHead className="text-gray-300">Description</TableHead>
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">URL</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources?.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="text-white">{resource.title}</TableCell>
                <TableCell className="text-white">{resource.description}</TableCell>
                <TableCell className="text-white capitalize">{resource.type}</TableCell>
                <TableCell className="text-white">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(resource)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(resource.id)}
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

export default ResourcesManager;