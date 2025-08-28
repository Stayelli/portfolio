import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category: 'photography' | 'video' | '3d' | 'retouching';
  description?: string;
  isVideo?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  // Photography
  { id: 1, src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Street Photography", category: "photography", description: "Capturing the vibrant energy of Manila's urban landscape" },
  { id: 2, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Portrait Session", category: "photography", description: "Professional portrait photography with creative lighting" },
  { id: 3, src: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Commercial Photography", category: "photography", description: "High-end commercial photography for brand campaigns" },
  { id: 4, src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Fashion Photography", category: "photography", description: "High-fashion editorial photography" },
  { id: 5, src: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Lifestyle Photography", category: "photography", description: "Natural lifestyle and candid moments" },
  { id: 6, src: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Event Photography", category: "photography", description: "Professional event and celebration photography" },

  // Video Production
  { id: 7, src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Cinematic Short", category: "video", description: "Director of Photography work on narrative short films", isVideo: true },
  { id: 8, src: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Music Video", category: "video", description: "Full production and post-processing for music artists", isVideo: true },
  { id: 9, src: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Documentary Work", category: "video", description: "Documentary cinematography and color grading", isVideo: true },
  { id: 10, src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Brand Campaign", category: "video", description: "Complete brand campaign video production", isVideo: true },
  { id: 11, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Commercial Video", category: "video", description: "High-end commercial video production", isVideo: true },
  { id: 12, src: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Corporate Video", category: "video", description: "Professional corporate video content", isVideo: true },

  // 3D
  { id: 13, src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", title: "3D Visualization", category: "3d", description: "Photorealistic 3D modeling and rendering" },
  { id: 14, src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Architectural Render", category: "3d", description: "Detailed architectural visualization" },
  { id: 15, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "3D Character", category: "3d", description: "Character modeling and texturing" },
  { id: 16, src: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Product Visualization", category: "3d", description: "3D product modeling and rendering" },
  { id: 17, src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Motion Graphics", category: "3d", description: "Dynamic 3D motion graphics and animation" },
  { id: 18, src: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Environment Design", category: "3d", description: "3D environment and scene creation" },

  // Photo Editing & Retouching
  { id: 19, src: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Digital Retouching", category: "retouching", description: "Professional photo editing and digital manipulation" },
  { id: 20, src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Color Grading", category: "retouching", description: "Advanced color correction and grading" },
  { id: 21, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Beauty Retouching", category: "retouching", description: "High-end beauty and fashion retouching" },
  { id: 22, src: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Composite Work", category: "retouching", description: "Complex photo compositing and manipulation" },
  { id: 23, src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Restoration", category: "retouching", description: "Photo restoration and enhancement" },
  { id: 24, src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Creative Editing", category: "retouching", description: "Artistic photo manipulation and effects" }
];

const categoryLabels = {
  photography: 'Photography',
  video: 'Video Production',
  '3d': '3D',
  retouching: 'Photo Editing & Retouching'
};

export const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter && ['photography', 'video', '3d', 'retouching'].includes(filter)) {
      setActiveFilter(filter);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

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
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredItems[newIndex]);
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
  }, [selectedImage, filteredItems]);

  return (
    <div className="min-h-screen transition-all duration-500 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-all duration-1000"></div>
      </div>

      {/* Header */}
      <header className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="group flex items-center space-x-2 mb-8 p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            <ArrowLeft size={20} className={`transition-transform duration-300 group-hover:-translate-x-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} />
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Back to Home
            </span>
          </button>

          {/* Hero Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Photography, Video Production, 3D, and Retouching — curated works across disciplines.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="absolute top-8 right-6">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(59, 130, 246, 0.1)',
                backdropFilter: 'blur(20px)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : isDarkMode
                  ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Works
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : isDarkMode
                    ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 transform-gpu aspect-square"
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
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200">{categoryLabels[item.category]}</p>
                  {item.isVideo && (
                    <div className="mt-2 text-xs bg-red-500 px-2 py-1 rounded">VIDEO</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />
          
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
            >
              <X size={24} />
            </button>
            
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
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {selectedImage.isVideo ? (
                <div className="w-full h-auto max-h-[70vh] bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="text-6xl mb-4">▶️</div>
                    <p className="text-xl">Video Player Placeholder</p>
                    <p className="text-gray-400 mt-2">Video content would be embedded here</p>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <p className="text-lg text-blue-600 mb-3">{categoryLabels[selectedImage.category]}</p>
                {selectedImage.description && (
                  <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};