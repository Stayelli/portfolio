import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, User, Tag, Play, Image as ImageIcon } from 'lucide-react';
import { PortfolioProject, ProjectImage } from '../data/portfolioData';

interface ProjectViewerProps {
  project: PortfolioProject | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  onClose,
  isDarkMode
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get next and previous image URLs
  const nextImageUrl =
    project && project.images.length > 1
      ? project.images[(currentImageIndex + 1) % project.images.length].src
      : null;
  const prevImageUrl =
    project && project.images.length > 1
      ? project.images[
          (currentImageIndex - 1 + project.images.length) % project.images.length
        ].src
      : null;

  // Preload next and previous images for smoother navigation
  useEffect(() => {
    if (nextImageUrl) {
      const img = new window.Image();
      img.src = nextImageUrl;
    }
    if (prevImageUrl) {
      const img = new window.Image();
      img.src = prevImageUrl;
    }
  }, [nextImageUrl, prevImageUrl]);

  // Reset to first image when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!project) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [project, currentImageIndex]);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev > 0 ? prev - 1 : project.images.length - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev < project.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  if (!project) return null;

  const currentImage = project.images[currentImageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative max-w-7xl max-h-full w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 mx-2 md:mx-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 md:top-4 right-2 md:right-4 z-20 p-2 md:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 hover:rotate-90 transition-all duration-300 backdrop-blur-sm border border-white/20"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        
        {/* Navigation Buttons */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 hover:-translate-x-1 transition-all duration-300 backdrop-blur-sm border border-white/20 group"
            >
              <ChevronLeft size={24} className="md:w-8 md:h-8 group-hover:scale-125 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 hover:translate-x-1 transition-all duration-300 backdrop-blur-sm border border-white/20 group"
            >
              <ChevronRight size={24} className="md:w-8 md:h-8 group-hover:scale-125 transition-transform duration-300" />
            </button>
          </>
        )}
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.01]">
          {/* Main Image/Video Display */}
          <div className="relative">
            {currentImage.isVideo ? (
              <div className="w-full h-auto max-h-[50vh] md:max-h-[60vh] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                <div className="text-white text-center p-4 md:p-8 relative z-10">
                  <div className="text-4xl md:text-6xl mb-2 md:mb-4 animate-bounce">
                    <Play className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
                  </div>
                  <p className="text-lg md:text-xl font-semibold animate-pulse">Video Content</p>
                  <p className="text-gray-400 mt-1 md:mt-2 animate-fade-in text-sm md:text-base">
                    {currentImage.title}
                  </p>
                </div>
              </div>
            ) : (
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-contain" // Remove transition/hover classes
                loading="lazy"
              />
            )}
            
            {/* Image Counter */}
            {project.images.length > 1 && (
              <div className="absolute top-2 md:top-4 left-2 md:left-4 px-3 md:px-4 py-1 md:py-2 rounded-full bg-black/50 text-white text-sm md:text-base backdrop-blur-sm border border-white/20">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}
            
            {/* Media Type Indicator */}
            <div className="absolute top-2 md:top-4 right-12 md:right-20 px-3 md:px-4 py-1 md:py-2 rounded-full bg-black/50 text-white text-sm md:text-base backdrop-blur-sm border border-white/20 flex items-center gap-2">
              {currentImage.isVideo ? (
                <>
                  <Play size={14} className="md:w-4 md:h-4" />
                  <span>Video</span>
                </>
              ) : (
                <>
                  <ImageIcon size={14} className="md:w-4 md:h-4" />
                  <span>Image</span>
                </>
              )}
            </div>
          </div>
          
          {/* Project Information */}
          <div className="p-4 md:p-6 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              {/* Project Title and Current Image Info */}
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-in slide-in-from-left duration-500">
                  {project.title}
                </h2>
                <h3 className="text-lg md:text-xl text-blue-600 dark:text-blue-400 mb-2 animate-in slide-in-from-left duration-500 delay-100">
                  {currentImage.title}
                </h3>
                {currentImage.description && (
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 animate-in slide-in-from-left duration-500 delay-200">
                    {currentImage.description}
                  </p>
                )}
              </div>
              
              {/* Project Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="md:w-5 md:h-5 text-blue-500" />
                  <span className="text-sm md:text-base">{project.year}</span>
                </div>
                {project.client && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User size={16} className="md:w-5 md:h-5 text-green-500" />
                    <span className="text-sm md:text-base">{project.client}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Tag size={16} className="md:w-5 md:h-5 text-purple-500" />
                  <span className="text-sm md:text-base capitalize">{project.category}</span>
                </div>
              </div>
              
              {/* Project Description */}
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed animate-in slide-in-from-left duration-500 delay-300">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs md:text-sm font-medium animate-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Thumbnail Navigation */}
          {project.images.length > 1 && (
            <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
                {project.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'ring-2 ring-blue-500 scale-110'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {image.isVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play size={12} className="md:w-4 md:h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};