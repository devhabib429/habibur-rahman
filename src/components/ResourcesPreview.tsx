import { motion } from "framer-motion";
import { BookOpen, Youtube, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-black">
            Resources & Learning
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
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
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
            <div className="relative bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <BookOpen className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">Blog Posts</h3>
              <p className="text-gray-600 mb-4">
                In-depth articles about DevOps practices, ERPNext customization, and more
              </p>
              <Link
                to="/resources?type=blogs"
                className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
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
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
            <div className="relative bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <Youtube className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Step-by-step video guides for implementing DevOps solutions and ERPNext features
              </p>
              <Link
                to="/resources?type=videos"
                className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
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