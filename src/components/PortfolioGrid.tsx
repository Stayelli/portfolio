import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category: string;
  description?: string;
}

interface PortfolioGridProps {
  isDarkMode: boolean;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ isDarkMode }) => {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Portfolio items - organized by discipline
  const portfolioItems: PortfolioItem[] = [
    // Photography (Row 1)
    { id: 1, src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Street Photography", category: "Manila Streets", description: "Capturing the vibrant energy of Manila's urban landscape" },
    { id: 2, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Portrait Session", category: "Studio Work", description: "Professional portrait photography with creative lighting" },
    { id: 3, src: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Commercial Photography", category: "Product Showcase", description: "High-end commercial photography for brand campaigns" },
    
    // Video Production (Row 2)
    { id: 4, src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Cinematic Short", category: "Film Production", description: "Director of Photography work on narrative short films" },
    { id: 5, src: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Music Video", category: "Creative Direction", description: "Full production and post-processing for music artists" },
    { id: 6, src: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Documentary Work", category: "Storytelling", description: "Documentary cinematography and color grading" },
    
    // 3D & Digital Art (Row 3)
    { id: 7, src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", title: "3D Visualization", category: "Architectural Render", description: "Photorealistic 3D modeling and rendering" },
    { id: 8, src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Digital Retouching", category: "Photo Enhancement", description: "Professional photo editing and digital manipulation" },
    { id: 9, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Motion Graphics", category: "Animation", description: "Dynamic motion graphics and visual effects" },
    
    // Additional works for more pages
    { id: 10, src: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Fashion Photography", category: "Editorial", description: "High-fashion editorial photography" },
    { id: 11, src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Brand Campaign", category: "Commercial Video", description: "Complete brand campaign video production" },
    { id: 12, src: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800", title: "3D Character", category: "Digital Sculpting", description: "Character modeling and texturing" }
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = pageIndex * scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setCurrentPage(pageIndex);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const newPage = Math.round(scrollLeft / containerWidth);
      setCurrentPage(newPage);
    }
  };

  const openLightbox = (item: PortfolioItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : portfolioItems.length - 1;
    } else {
      newIndex = currentIndex < portfolioItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(portfolioItems[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return portfolioItems.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      {/* Portfolio Grid Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={() => scrollToPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:-translate-x-1'
          }`}
          style={{
            background: isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(59, 130, 246, 0.2)'
          }}
        >
          <ChevronLeft size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
        </button>

        <button
          onClick={() => scrollToPage(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage === totalPages - 1}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:translate-x-1'
          }`}
          style={{
            background: isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(59, 130, 246, 0.2)'
          }}
        >
          <ChevronRight size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          <div className="flex" style={{ width: `${totalPages * 100}%` }}>
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              const pageItems = portfolioItems.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);
              
              return (
                <div key={pageIndex} className="w-full snap-start flex-shrink-0 px-8">
                  {/* 2x3 Grid Layout */}
                  <div className="grid grid-cols-3 grid-rows-2 gap-6 md:gap-8 h-[600px] md:h-[700px]">
                    {pageItems.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => openLightbox(item)}
                        className="group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu"
                        style={{
                          background: isDarkMode 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(20px)',
                          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)',
                          boxShadow: isDarkMode
                            ? '0 25px 80px rgba(0, 0, 0, 0.4)'
                            : '0 25px 80px rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        <div className="p-2 h-full">
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-2 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center rounded-2xl">
                          <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 px-4">
                            <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm md:text-base text-gray-200">{item.category}</p>
                          </div>
                        </div>
                        
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-blue-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-blue-500 scale-125'
                  : isDarkMode
                    ? 'bg-white/30 hover:bg-white/50'
                    : 'bg-gray-400 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />
          
          {/* Modal Content */}
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
            >
              <X size={24} />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={32} />
            </button>
            
            {/* Image Container */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <p className="text-lg text-blue-600 mb-3">{selectedImage.category}</p>
                {selectedImage.description && (
                  <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};