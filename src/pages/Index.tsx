import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import WorkProcess from "../components/WorkProcess";
import CalendarBooking from "../components/CalendarBooking";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <WorkProcess />
      <CalendarBooking />
      <Footer />
    </div>
  );
};

export default Index;