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
    <div className="rounded-md border border-gray-700 bg-gray-800/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Title</TableHead>
            <TableHead className="text-gray-300">Description</TableHead>
            <TableHead className="text-gray-300">Type</TableHead>
            <TableHead className="text-gray-300">Category</TableHead>
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
              <TableCell className="text-white">{resource.category}</TableCell>
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