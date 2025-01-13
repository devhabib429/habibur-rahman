import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layout, MessageSquare, BookOpen, History, Flag, Calendar, FileText, Code } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectsTable from "@/components/dashboard/ProjectsTable";
import HotTakesManager from "@/components/dashboard/HotTakesManager";
import ResourcesManager from "@/components/dashboard/ResourcesManager";
import TimelineManager from "@/components/dashboard/TimelineManager";
import BannerManager from "@/components/dashboard/BannerManager";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import UpdatesManager from "@/components/dashboard/UpdatesManager";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("projects");

  const menuItems = [
    { id: "projects", title: "Projects", icon: Layout },
    { id: "hot-takes", title: "Hot Takes", icon: MessageSquare },
    { id: "resources", title: "Resources", icon: BookOpen },
    { id: "timeline", title: "Timeline", icon: History },
    { id: "banner", title: "Banner", icon: Flag },
    { id: "schedule", title: "Schedule", icon: Calendar },
    { id: "erpnext", title: "ERPNext Updates", icon: FileText },
    { id: "devops", title: "DevOps Updates", icon: Code },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return <ProjectsTable />;
      case "hot-takes":
        return <HotTakesManager />;
      case "resources":
        return <ResourcesManager />;
      case "timeline":
        return <TimelineManager />;
      case "banner":
        return <BannerManager />;
      case "schedule":
        return <ScheduleManager />;
      case "erpnext":
        return <UpdatesManager type="erpnext" />;
      case "devops":
        return <UpdatesManager type="devops" />;
      default:
        return <ProjectsTable />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="mt-16"> {/* Changed pt-16 to mt-16 for better spacing */}
        <SidebarProvider>
          <div className="flex w-full">
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#9b87f5]" />
                      <span>Dashboard</span>
                    </div>
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menuItems.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveSection(item.id)}
                            data-active={activeSection === item.id}
                            tooltip={item.title}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-6 md:p-8"
            >
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                {renderContent()}
              </div>
            </motion.div>
          </div>
        </SidebarProvider>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;