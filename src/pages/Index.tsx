import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Roles from "../components/Roles";
import Timeline from "../components/Timeline";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative z-0">
        {/* Simple grid background */}
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <Navbar />
        <main>
          <Hero />
          <div className="relative z-10">
            <Roles />
            <Timeline />
            <Newsletter />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;