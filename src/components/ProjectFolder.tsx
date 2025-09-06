import React from 'react';
import { Folder, FolderOpen, Calendar, User, Tag } from 'lucide-react';
import { PortfolioProject } from '../data/portfolioData';

interface ProjectFolderProps {
  project: PortfolioProject;
  isOpen: boolean;
  onClick: () => void;
  isDarkMode: boolean;
}

export const ProjectFolder: React.FC<ProjectFolderProps> = ({
  project,
  isOpen,
  onClick,
  isDarkMode
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 transform-gpu"
      style={{
        background: isDarkMode 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(255, 255, 255, 0.8)',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: isDarkMode
          ? '0 25px 80px rgba(0, 0, 0, 0.4)'
          : '0 25px 80px rgba(59, 130, 246, 0.3)'
      }}
    >
      <div className="p-2 md:p-3 h-full">
        {/* Cover Image */}
        <div className="relative aspect-square mb-3 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 group-hover:brightness-110"
          />
          
          {/* Folder Icon Overlay */}
          <div className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 rounded-lg backdrop-blur-sm bg-black/30 transition-all duration-300">
            {isOpen ? (
              <FolderOpen size={16} className="md:w-5 md:h-5 text-white animate-pulse" />
            ) : (
              <Folder size={16} className="md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
          
          {/* Image Count Badge */}
          <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm bg-black/50 text-white text-xs md:text-sm font-medium">
            {project.images.length} items
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm bg-blue-500/80 text-white text-xs md:text-sm font-medium capitalize">
            {project.category}
          </div>
        </div>
        
        {/* Project Info */}
        <div className="px-1 md:px-2">
          <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          
          {/* Project Meta */}
          <div className="flex flex-wrap gap-1 md:gap-2 text-xs text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={10} className="md:w-3 md:h-3" />
              <span>{project.year}</span>
            </div>
            {project.client && (
              <div className="flex items-center gap-1">
                <User size={10} className="md:w-3 md:h-3" />
                <span className="truncate max-w-20 md:max-w-none">{project.client}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Tag size={10} className="md:w-3 md:h-3" />
              <span>{project.tags[0]}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-2 md:inset-3 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center rounded-xl md:rounded-2xl">
        <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="text-xs md:text-sm font-medium animate-in slide-in-from-bottom duration-300">
            Click to explore project
          </div>
        </div>
      </div>
      
      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-blue-500/20"></div>
    </div>
  );
};