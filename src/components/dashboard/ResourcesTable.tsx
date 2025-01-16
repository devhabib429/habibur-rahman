import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  category: string;
}

interface ResourcesTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

const ResourcesTable = ({ resources, onEdit, onDelete }: ResourcesTableProps) => {
  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Title</TableHead>
            <TableHead className="text-black">Description</TableHead>
            <TableHead className="text-black">Type</TableHead>
            <TableHead className="text-black">Category</TableHead>
            <TableHead className="text-black">URL</TableHead>
            <TableHead className="text-black text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources?.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="text-black">{resource.title}</TableCell>
              <TableCell className="text-black">{resource.description}</TableCell>
              <TableCell className="text-black capitalize">{resource.type}</TableCell>
              <TableCell className="text-black">{resource.category}</TableCell>
              <TableCell className="text-black">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View
                </a>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(resource)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(resource.id)}
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
  );
};

export default ResourcesTable;