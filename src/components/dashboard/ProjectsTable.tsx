import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const supabase = createClient(
  'https://fdkushkqnwsljjfaulqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3VzaGtxbndzbGpqZmF1bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTAxNjcsImV4cCI6MjA1MDE4NjE2N30.Z_UIgomBp_4xxNaq8GTg3ax6SXFgFg4q4xr5BGYvYFA'
);

const ProjectsTable = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (error) {
    toast.error("Failed to load projects");
    return <div className="text-red-500">Error loading projects</div>;
  }

  if (isLoading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <div className="rounded-md border border-gray-700 bg-gray-800/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Company</TableHead>
            <TableHead className="text-gray-300">Project Type</TableHead>
            <TableHead className="text-gray-300">Budget</TableHead>
            <TableHead className="text-gray-300">Timeline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="text-white">{project.name}</TableCell>
              <TableCell className="text-white">{project.email}</TableCell>
              <TableCell className="text-white">{project.company}</TableCell>
              <TableCell className="text-white">{project.project_type}</TableCell>
              <TableCell className="text-white">{project.budget}</TableCell>
              <TableCell className="text-white">{project.timeline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;