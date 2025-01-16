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

interface ResourceFormProps {
  formData: {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
    category: string;
  };
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
  onCancel: () => void;
}

const ResourceForm = ({ formData, isEditing, onSubmit, onChange, onCancel }: ResourceFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold text-black mb-4">
        {isEditing ? "Edit Resource" : "Add New Resource"}
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="bg-white border-gray-200 text-black"
        />
        
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="bg-white border-gray-200 text-black"
        />
        
        <Select
          value={formData.type}
          onValueChange={(value) => onChange("type", value)}
        >
          <SelectTrigger className="bg-white border-gray-200 text-black">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blog">Blog Post</SelectItem>
            <SelectItem value="video">Video Tutorial</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={formData.category}
          onValueChange={(value) => onChange("category", value)}
        >
          <SelectTrigger className="bg-white border-gray-200 text-black">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DevOps">DevOps</SelectItem>
            <SelectItem value="ERPNext">ERPNext</SelectItem>
            <SelectItem value="Cloud Architecture">Cloud Architecture</SelectItem>
            <SelectItem value="General">General</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          placeholder="URL"
          value={formData.url}
          onChange={(e) => onChange("url", e.target.value)}
          className="bg-white border-gray-200 text-black"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          {isEditing ? "Update" : "Add"} Resource
        </Button>
        {isEditing && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ResourceForm;