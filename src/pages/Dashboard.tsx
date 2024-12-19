import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import HotTakesManager from "@/components/dashboard/HotTakesManager";
import ResourcesManager from "@/components/dashboard/ResourcesManager";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="hot-takes">Hot Takes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-4">
            <ProjectsTable />
          </TabsContent>
          
          <TabsContent value="hot-takes" className="space-y-4">
            <HotTakesManager />
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <ResourcesManager />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;