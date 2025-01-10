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
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-black">
            Enterprise Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
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
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
              <div className="relative bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full shadow-sm hover:shadow-md">
                <div className="text-black mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="text-gray-500 flex items-center gap-2 group-hover:text-gray-700 transition-colors">
                      <ArrowRight className="w-4 h-4 text-black" />
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