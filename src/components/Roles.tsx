import { motion } from "framer-motion";
import { Server, Database, Bot, Workflow } from "lucide-react";

const Roles = () => {
  const roles = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "DevOps Specialist",
      description: "Expert in CI/CD, containerization, and cloud infrastructure"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "ERPNext Expert",
      description: "Specialized in ERPNext implementation and customization"
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "Automation Enthusiast",
      description: "Passionate about creating efficient automated workflows"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "GenAI Learner",
      description: "Exploring and implementing AI-powered solutions"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-primary mb-4">
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">
                {role.title}
              </h3>
              <p className="text-gray-300 text-sm font-['Inter']">
                {role.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Roles;