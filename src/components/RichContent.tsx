import { motion } from "framer-motion";
import { Server, Database, Brain, ArrowRight, Cloud, Code2, GitBranch, Workflow } from "lucide-react";

const RichContent = () => {
  const features = [
    {
      icon: <Server className="w-12 h-12" />,
      title: "DevOps Excellence",
      description: "Transform your development workflow with modern DevOps practices.",
      points: [
        "Automated CI/CD pipelines",
        "Infrastructure as Code (IaC)",
        "Docker & Kubernetes orchestration",
        "Cloud-native architecture"
      ]
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "ERPNext Solutions",
      description: "Streamline operations with customized ERPNext implementations.",
      points: [
        "Custom module development",
        "Business process automation",
        "Third-party integrations",
        "Data migration & optimization"
      ]
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Cloud Infrastructure",
      description: "Build scalable and resilient cloud infrastructure.",
      points: [
        "Multi-cloud strategy",
        "Auto-scaling solutions",
        "High availability setup",
        "Security best practices"
      ]
    },
    {
      icon: <Code2 className="w-12 h-12" />,
      title: "Custom Development",
      description: "Tailor-made solutions for your unique business needs.",
      points: [
        "API development",
        "Microservices architecture",
        "Performance optimization",
        "Technical consultation"
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Enterprise Solutions
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Comprehensive DevOps and ERPNext solutions tailored for modern enterprises
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300 h-full">
                <div className="text-primary mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RichContent;