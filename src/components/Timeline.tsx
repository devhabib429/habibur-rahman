import { motion } from "framer-motion";
import { Calendar, Award, Briefcase } from "lucide-react";

const Timeline = () => {
  const experiences = [
    {
      year: "2023",
      title: "Senior DevOps Engineer",
      description: "Led cloud infrastructure and CI/CD pipeline optimization",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "ERPNext Specialist",
      description: "Implemented custom ERPNext solutions for enterprise clients",
      icon: <Award className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "Automation Engineer",
      description: "Developed automated workflows and deployment processes",
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 font-['Space_Grotesk'] text-white"
        >
          Experience Timeline
        </motion.h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-700" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center mb-16 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                  <span className="text-primary font-bold text-xl mb-2 block font-['Space_Grotesk']">{exp.year}</span>
                  <h3 className="text-white text-lg font-bold mb-2 font-['Space_Grotesk']">{exp.title}</h3>
                  <p className="text-gray-300 font-['Inter']">{exp.description}</p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-gray-900">
                {exp.icon}
              </div>
              
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;