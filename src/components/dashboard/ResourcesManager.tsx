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
    category: "General", // Default category
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
      category: formData.category,
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
    setFormData({ id: "", title: "", description: "", type: "", url: "", category: "General" });
    setIsEditing(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (isLoading) {
    return <div className="text-white">Loading resources...</div>;
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