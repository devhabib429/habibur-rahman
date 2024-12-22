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
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

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
            <div className="py-16 container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Try Our AI Assistant</h2>
              <Link to="/chat">
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with AI
                </Button>
              </Link>
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