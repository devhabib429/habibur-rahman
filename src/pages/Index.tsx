import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import WorkProcess from "../components/WorkProcess";
import CalendarBooking from "../components/CalendarBooking";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <WorkProcess />
      <CalendarBooking />
    </div>
  );
};

export default Index;