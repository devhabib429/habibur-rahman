import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Rocket, Search, Settings, Users } from "lucide-react";
import { Button } from "./ui/button";

interface CalWindow extends Window {
  Cal?: {
    showPopup: () => void;
  }
}

declare global {
  interface Window extends CalWindow {}
}

const WorkProcess = () => {
  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Initial Consultation",
      description: "We discuss your requirements, goals, and project scope in detail.",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Research & Planning",
      description: "Thorough analysis and creation of a detailed project roadmap.",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Development",
      description: "Agile development process with regular updates and feedback.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description: "Continuous communication and iterations based on your feedback.",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Delivery",
      description: "Thorough testing and deployment of your solution.",
    },
  ];

  const handleScheduleClick = () => {
    if (window.Cal) {
      window.Cal.showPopup();
    }
  };

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How I Work</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My structured approach ensures successful project delivery while maintaining clear communication throughout the process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gray-700 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center h-full border border-gray-600">
                <div className="mb-4 text-primary flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={handleScheduleClick}
          >
            Schedule a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;