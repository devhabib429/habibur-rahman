import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Layout, MessageSquare, BookOpen, History, Flag, Calendar, FileText, Code } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
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
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("projects");
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Dashboard Login</h1>
            <p className="text-gray-500">Sign in to access the dashboard</p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="light"
          />
        </div>
      </div>
    );
  }

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

  const SidebarMenuContent = () => (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="px-3 py-2">
          <div className="flex items-center gap-2 text-black">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">Dashboard</span>
          </div>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveSection(item.id)}
                  data-active={activeSection === item.id}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors
                    ${activeSection === item.id 
                      ? 'bg-gray-100 text-black' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <Button 
        onClick={handleSignOut}
        variant="ghost" 
        className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Sign Out
      </Button>
    </SidebarContent>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-16">
        <SidebarProvider>
          <div className="flex w-full">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="fixed left-4 top-20 z-50 lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-white">
                  <SidebarMenuContent />
                </SheetContent>
              </Sheet>
            ) : (
              <Sidebar className="border-r border-gray-200 bg-white">
                <SidebarMenuContent />
              </Sidebar>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden"
            >
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
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
