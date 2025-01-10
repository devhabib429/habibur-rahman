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
    type: string;
    url: string;
  };
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const isBlog = resource.type === 'blog';
  const link = resource.url || resource.link;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group block p-6 bg-white rounded-xl border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:translate-y-[-2px]"
    >
      {!isBlog && resource.thumbnail && (
        <div className="relative mb-4 rounded-lg overflow-hidden group-hover:shadow-xl transition-all duration-300">
          <div className="aspect-video relative">
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {resource.duration && (
              <span className="absolute bottom-2 right-2 px-2 py-1 text-xs bg-black/70 text-white rounded backdrop-blur-sm">
                {resource.duration}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-black group-hover:text-gray-800 transition-colors line-clamp-2">
          {resource.title}
        </h3>
        <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors flex-shrink-0 ml-2" />
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-800 transition-colors">
        {resource.description}
      </p>
      
      {resource.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs rounded-full bg-black/5 text-black border border-black/10 transition-colors group-hover:bg-black/10"
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
            {resource.date && (
              <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
                {resource.date}
              </span>
            )}
          </>
        ) : (
          resource.views && (
            <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
              {resource.views} views
            </span>
          )
        )}
      </div>
    </motion.a>
  );
};

export default ResourceCard;