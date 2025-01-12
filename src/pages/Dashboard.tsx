import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import HotTakesManager from "@/components/dashboard/HotTakesManager";
import ResourcesManager from "@/components/dashboard/ResourcesManager";
import TimelineManager from "@/components/dashboard/TimelineManager";
import BannerManager from "@/components/dashboard/BannerManager";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import { motion } from "framer-motion";
import { Sparkles, Layout, MessageSquare, BookOpen, History, Flag, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1F2C] to-gray-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-6 md:space-y-8"
      >
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="p-2 rounded-full bg-[#8B5CF6]/10"
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#9b87f5]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text"
          >
            Dashboard
          </motion.h1>
        </div>
        
        <Tabs defaultValue="projects" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="bg-[#1A1F2C]/50 border border-[#8B5CF6]/20 p-2 rounded-xl flex gap-2 min-w-max mx-auto">
              <TabsTrigger 
                value="projects"
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-4 md:px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10 whitespace-nowrap"
              >
                <Layout className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">Projects</span>
                {isMobile && <span className="md:hidden">Proj</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="hot-takes"
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-4 md:px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">Hot Takes</span>
                {isMobile && <span className="md:hidden">Takes</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-4 md:px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">Resources</span>
                {isMobile && <span className="md:hidden">Res</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="timeline"
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-4 md:px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10 whitespace-nowrap"
              >
                <History className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">Timeline</span>
                {isMobile && <span className="md:hidden">Time</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="banner"
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-4 md:px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10 whitespace-nowrap"
              >
                <Flag className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">Banner</span>
                {isMobile && <span className="md:hidden">Ban</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="schedule"
                className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white px-4 md:px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-[#8B5CF6]/10 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">Schedule</span>
                {isMobile && <span className="md:hidden">Sched</span>}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <TabsContent value="projects" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-4 md:p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <ProjectsTable />
              </div>
            </TabsContent>
            
            <TabsContent value="hot-takes" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-4 md:p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <HotTakesManager />
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-4 md:p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <ResourcesManager />
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-4 md:p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <TimelineManager />
              </div>
            </TabsContent>

            <TabsContent value="banner" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-4 md:p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <BannerManager />
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <div className="backdrop-blur-xl bg-[#1A1F2C]/50 p-4 md:p-8 rounded-xl border border-[#8B5CF6]/20 shadow-xl">
                <ScheduleManager />
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;