import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { FileText, Server, Code, BookOpen, Wrench, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ERPNextUpdates = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: updates, isLoading } = useQuery({
    queryKey: ["erpnext-updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("erpnext_updates")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const categories = {
    feature: { icon: Server, label: "New Features", color: "bg-green-100 text-green-800" },
    bugfix: { icon: Wrench, label: "Bug Fixes", color: "bg-red-100 text-red-800" },
    announcement: { icon: Bell, label: "Announcements", color: "bg-blue-100 text-blue-800" },
    tutorial: { icon: BookOpen, label: "Tutorials", color: "bg-purple-100 text-purple-800" },
  };

  const filteredUpdates = activeTab === "all" 
    ? updates 
    : updates?.filter(update => update.update_type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl"
            >
              ERPNext Updates
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Stay up to date with the latest features, improvements, and announcements
            </motion.p>
          </div>
        </div>
      </div>

      {/* Updates Section */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex justify-center mb-8 bg-white p-1 rounded-lg border">
            <TabsTrigger value="all" className="px-4 py-2">
              All Updates
            </TabsTrigger>
            {Object.entries(categories).map(([key, { label }]) => (
              <TabsTrigger key={key} value={key} className="px-4 py-2">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpdates?.map((update) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:scale-[1.02]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {categories[update.update_type as keyof typeof categories]?.icon && (
                        <div className={`p-2 rounded-lg ${categories[update.update_type as keyof typeof categories].color}`}>
                          {React.createElement(categories[update.update_type as keyof typeof categories].icon, {
                            className: "w-5 h-5",
                          })}
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {update.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{update.description}</p>
                    {update.version && (
                      <p className="text-sm text-gray-500">Version: {update.version}</p>
                    )}
                    {update.tags && update.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {update.tags.map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="bg-gray-100">
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
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default ERPNextUpdates;