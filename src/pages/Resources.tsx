import { motion } from "framer-motion";
import { ExternalLink, Youtube, BookOpen, Clock, Tag, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Resources = () => {
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get('type') || 'blogs';

  const resources = {
    blogs: [
      {
        category: "DevOps",
        items: [
          {
            title: "Getting Started with CI/CD Pipelines",
            description: "A comprehensive guide to setting up your first CI/CD pipeline using popular tools like Jenkins, GitLab CI, and GitHub Actions.",
            link: "https://your-blog-url.com/cicd-pipelines",
            date: "2024-01-15",
            readTime: "8 min read",
            tags: ["CI/CD", "DevOps", "Automation"]
          },
          {
            title: "Docker Best Practices for Production",
            description: "Essential Docker practices and patterns for building secure, efficient, and maintainable containerized applications.",
            link: "https://your-blog-url.com/docker-best-practices",
            date: "2024-02-01",
            readTime: "12 min read",
            tags: ["Docker", "Security", "Production"]
          },
          {
            title: "Kubernetes Monitoring Guide",
            description: "Learn how to implement comprehensive monitoring solutions for your Kubernetes clusters using Prometheus and Grafana.",
            link: "https://your-blog-url.com/kubernetes-monitoring",
            date: "2024-02-15",
            readTime: "10 min read",
            tags: ["Kubernetes", "Monitoring", "DevOps"]
          }
        ]
      },
      {
        category: "ERPNext",
        items: [
          {
            title: "Custom ERPNext Module Development",
            description: "Step-by-step guide to developing custom modules in ERPNext to extend functionality for your business needs.",
            link: "https://your-blog-url.com/erpnext-custom-modules",
            date: "2024-01-20",
            readTime: "15 min read",
            tags: ["ERPNext", "Development", "Customization"]
          },
          {
            title: "ERPNext Integration Patterns",
            description: "Explore common integration patterns and best practices for connecting ERPNext with external systems.",
            link: "https://your-blog-url.com/erpnext-integration",
            date: "2024-02-10",
            readTime: "10 min read",
            tags: ["ERPNext", "Integration", "API"]
          }
        ]
      },
      {
        category: "Cloud Architecture",
        items: [
          {
            title: "AWS vs Azure vs GCP",
            description: "A detailed comparison of major cloud providers for enterprise applications.",
            link: "https://your-blog-url.com/cloud-comparison",
            date: "2024-02-20",
            readTime: "20 min read",
            tags: ["Cloud", "AWS", "Azure", "GCP"]
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
            description: "Complete walkthrough of deploying applications on Kubernetes, including configuration, scaling, and monitoring.",
            link: "https://youtube.com/your-video-1",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
            duration: "45:20",
            views: "15K"
          },
          {
            title: "GitOps with ArgoCD",
            description: "Learn how to implement GitOps practices using ArgoCD for Kubernetes deployments.",
            link: "https://youtube.com/your-video-2",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
            duration: "32:15",
            views: "8.5K"
          },
          {
            title: "Terraform Infrastructure as Code",
            description: "Master infrastructure as code using Terraform with real-world examples.",
            link: "https://youtube.com/your-video-3",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
            duration: "55:00",
            views: "12K"
          }
        ]
      },
      {
        category: "ERPNext Guides",
        items: [
          {
            title: "ERPNext Installation Tutorial",
            description: "Step-by-step guide to installing and configuring ERPNext on different platforms.",
            link: "https://youtube.com/your-video-4",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
            duration: "28:45",
            views: "20K"
          },
          {
            title: "Custom Report Development",
            description: "Learn to create custom reports in ERPNext using Report Builder and Script Report.",
            link: "https://youtube.com/your-video-5",
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
            duration: "40:10",
            views: "5.2K"
          }
        ]
      }
    ]
  };

  const renderHero = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient-y" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-block p-3 bg-gray-800/50 rounded-full"
          >
            {contentType === 'blogs' ? (
              <BookOpen className="w-8 h-8 text-primary" />
            ) : (
              <Youtube className="w-8 h-8 text-primary" />
            )}
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
          >
            {contentType === 'blogs' ? 'Technical Blog Posts' : 'Video Tutorials'}
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            {contentType === 'blogs' 
              ? 'Deep dives into DevOps practices, ERPNext solutions, and cloud architecture.' 
              : 'Step-by-step video guides for implementing DevOps and ERPNext solutions.'}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );

  const renderBlogCard = (blog: any, index: number) => (
    <motion.a
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group block p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
      <p className="text-gray-400 mb-4">{blog.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag: string, idx: number) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {blog.readTime}
        </span>
        <span>{blog.date}</span>
      </div>
    </motion.a>
  );

  const renderVideoCard = (video: any, index: number) => (
    <motion.a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="aspect-video relative">
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
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-gray-400 mb-4">{video.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {video.duration}
          </span>
          <span>{video.views} views</span>
        </div>
      </div>
    </motion.a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        {renderHero()}
        
        <div className="container mx-auto px-4 py-16">
          {resources[contentType === 'blogs' ? 'blogs' : 'videos'].map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-8">
                <Tag className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-white">{category.category}</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {category.items.map((item, index) => (
                  contentType === 'blogs' 
                    ? renderBlogCard(item, index)
                    : renderVideoCard(item, index)
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;