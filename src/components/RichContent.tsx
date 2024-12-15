import { motion } from "framer-motion";
import { Server, Database, Brain, ArrowRight } from "lucide-react";

const RichContent = () => {
  const features = [
    {
      icon: <Server className="w-12 h-12" />,
      title: "DevOps Excellence",
      description: "Streamline your development pipeline with cutting-edge CI/CD practices.",
      points: [
        "Automated deployment pipelines",
        "Infrastructure as Code (IaC)",
        "Container orchestration",
        "Monitoring solutions"
      ]
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "ERPNext Solutions",
      description: "Transform your business operations with customized ERPNext implementations.",
      points: [
        "Custom modules",
        "Workflow automation",
        "Third-party integrations",
        "Performance tuning"
      ]
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "GenAI Integration",
      description: "Harness the power of Generative AI to automate tasks and enhance decisions.",
      points: [
        "AI model deployment",
        "NLP solutions",
        "Content generation",
        "Predictive analytics"
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
            Transformative Solutions
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Leveraging cutting-edge technologies to drive innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300">
                <div className="text-primary mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
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