import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import WorkProcess from "../components/WorkProcess";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="relative z-0">
        {/* Animated background */}
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-[1px]" />
        </div>
        
        <Navbar />
        <main className="relative">
          <Hero />
          <div className="relative z-10">
            <Skills />
            <Projects />
            <WorkProcess />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;