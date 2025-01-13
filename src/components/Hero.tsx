import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "DevOps & ERPNext Solutions";
  const [index, setIndex] = useState(0);

  // Sample schedule data - in a real app this would come from your backend
  const scheduleItems = [
    {
      id: 1,
      title: "ERPNext Implementation Workshop",
      date: "April 15, 2024",
      time: "10:00 AM PST",
    },
    {
      id: 2,
      title: "DevOps Best Practices Webinar",
      date: "April 20, 2024",
      time: "2:00 PM PST",
    },
    {
      id: 3,
      title: "Cloud Migration Strategy Session",
      date: "April 25, 2024",
      time: "11:00 AM PST",
    }
  ];

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    newsletterSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-16 min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-black font-['Space_Grotesk'] tracking-tight"
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-['Inter'] leading-relaxed"
          >
            Elevate your business with seamless DevOps integration and ERPNext solutions. From CI/CD pipelines to custom ERP modules, we deliver end-to-end digital transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
          >
            <Link
              to="/project-form"
              className="group relative overflow-hidden bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-black/20 z-10"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              to="/dashboard"
              className="group relative overflow-hidden bg-gray-100 hover:bg-gray-200 text-black px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-lg border border-gray-200"
            >
              <span className="relative z-10">View Updates</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6 text-black">Schedule</h3>
              <div className="space-y-4">
                {scheduleItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100"
                  >
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                      <div className="text-left">
                        <h4 className="font-medium text-black">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{item.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;