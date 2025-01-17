import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ResourceForm from "./ResourceForm";
import ResourcesTable from "./ResourcesTable";

const ResourcesManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    url: "",
    category: "General",
  });

  const queryClient = useQueryClient();

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      console.log('Fetching resources...');
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching resources:', error);
        throw error;
      }
      
      console.log('Fetched resources:', data);
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newResource: any) => {
      console.log('Creating new resource:', newResource);
      const { data, error } = await supabase
        .from('resources')
        .insert([newResource])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating resource:', error);
        throw error;
      }
      
      console.log('Created resource:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success("Resource added successfully!");
      resetForm();
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
      toast.error(`Failed to add resource: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedResource: any) => {
      console.log('Updating resource:', updatedResource);
      const { data, error } = await supabase
        .from('resources')
        .update(updatedResource)
        .eq('id', updatedResource.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating resource:', error);
        throw error;
      }
      
      console.log('Updated resource:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success("Resource updated successfully!");
      resetForm();
    },
    onError: (error: any) => {
      console.error('Update error:', error);
      toast.error(`Failed to update resource: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting resource:', id);
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting resource:', error);
        throw error;
      }
      
      console.log('Resource deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success("Resource deleted successfully!");
    },
    onError: (error: any) => {
      console.error('Delete error:', error);
      toast.error(`Failed to delete resource: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Handling form submission:', { isEditing, formData });
    
    const resourceData = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      url: formData.url,
      category: formData.category,
    };

    if (isEditing) {
      updateMutation.mutate({ ...resourceData, id: formData.id });
    } else {
      createMutation.mutate(resourceData);
    }
  };

  const handleEdit = (resource: any) => {
    console.log('Editing resource:', resource);
    setFormData(resource);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: "", title: "", description: "", type: "", url: "", category: "General" });
    setIsEditing(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading resources...</div>;
  }

  return (
    <div className="space-y-8">
      <ResourceForm
        formData={formData}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        onCancel={resetForm}
      />
      <ResourcesTable
        resources={resources || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
};

export default ResourcesManager;