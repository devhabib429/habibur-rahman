import React from "react";
import { 
  Clock, 
  MessageSquare, 
  Users, 
  Eye, 
  Calendar, 
  Mic, 
  Book, 
  Video, 
  Code, 
  Github, 
  Globe, 
  FileText, 
  Star, 
  Zap 
} from "lucide-react";
import { ReactNode } from "react";

export interface ResourceLink {
  text: string;
  url: string;
  date?: string;
  participants?: string;
  collaborators?: string;
  category?: string;
  icon: ReactNode;
}

export interface ResourceSection {
  title: string;
  description: string;
  icon: ReactNode;
  links: ResourceLink[];
}

export const resourceCenterData: ResourceSection[] = [
  {
    title: "Latest",
    description: "Stay updated with the latest developments and news",
    icon: <Clock className="w-6 h-6" />,
    links: [
      { 
        text: "New blog: Implementing CI/CD with GitHub Actions", 
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