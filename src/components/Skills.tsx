import { Code2, Database, Server, Globe, Brain, Workflow } from "lucide-react";

const Skills = () => {
  const skills = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "DevOps",
      description: "Expertise in CI/CD, containerization, and cloud infrastructure management",
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Full-stack Development",
      description: "Building scalable web applications with modern technologies",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "ERPNext",
      description: "Implementation and customization of ERPNext solutions",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "WordPress",
      description: "Custom WordPress development and optimization",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "GenAI Solutions",
      description: "Implementing AI-powered features and automation",
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "CI/CD",
      description: "Setting up robust continuous integration and deployment pipelines",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {skill.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;