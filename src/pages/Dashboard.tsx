import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import HotTakesManager from "@/components/dashboard/HotTakesManager";
import ResourcesManager from "@/components/dashboard/ResourcesManager";
import TimelineManager from "@/components/dashboard/TimelineManager";
import BannerManager from "@/components/dashboard/BannerManager";
import { motion } from "framer-motion";
import { Sparkles, Layout, MessageSquare, BookOpen, Timeline, Flag } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1F2C] to-gray-900 p-8">
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
            className="p-2 rounded-full bg-[#8B5CF6]/10"
          >
            <Sparkles className="w-8 h-8 text-[#9b87f5]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-white via-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text"
          >
            Dashboard
          </motion.h1>
        </div>
        
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-[#1A1F2C]/50 border border-[#8B5CF6]/20 p-2 rounded-xl flex flex-wrap gap-2">
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10"
            >
              <Layout className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="hot-takes"
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10"
            >
              <MessageSquare className="w-4 h-4" />
              Hot Takes
            </TabsTrigger>
            <TabsTrigger 
              value="resources"
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10"
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="timeline"
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10"
            >
              <Timeline className="w-4 h-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger 
              value="banner"
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10"
            >
              <Flag className="w-4 h-4" />
              Banner
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <TabsContent value="projects" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <ProjectsTable />
              </div>
            </TabsContent>
            
            <TabsContent value="hot-takes" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <HotTakesManager />
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <ResourcesManager />
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <TimelineManager />
              </div>
            </TabsContent>

            <TabsContent value="banner" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <BannerManager />
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;