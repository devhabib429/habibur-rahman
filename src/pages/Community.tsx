import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MessageSquare, Users, Eye, Calendar, Mic, Book, Video, Code, Github, Twitter, Globe, FileText, Star, Zap } from "lucide-react";

const Community = () => {
  const sections = [
    {
      title: "Latest",
      description: "Stay updated with the latest developments and news",
      icon: <Clock className="w-6 h-6" />,
      links: [
        { 
          text: "New Blog: Implementing CI/CD with GitHub Actions", 
          url: "#",
          date: "2 days ago",
          icon: <FileText className="w-4 h-4" />
        },
        { 
          text: "Podcast Episode: DevOps Best Practices", 
          url: "#",
          date: "1 week ago",
          icon: <Mic className="w-4 h-4" />
        },
        { 
          text: "Video Tutorial: Setting Up ERPNext", 
          url: "#",
          date: "2 weeks ago",
          icon: <Video className="w-4 h-4" />
        },
        { 
          text: "Resource: Complete DevOps Roadmap", 
          url: "#",
          date: "3 weeks ago",
          icon: <Book className="w-4 h-4" />
        },
      ]
    },
    {
      title: "Discussion",
      description: "Join ongoing conversations and share your thoughts",
      icon: <MessageSquare className="w-6 h-6" />,
      links: [
        { 
          text: "DevOps Community: Kubernetes vs Docker Swarm", 
          url: "#",
          participants: "24 participants",
          icon: <Users className="w-4 h-4" />
        },
        { 
          text: "ERPNext Forum: Custom Field Implementation", 
          url: "#",
          participants: "18 participants",
          icon: <Code className="w-4 h-4" />
        },
        { 
          text: "GitHub Discussion: Feature Request for Dashboard", 
          url: "#",
          participants: "12 participants",
          icon: <Github className="w-4 h-4" />
        },
      ]
    },
    {
      title: "Build With Me",
      description: "Collaborative projects and learning opportunities",
      icon: <Users className="w-6 h-6" />,
      links: [
        { 
          text: "Open Source: ERPNext Dashboard Extension", 
          url: "#",
          collaborators: "5 collaborators",
          icon: <Code className="w-4 h-4" />
        },
        { 
          text: "Community Project: DevOps Automation Toolkit", 
          url: "#",
          collaborators: "8 collaborators",
          icon: <Zap className="w-4 h-4" />
        },
        { 
          text: "Learning Group: React + TypeScript Fundamentals", 
          url: "#",
          collaborators: "15 collaborators",
          icon: <Users className="w-4 h-4" />
        },
      ]
    },
    {
      title: "Have A Look",
      description: "Explore interesting resources and showcases",
      icon: <Eye className="w-6 h-6" />,
      links: [
        { 
          text: "Featured Project: AI-Powered Analytics Dashboard", 
          url: "#",
          category: "Showcase",
          icon: <Star className="w-4 h-4" />
        },
        { 
          text: "Resource Library: Complete DevOps Guide", 
          url: "#",
          category: "Resources",
          icon: <Book className="w-4 h-4" />
        },
        { 
          text: "Community Spotlight: Success Story with ERPNext", 
          url: "#",
          category: "Success Stories",
          icon: <Globe className="w-4 h-4" />
        },
        { 
          text: "Upcoming Events Calendar", 
          url: "#",
          category: "Events",
          icon: <Calendar className="w-4 h-4" />
        },
      ]
    }
  ];

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
              {sections.map((section, index) => (
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