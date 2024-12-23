import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Roles from "../components/Roles";
import Timeline from "../components/Timeline";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import WorkProcess from "../components/WorkProcess";
import RichContent from "../components/RichContent";
import UnpopularOpinions from "../components/UnpopularOpinions";
import ResourcesPreview from "../components/ResourcesPreview";
import EventBanner from "../components/EventBanner";
import ContactSection from "../components/ContactSection";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative z-0">
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <Navbar />
        <div className="pt-16">
          <EventBanner />
        </div>
        <main>
          <Hero />
          <div className="relative z-10">
            <Roles />
            <RichContent />
            <Timeline />
            <WorkProcess />
            
            {/* Enhanced AI Assistant Section */}
            <div className="py-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 animate-gradient-y" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0%,transparent_100%)]" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 text-center relative"
              >
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 inline-block p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
                  >
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                    Experience AI-Powered Assistance
                  </h2>
                  
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Engage with our advanced AI assistant for instant, intelligent responses to your DevOps and ERPNext queries.
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative inline-block"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-y"></div>
                    <Link to="/chat">
                      <Button className="relative px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-purple-500/25">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Chat with AI Assistant
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <ResourcesPreview />
            <UnpopularOpinions />
            <ContactSection />
            <Newsletter />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;