import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Rocket, Search, Settings, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-black">How I Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center h-full border border-gray-200 hover:border-gray-300">
                <div className="mb-4 text-black flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-400" />
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
          <Link to="/project-form">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
            >
              Start a Project
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;