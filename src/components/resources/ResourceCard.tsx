import React from 'react';
import { ExternalLink, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResourceCardProps {
  resource: {
    title: string;
    description: string;
    link?: string;
    date?: string;
    readTime?: string;
    tags?: string[];
    thumbnail?: string;
    duration?: string;
    views?: string;
    type: string; // Changed from "video" | "blog" to string
    url: string; // Added to match Supabase schema
  };
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const isBlog = resource.type === 'blog';
  const link = resource.url || resource.link; // Use url from Supabase if available

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group block p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {!isBlog && resource.thumbnail && (
        <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {resource.duration && (
            <span className="absolute bottom-2 right-2 px-2 py-1 text-xs bg-black/70 text-white rounded">
              {resource.duration}
            </span>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
      
      <p className="text-gray-400 mb-4 line-clamp-2">{resource.description}</p>
      
      {resource.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        {isBlog ? (
          <>
            {resource.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {resource.readTime}
              </span>
            )}
            {resource.date && <span>{resource.date}</span>}
          </>
        ) : (
          resource.views && <span>{resource.views} views</span>
        )}
      </div>
    </motion.a>
  );
};

export default ResourceCard;