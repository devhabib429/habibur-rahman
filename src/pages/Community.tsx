import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { resourceCenterData } from "../data/resourceCenterData";

const Community = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-0">
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center mb-12"
            >
              Resource Center
            </motion.h1>
            
            <div className="space-y-8">
              {resourceCenterData.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
                  <div className="pl-6 py-6 hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="mr-3 text-black">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-black">{section.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-4 pl-9">{section.description}</p>
                    <ul className="space-y-4 pl-9">
                      {section.links.map((link) => (
                        <li key={link.text} className="border-l-2 border-gray-100 pl-4">
                          <Link 
                            to={link.url}
                            className="text-black hover:text-gray-700 transition-colors duration-200 flex items-center group"
                          >
                            <span className="mr-2 text-black group-hover:translate-x-1 transition-transform duration-200">
                              {link.icon}
                            </span>
                            <div>
                              <div className="font-medium">{link.text}</div>
                              {link.date && (
                                <div className="text-sm text-gray-500">{link.date}</div>
                              )}
                              {link.participants && (
                                <div className="text-sm text-gray-500">{link.participants}</div>
                              )}
                              {link.collaborators && (
                                <div className="text-sm text-gray-500">{link.collaborators}</div>
                              )}
                              {link.category && (
                                <div className="text-sm text-gray-500">{link.category}</div>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Community; 