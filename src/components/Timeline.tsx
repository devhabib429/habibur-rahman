import { motion } from "framer-motion";
import { Calendar, Briefcase, Code } from "lucide-react";

const Timeline = () => {
  const experiences = [
    {
      year: "2021 - Present",
      title: "Developer",
      company: "Tata Technologies Ltd",
      description: "Currently working as a Developer at Tata Technologies Ltd, contributing to various development projects.",
      icon: <Code className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "DevOps Engineer",
      company: "Nestorbird Ltd",
      description: "Worked as a DevOps Engineer, implementing and maintaining CI/CD pipelines and cloud infrastructure.",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      year: "2019 - 2021",
      title: "Full Stack Developer Intern",
      company: "CRTD Technologies",
      description: "Started career as a Full Stack Developer Intern, working on various web development projects.",
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-20 relative bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 font-['Space_Grotesk'] text-gray-900"
        >
          Experience Timeline
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 hidden md:block" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
              } mb-4 md:mb-0`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-black font-bold text-xl mb-2 block font-['Space_Grotesk']"
                  >
                    {exp.year}
                  </motion.span>
                  <h3 className="text-black text-lg font-bold mb-2 font-['Space_Grotesk']">{exp.title}</h3>
                  <h4 className="text-gray-600 text-md mb-2 font-['Space_Grotesk']">{exp.company}</h4>
                  <p className="text-gray-500 font-['Inter']">{exp.description}</p>
                </motion.div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex items-center justify-center w-12 h-12 bg-gray-900 rounded-full border-4 border-white text-white my-4 md:my-0 shadow-lg"
              >
                {exp.icon}
              </motion.div>
              
              <div className="w-full md:w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
