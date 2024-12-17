import { motion } from "framer-motion";
import { BookOpen, Youtube, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesPreview = () => {
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
            Resources & Learning
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Explore my collection of blogs and video tutorials about DevOps practices and ERPNext solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Blog Posts</h3>
              <p className="text-gray-400 mb-4">
                In-depth articles about DevOps practices, ERPNext customization, and more
              </p>
              <Link
                to="/resources"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Read Articles <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300">
              <Youtube className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Video Tutorials</h3>
              <p className="text-gray-400 mb-4">
                Step-by-step video guides for implementing DevOps solutions and ERPNext features
              </p>
              <Link
                to="/resources"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Watch Videos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;