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
    <div className="min-h-screen bg-white">
      <div className="relative z-0">
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
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
            
            <div className="py-24 relative overflow-hidden bg-white">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50" />
              
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
                    className="mb-6 inline-block p-3 bg-gray-50 rounded-full border border-gray-200"
                  >
                    <Sparkles className="w-8 h-8 text-gray-600" />
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                    Experience AI-Powered Assistance
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Engage with our advanced AI assistant for instant, intelligent responses to your DevOps and ERPNext queries.
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative inline-block"
                  >
                    <Link to="/chat">
                      <Button className="relative px-8 py-6 bg-black hover:bg-gray-800 text-white rounded-lg text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-black/25">
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