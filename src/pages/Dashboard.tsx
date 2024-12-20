import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import HotTakesManager from "@/components/dashboard/HotTakesManager";
import ResourcesManager from "@/components/dashboard/ResourcesManager";
import TimelineManager from "@/components/dashboard/TimelineManager";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 text-transparent bg-clip-text"
          >
            Dashboard
          </motion.h1>
        </div>
        
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="bg-gray-800/50 border border-purple-500/20 p-1 rounded-lg">
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="hot-takes"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6"
            >
              Hot Takes
            </TabsTrigger>
            <TabsTrigger 
              value="resources"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="timeline"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6"
            >
              Timeline
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <TabsContent value="projects" className="space-y-4 mt-4">
              <div className="backdrop-blur-xl bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 shadow-xl">
                <ProjectsTable />
              </div>
            </TabsContent>
            
            <TabsContent value="hot-takes" className="space-y-4 mt-4">
              <div className="backdrop-blur-xl bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 shadow-xl">
                <HotTakesManager />
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4 mt-4">
              <div className="backdrop-blur-xl bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 shadow-xl">
                <ResourcesManager />
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4 mt-4">
              <div className="backdrop-blur-xl bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 shadow-xl">
                <TimelineManager />
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;