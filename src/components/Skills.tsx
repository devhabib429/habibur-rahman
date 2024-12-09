import { Code2, Database, Server, Globe, Brain, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    {
      icon: <Server className="w-10 h-10" />,
      title: "DevOps",
      description: "Expertise in CI/CD, containerization, and cloud infrastructure management",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Code2 className="w-10 h-10" />,
      title: "Full-stack Development",
      description: "Building scalable web applications with modern technologies",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "ERPNext",
      description: "Implementation and customization of ERPNext solutions",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "WordPress",
      description: "Custom WordPress development and optimization",
      gradient: "from-orange-500 to-amber-400",
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "GenAI Solutions",
      description: "Implementing AI-powered features and automation",
      gradient: "from-red-500 to-rose-400",
    },
    {
      icon: <Workflow className="w-10 h-10" />,
      title: "CI/CD",
      description: "Setting up robust continuous integration and deployment pipelines",
      gradient: "from-indigo-500 to-violet-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
          >
            My Skills
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-300 text-xl"
          >
            Expertise that drives innovation
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10" />
              <div className={`h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-gray-500 transition-all duration-300`}>
                <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${skill.gradient} mb-6`}>
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{skill.title}</h3>
                <p className="text-gray-300 leading-relaxed">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;