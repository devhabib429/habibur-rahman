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
            <ResourcesPreview />
            <UnpopularOpinions />
            <Newsletter />
            <ContactSection />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;