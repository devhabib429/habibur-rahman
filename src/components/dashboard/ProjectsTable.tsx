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
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-purple-500/20 bg-gray-800/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-purple-500/10 transition-colors">
            <TableHead className="text-purple-200">Name</TableHead>
            <TableHead className="text-purple-200">Email</TableHead>
            <TableHead className="text-purple-200">Company</TableHead>
            <TableHead className="text-purple-200">Project Type</TableHead>
            <TableHead className="text-purple-200">Budget</TableHead>
            <TableHead className="text-purple-200">Timeline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project, index) => (
            <motion.tr
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-purple-500/10 transition-colors"
            >
              <TableCell className="text-white font-medium">{project.name}</TableCell>
              <TableCell className="text-gray-300">{project.email}</TableCell>
              <TableCell className="text-gray-300">{project.company}</TableCell>
              <TableCell>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200">
                  {project.project_type}
                </span>
              </TableCell>
              <TableCell className="text-gray-300">{project.budget}</TableCell>
              <TableCell className="text-gray-300">{project.timeline}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;