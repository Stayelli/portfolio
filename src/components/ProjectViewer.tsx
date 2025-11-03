import React, { useEffect, useState, Fragment } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, User, Tag, Play, Image as ImageIcon } from 'lucide-react';
import { PortfolioProject, ProjectImage } from '../data/portfolioData';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectViewerProps {
  project: PortfolioProject | null;
  onClose: () => void;
  isDarkMode: boolean;
}

// Reusable glass style
const glassCardStyle = (isDarkMode: boolean) => ({
  background: isDarkMode 
    ? 'rgba(18, 18, 18, 0.8)' // Darker glass for modal
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
});

const YouTubeEmbed: React.FC<{ youtubeId: string; title: string }> = ({ youtubeId, title }) => (
  <div className="relative w-full aspect-video bg-black rounded-t-lg overflow-hidden">
    <iframe
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  </div>
);

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  onClose,
  isDarkMode
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
    }
  }, [project]);

  if (!project) return null;

  const currentImage = project.images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Glass button for close
  const GlassButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }> = ({ onClick, children, className = '' }) => (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-full transition-all duration-300 ${className}`}
      style={{
        ...glassCardStyle(isDarkMode),
        background: isDarkMode ? 'rgba(18,18,18, 0.8)' : 'rgba(255,255,255, 0.8)',
      }}
    >
      {children}
    </button>
  );

  return (
    <Transition appear show={!!project} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop overlay with blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4 md:p-8">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* === MAIN PANEL: MODIFIED (Instagram-style Card) === */}
              <Dialog.Panel 
                className="relative w-full max-w-4xl max-h-[90vh] transform text-left align-middle shadow-xl transition-all 
                           flex flex-col rounded-2xl overflow-hidden"
                style={glassCardStyle(isDarkMode)}
              >
                {/* Close button (always visible) */}
                <div className="absolute top-4 right-4 z-20">
                    <GlassButton onClick={onClose}>
                      <X className="w-5 h-5 text-gray-900 dark:text-white" />
                    </GlassButton>
                </div>
                
                {/* Scrollable container for all content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">

                  {/* --- 1. Media Area (Top) --- */}
                  <div className="w-full flex-shrink-0 flex flex-col bg-black/10 dark:bg-black/20 relative">
                    
                    {/* Main Image/Video Display */}
                    <div className="flex-grow flex items-center justify-center overflow-hidden relative min-h-[300px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImage.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          {currentImage.youtubeId ? (
                            <YouTubeEmbed youtubeId={currentImage.youtubeId} title={currentImage.title} />
                          ) : (
                            <img
                              src={currentImage.src}
                              alt={currentImage.title}
                              className="max-w-full max-h-[70vh] object-contain"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Prev/Next Controls */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
                          >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
                          >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Scroller */}
                    {project.images.length > 1 && (
                      <div className="flex-shrink-0 p-4 bg-black/20 dark:bg-black/30 overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-3 h-20 justify-center">
                          {project.images.map((image, index) => (
                            <button
                              key={image.id}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                                index === currentImageIndex
                                  ? 'ring-2 ring-blue-500 scale-105'
                                  : 'hover:scale-105 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={image.youtubeId ? image.thumbnail : image.src}
                                alt={image.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              {image.isVideo && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <Play size={16} className="text-white" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- 2. Info Area (Bottom) --- */}
                  <div className="w-full flex-shrink-0 p-6 md:p-8">
                    
                    <Dialog.Title as="h3" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 pr-10">
                      {project.title}
                    </Dialog.Title>

                    <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                      {project.description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-500">Year</span>
                          <p className="text-base text-gray-800 dark:text-gray-200">{project.year}</p>
                        </div>
                      </div>
                      {project.client && (
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-500">Client</span>
                            <p className="text-base text-gray-800 dark:text-gray-200">{project.client}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-500">Tags</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

