import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DevOpsUpdates = () => {
  const { data: updates, isLoading } = useQuery({
    queryKey: ["devops-updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("devops_updates")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <Code className="w-8 h-8" />
            <h1 className="text-3xl font-bold">DevOps Updates</h1>
          </div>

          <div className="grid gap-6">
            {updates?.map((update) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{update.title}</h3>
                    <Badge variant="secondary">{update.update_type}</Badge>
                  </div>
                  <p className="text-gray-600">{update.description}</p>
                  {update.version && (
                    <p className="text-sm text-gray-500">Version: {update.version}</p>
                  )}
                  {update.tags && update.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {update.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {update.link && (
                    <a
                      href={update.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DevOpsUpdates;