import { motion } from "framer-motion";
import { Server, Database, Brain } from "lucide-react";

const RichContent = () => {
  const features = [
    {
      icon: <Server className="w-12 h-12" />,
      title: "DevOps Excellence",
      description: "Streamline your development pipeline with cutting-edge CI/CD practices, container orchestration, and infrastructure automation. We leverage tools like Kubernetes, Docker, and Jenkins to ensure seamless deployment and scaling.",
      points: [
        "Automated deployment pipelines",
        "Infrastructure as Code (IaC)",
        "Container orchestration with Kubernetes",
        "Monitoring and observability solutions"
      ]
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "ERPNext Solutions",
      description: "Transform your business operations with customized ERPNext implementations. From manufacturing to HR, we ensure your ERP system aligns perfectly with your business processes.",
      points: [
        "Custom module development",
        "Workflow automation",
        "Third-party integrations",
        "Performance optimization"
      ]
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "GenAI Integration",
      description: "Harness the power of Generative AI to automate tasks, enhance decision-making, and create innovative solutions for your business challenges.",
      points: [
        "Custom AI model deployment",
        "Natural Language Processing",
        "Automated content generation",
        "Predictive analytics"
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Transformative Solutions</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Leveraging cutting-edge technologies to drive innovation and efficiency in your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-primary mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RichContent;