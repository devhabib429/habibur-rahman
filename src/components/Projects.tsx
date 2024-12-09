import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Code, Globe, Database, Brain } from "lucide-react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "devops", label: "DevOps", icon: <Server className="w-4 h-4" /> },
    { id: "fullstack", label: "Full-stack", icon: <Code className="w-4 h-4" /> },
    { id: "wordpress", label: "WordPress", icon: <Globe className="w-4 h-4" /> },
    { id: "erp", label: "ERPNext", icon: <Database className="w-4 h-4" /> },
    { id: "ai", label: "GenAI", icon: <Brain className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "Cloud Infrastructure Automation",
      category: "devops",
      description: "Automated cloud infrastructure deployment using Terraform and AWS",
      tags: ["AWS", "Terraform", "Docker"],
    },
    {
      title: "E-commerce Platform",
      category: "fullstack",
      description: "Full-stack e-commerce solution with React and Node.js",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Custom WordPress Theme",
      category: "wordpress",
      description: "Custom WordPress theme development for a media company",
      tags: ["WordPress", "PHP", "JavaScript"],
    },
    {
      title: "ERPNext Implementation",
      category: "erp",
      description: "ERPNext customization for manufacturing company",
      tags: ["ERPNext", "Python", "MariaDB"],
    },
    {
      title: "AI Content Generator",
      category: "ai",
      description: "AI-powered content generation tool using GPT-3",
      tags: ["Python", "OpenAI", "React"],
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;