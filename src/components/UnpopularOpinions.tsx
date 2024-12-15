import { motion } from "framer-motion";

const UnpopularOpinions = () => {
  const opinions = [
    {
      category: "DevOps",
      opinion: "Not every team needs Kubernetes. For many small to medium applications, simpler container orchestration or even traditional deployment methods might be more efficient.",
      explanation: "While Kubernetes is powerful, its complexity can outweigh its benefits for smaller applications. Teams should evaluate their actual scaling needs before adopting it."
    },
    {
      category: "ERPNext",
      opinion: "Custom implementations often create more problems than they solve.",
      explanation: "While customization is possible, sticking to standard features and adapting business processes to the system can lead to better long-term maintainability and fewer upgrade issues."
    },
    {
      category: "GenAI",
      opinion: "Not every business process needs AI automation - sometimes simple rule-based systems are more reliable and cost-effective.",
      explanation: "The hype around AI sometimes leads to overcomplicated solutions where traditional automation would work better. AI should be applied strategically, not universally."
    }
  ];

  return (
    <section className="py-24 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Unpopular Opinions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sometimes the conventional wisdom needs to be challenged. Here are some thought-provoking perspectives on modern tech practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {opinions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-primary text-lg font-semibold mb-4">{item.category}</div>
              <h3 className="text-xl font-bold mb-4 text-white">"{item.opinion}"</h3>
              <p className="text-gray-400">{item.explanation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnpopularOpinions;