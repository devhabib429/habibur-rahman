import { motion } from "framer-motion";
import { ExternalLink, Youtube, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Resources = () => {
  const resources = {
    blogs: [
      {
        category: "DevOps",
        items: [
          {
            title: "Getting Started with CI/CD Pipelines",
            description: "Learn how to set up your first CI/CD pipeline using popular tools.",
            link: "https://your-blog-url.com/cicd-pipelines",
            date: "2024-01-15"
          },
          {
            title: "Docker Best Practices",
            description: "Essential Docker practices for production environments.",
            link: "https://your-blog-url.com/docker-best-practices",
            date: "2024-02-01"
          }
        ]
      },
      {
        category: "ERPNext",
        items: [
          {
            title: "Custom ERPNext Module Development",
            description: "Guide to developing custom modules in ERPNext.",
            link: "https://your-blog-url.com/erpnext-custom-modules",
            date: "2024-01-20"
          }
        ]
      }
    ],
    videos: [
      {
        category: "DevOps Tutorials",
        items: [
          {
            title: "Kubernetes Deployment Guide",
            description: "Step-by-step guide to deploying applications on Kubernetes.",
            link: "https://youtube.com/your-video-1",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
          }
        ]
      },
      {
        category: "ERPNext Guides",
        items: [
          {
            title: "ERPNext Installation Tutorial",
            description: "Complete guide to installing ERPNext on your server.",
            link: "https://youtube.com/your-video-2",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
          >
            Resources & Content
          </motion.h1>

          {/* Blogs Section */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-white">Blog Posts</h2>
            </div>
            
            {resources.blogs.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-8"
              >
                <h3 className="text-xl font-medium text-gray-300 mb-4">{category.category}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {category.items.map((blog, blogIdx) => (
                    <motion.a
                      key={blogIdx}
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-6 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                          {blog.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                      </div>
                      <p className="text-gray-400 mb-2">{blog.description}</p>
                      <span className="text-sm text-gray-500">{blog.date}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Videos Section */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <Youtube className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-white">Video Tutorials</h2>
            </div>
            
            {resources.videos.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-8"
              >
                <h3 className="text-xl font-medium text-gray-300 mb-4">{category.category}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {category.items.map((video, videoIdx) => (
                    <motion.a
                      key={videoIdx}
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-primary/50 overflow-hidden transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="aspect-video w-full bg-gray-900 relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Youtube className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                            {video.title}
                          </h4>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                        </div>
                        <p className="text-gray-400">{video.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;