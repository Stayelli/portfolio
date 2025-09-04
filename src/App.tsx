import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Camera, Video, Palette, Music, Box, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSocialIcons } from './components/AnimatedSocialIcons';
import { Enhanced3DNavigation } from './components/Enhanced3DNavigation';
import { ScrollAnimation, ParallaxBackground, Floating3DElements } from './components/ScrollAnimations';
import { Analytics } from '@vercel/analytics/react';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState<'all' | 'photography' | 'video' | '3d' | 'retouching'>('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Portfolio data
  const portfolioItems = [
    // Photography
    { id: 1, src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Portrait Session", category: "photography", description: "Professional portrait photography with natural lighting" },
    { id: 2, src: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Commercial Product", category: "photography", description: "High-end product photography for commercial use" },
    { id: 3, src: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Fashion Editorial", category: "photography", description: "Editorial fashion photography with creative styling" },
    { id: 4, src: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Street Photography", category: "photography", description: "Candid street photography capturing urban life" },
    { id: 5, src: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Architectural", category: "photography", description: "Architectural photography showcasing modern design" },
    { id: 6, src: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Event Coverage", category: "photography", description: "Professional event photography and documentation" },
    
    // Video Production
    { id: 7, src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Corporate Video", category: "video", description: "Corporate promotional video production", isVideo: true },
    { id: 8, src: "https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Music Video", category: "video", description: "Creative music video with dynamic cinematography", isVideo: true },
    { id: 9, src: "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Documentary", category: "video", description: "Documentary film production and editing", isVideo: true },
    { id: 10, src: "https://images.pexels.com/photos/3184462/pexels-photo-3184462.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Commercial Ad", category: "video", description: "High-impact commercial advertisement production", isVideo: true },
    { id: 11, src: "https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Short Film", category: "video", description: "Narrative short film with cinematic quality", isVideo: true },
    { id: 12, src: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Event Video", category: "video", description: "Professional event videography and post-production", isVideo: true },
    
    // 3D
    { id: 13, src: "https://images.pexels.com/photos/3184459/pexels-photo-3184459.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Architectural Viz", category: "3d", description: "3D architectural visualization and rendering" },
    { id: 14, src: "https://images.pexels.com/photos/3184458/pexels-photo-3184458.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Product Render", category: "3d", description: "Photorealistic 3D product rendering" },
    { id: 15, src: "https://images.pexels.com/photos/3184457/pexels-photo-3184457.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Character Design", category: "3d", description: "3D character modeling and animation" },
    { id: 16, src: "https://images.pexels.com/photos/3184456/pexels-photo-3184456.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Environment Art", category: "3d", description: "3D environment design and world building" },
    { id: 17, src: "https://images.pexels.com/photos/3184455/pexels-photo-3184455.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Motion Graphics", category: "3d", description: "3D motion graphics and visual effects" },
    { id: 18, src: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Abstract Art", category: "3d", description: "Abstract 3D art and experimental design" },
    
    // Photo Editing & Retouching
    { id: 19, src: "https://images.pexels.com/photos/3184453/pexels-photo-3184453.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Beauty Retouching", category: "retouching", description: "Professional beauty and fashion retouching" },
    { id: 20, src: "https://images.pexels.com/photos/3184452/pexels-photo-3184452.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Color Grading", category: "retouching", description: "Advanced color grading and tone mapping" },
    { id: 21, src: "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Composite Work", category: "retouching", description: "Complex photo compositing and manipulation" },
    { id: 22, src: "https://images.pexels.com/photos/3184450/pexels-photo-3184450.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Restoration", category: "retouching", description: "Photo restoration and damage repair" },
    { id: 23, src: "https://images.pexels.com/photos/3184449/pexels-photo-3184449.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Creative Edit", category: "retouching", description: "Creative photo editing and artistic enhancement" },
    { id: 24, src: "https://images.pexels.com/photos/3184448/pexels-photo-3184448.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Commercial Retouch", category: "retouching", description: "Commercial retouching for advertising and marketing" }
  ];

  const categoryLabels = {
    photography: "Photography",
    video: "Video Production", 
    "3d": "3D",
    retouching: "Photo Editing & Retouching"
  };

  // Filter portfolio items based on active filter
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  // Lightbox functions
  const openLightbox = (item: any) => {
    // Add smooth entrance animation
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    // Add smooth exit animation
    document.body.style.overflow = 'unset'; // Restore scrolling
    setSelectedImage(null);
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
    
    // Add smooth transition effect
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
      lightboxContent.classList.add('animate-pulse');
      setTimeout(() => {
        lightboxContent.classList.remove('animate-pulse');
      }, 200);
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, filteredItems]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200; // Increased offset for better detection
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      
      // Special handling for contact section (last section)
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const { offsetTop } = contactElement;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // If we're near the bottom of the page or in the contact section
        if (scrollPosition >= offsetTop - 100 || 
            window.scrollY + windowHeight >= documentHeight - 100) {
          setActiveSection('contact');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 120; // Adjust for navbar height + extra padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen transition-all duration-500 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-all duration-1000"></div>
        
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.01}% ${50 + Math.sin(scrollY * 0.01) * 10}%, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(147, 51, 234, 0.05) 50%, 
              transparent 100%)`
          }}
        ></div>

        {/* Enhanced floating glass orbs with 3D transforms */}
        <ParallaxBackground speed={0.2}>
          <div 
            className="absolute w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl rounded-full"
            style={{
              top: '10%',
              left: '10%',
              transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg) rotateY(${scrollY * 0.03}deg)`,
              animation: 'float-1 6s ease-in-out infinite',
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.2)'
            }}
          ></div>
          <div 
            className="absolute w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-white/8 dark:to-white/4 backdrop-blur-2xl rounded-full"
            style={{
              top: '30%',
              right: '15%',
              transform: `perspective(1000px) rotateX(${-scrollY * 0.03}deg) rotateY(${scrollY * 0.04}deg)`,
              animation: 'float-2 8s ease-in-out infinite',
              animationDelay: '2s',
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.2)'
            }}
          ></div>
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 dark:from-white/6 dark:to-white/3 backdrop-blur-2xl rounded-full"
            style={{
              bottom: '20%',
              left: '20%',
              transform: `perspective(1000px) rotateX(${scrollY * 0.04}deg) rotateY(${-scrollY * 0.02}deg)`,
              animation: 'float-3 7s ease-in-out infinite',
              animationDelay: '4s',
              boxShadow: '0 20px 60px rgba(99, 102, 241, 0.2)'
            }}
          ></div>
        </ParallaxBackground>
      </div>

      {/* Floating 3D Elements */}
      <Floating3DElements isDarkMode={isDarkMode} />

      {/* Enhanced Navigation */}
      <Enhanced3DNavigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Hero Section with Enhanced Animations */}
      <section id="home" className="min-h-screen flex items-center pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text content with scroll animations */}
            <div className="text-left">
              <ScrollAnimation animation="slideUp" delay={0.2}>
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-6 leading-none tracking-tight">
                  <span 
                    className="inline-block transition-all duration-500 hover:scale-110 hover:-rotate-2 relative z-10"
                    style={{
                      textShadow: isDarkMode 
                        ? '0 10px 30px rgba(255, 255, 255, 0.1)' 
                        : '0 10px 30px rgba(59, 130, 246, 0.2)',
                      color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}
                  >
                    Stay
                  </span>
                  <span 
                    className="inline-block transition-all duration-500 hover:scale-110 hover:rotate-2 text-gray-600 dark:text-gray-400 relative z-10"
                    style={{
                      textShadow: isDarkMode 
                        ? '0 10px 30px rgba(156, 163, 175, 0.3)' 
                        : '0 10px 30px rgba(75, 85, 99, 0.3)'
                    }}
                  >
                    elli
                  </span>
                </h1>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slideUp" delay={0.4}>
                <div className="mb-8">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-light mb-2 leading-tight">
                    Multimedia Artist
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slideRight" delay={0.6}>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mb-8 rounded-full shadow-lg"></div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeIn" delay={0.8}>
                <div className="mb-12 max-w-lg">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                    One artist. Infinite ways to tell your story.
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Photography, video, and 3D design fused with storytelling to create versatile visuals that resonate.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slideUp" delay={1.0}>
                <AnimatedSocialIcons isDarkMode={isDarkMode} />
              </ScrollAnimation>
            </div>
            
            {/* Right side - Enhanced image with 3D effects */}
            <ScrollAnimation animation="scale" delay={0.5}>
              <div className="flex justify-end">
                <div className="relative group">
                  <div 
                    className="relative overflow-hidden rounded-3xl backdrop-blur-2xl border shadow-2xl p-2 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      border: isDarkMode 
                        ? '1px solid rgba(255, 255, 255, 0.2)' 
                        : '1px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: isDarkMode
                        ? '0 25px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 25px 80px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    <img
                      src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Stayelli - Multimedia Artist"
                      className="w-80 h-96 lg:w-96 lg:h-[500px] rounded-2xl object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Enhanced floating elements */}
                  <div 
                    className="absolute -bottom-8 -left-8 w-24 h-24 backdrop-blur-xl rounded-full border transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(59, 130, 246, 0.1)',
                      border: isDarkMode 
                        ? '1px solid rgba(255, 255, 255, 0.1)' 
                        : '1px solid rgba(59, 130, 246, 0.2)',
                      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)'
                    }}
                  ></div>
                  <div 
                    className="absolute -top-8 -right-8 w-16 h-16 backdrop-blur-xl rounded-full border transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(147, 51, 234, 0.1)',
                      border: isDarkMode 
                        ? '1px solid rgba(255, 255, 255, 0.1)' 
                        : '1px solid rgba(147, 51, 234, 0.2)',
                      boxShadow: '0 10px 40px rgba(147, 51, 234, 0.2)'
                    }}
                  ></div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* About Section with Enhanced 3D Effects */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">The Creative Chameleon</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full"></div>
            </div>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slideRight" delay={0.3}>
              <div 
                className="backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:scale-105 md:col-span-2"
                style={{
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.8)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: isDarkMode
                    ? '0 25px 80px rgba(0, 0, 0, 0.4)'
                    : '0 25px 80px rgba(59, 130, 246, 0.3)'
                }}
              >
                <p className="text-xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed font-medium italic">
                  "Minimal, playful, corporate, or cinematic — I wear every style like second skin."
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  As a multimedia artist, I bring adaptability to the forefront. My skillset spans photography, videography, 3D modeling, and motion graphics, giving me the tools to deliver exactly what a project demands. From capturing fleeting street moments to producing polished studio portraits, from editing vibrant films to sculpting immersive 3D worlds — I thrive in switching gears without losing sight of the story.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For me, creativity isn't about sticking to one look; it's about shaping visuals that fit the client, the message, and the moment.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Skills Section with Enhanced Animations */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full"></div>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Camera, title: "Photography", description: "Professional photography services with expertise in portrait, commercial, and creative conceptual work using both digital and film techniques.", color: "from-blue-500 to-cyan-500", category: "photography" },
              { icon: Video, title: "Video Production", description: "Director of Photography role with comprehensive video production, editing, color grading, and motion graphics expertise.", color: "from-purple-500 to-pink-500", category: "video" },
              { icon: Box, title: "3D", description: "3D modeling, animation, and rendering for commercial projects, architectural visualization, and creative installations.", color: "from-green-500 to-teal-500", category: "3d" },
              { icon: Image, title: "Photo Editing & Retouching", description: "Professional photo editing and retouching services for commercial, fashion, and artistic photography projects.", color: "from-orange-500 to-red-500", category: "retouching" }
            ].map((skill, index) => (
              <ScrollAnimation key={skill.title} animation="slideUp" delay={0.3 + index * 0.1}>
                <div 
                  className="group text-center p-4 md:p-8 backdrop-blur-2xl border rounded-2xl md:rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-4 cursor-pointer relative overflow-hidden h-56 md:h-80 flex flex-col justify-between skill-card"
                  style={{
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    border: isDarkMode 
                      ? '1px solid rgba(255, 255, 255, 0.2)' 
                      : '1px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: isDarkMode
                      ? '0 25px 80px rgba(0, 0, 0, 0.4)'
                      : '0 25px 80px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {/* Animated background gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Icon with enhanced animation */}
                    <div className="relative mb-2 md:mb-4 group-hover:scale-125 transition-transform duration-500">
                      <skill.icon className="w-8 h-8 md:w-12 md:h-12 text-gray-700 dark:text-gray-300 mx-auto transition-all duration-500 skill-icon" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3 transition-colors duration-500 skill-title">
                      {skill.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 skill-description leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Enhanced 3D Gallery */}
      <section id="portfolio" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfolio</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
                Explore my work across different creative disciplines. Click any category to filter and view specific projects.
              </p>
            </div>
          </ScrollAnimation>

          {/* Category Filter Buttons */}
          <ScrollAnimation animation="fadeIn" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === 'all'
                    ? 'bg-blue-500 text-white shadow-xl scale-105'
                    : isDarkMode
                      ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg'
                }`}
                style={{
                  backdropFilter: 'blur(20px)',
                  boxShadow: activeFilter === 'all' 
                    ? '0 10px 40px rgba(59, 130, 246, 0.3)' 
                    : isDarkMode 
                      ? '0 8px 25px rgba(0, 0, 0, 0.2)' 
                      : '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
              >
                All Works
              </button>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key as 'photography' | 'video' | '3d' | 'retouching')}
                  className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === key
                      ? 'bg-blue-500 text-white shadow-xl scale-105'
                      : isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    boxShadow: activeFilter === key 
                      ? '0 10px 40px rgba(59, 130, 246, 0.3)' 
                      : isDarkMode 
                        ? '0 8px 25px rgba(0, 0, 0, 0.2)' 
                        : '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          {/* Portfolio Grid */}
          <ScrollAnimation animation="fadeIn" delay={0.5}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 transform-gpu aspect-square"
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
                  <div className="p-1 md:p-2 h-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl md:rounded-2xl group-hover:scale-110 transition-all duration-700 group-hover:brightness-110"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-1 md:inset-2 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center rounded-xl md:rounded-2xl">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 group-hover:scale-110 px-2 md:px-4">
                      <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 animate-in slide-in-from-bottom duration-300 delay-100">{item.title}</h3>
                      <p className="text-xs md:text-sm text-gray-200 animate-in slide-in-from-bottom duration-300 delay-200">{categoryLabels[item.category]}</p>
                      {item.isVideo && (
                        <div className="mt-1 md:mt-2 text-xs bg-red-500 px-2 md:px-3 py-1 rounded-full animate-pulse animate-in slide-in-from-bottom duration-300 delay-300">VIDEO</div>
                      )}
                      <div className="mt-2 md:mt-3 text-xs text-gray-300 animate-in slide-in-from-bottom duration-300 delay-400">Click to view</div>
                    </div>
                  </div>
                  
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-blue-500/20"></div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-300">
              <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={closeLightbox}
              />
              
              <div className="relative max-w-6xl max-h-full w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 mx-2 md:mx-0">
                <button
                  onClick={closeLightbox}
                  className="absolute top-2 md:top-4 right-2 md:right-4 z-10 p-2 md:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 hover:rotate-90 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
                
                <button
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 hover:-translate-x-1 transition-all duration-300 backdrop-blur-sm border border-white/20 group"
                >
                  <ChevronLeft size={24} className="md:w-8 md:h-8 group-hover:scale-125 transition-transform duration-300" />
                </button>
                
                <button
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 hover:translate-x-1 transition-all duration-300 backdrop-blur-sm border border-white/20 group"
                >
                  <ChevronRight size={24} className="md:w-8 md:h-8 group-hover:scale-125 transition-transform duration-300" />
                </button>
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  {selectedImage.isVideo ? (
                    <div className="w-full h-auto max-h-[60vh] md:max-h-[70vh] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                      <div className="text-white text-center p-4 md:p-8 relative z-10">
                        <div className="text-4xl md:text-6xl mb-2 md:mb-4 animate-bounce">▶️</div>
                        <p className="text-lg md:text-xl font-semibold animate-pulse">Video Player Placeholder</p>
                        <p className="text-gray-400 mt-1 md:mt-2 animate-fade-in text-sm md:text-base">Video content would be embedded here</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain transition-all duration-700 hover:scale-105"
                    />
                  )}
                  
                  <div className="p-4 md:p-6 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 animate-in slide-in-from-left duration-500">{selectedImage.title}</h3>
                      <p className="text-base md:text-lg text-blue-600 mb-2 md:mb-3 animate-in slide-in-from-left duration-500 delay-100">{categoryLabels[selectedImage.category]}</p>
                    {selectedImage.description && (
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed animate-in slide-in-from-left duration-500 delay-200">{selectedImage.description}</p>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section with Enhanced 3D Cards */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Create Together</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Ready to bring your creative vision to life? Let's discuss your project and explore the possibilities.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Mail, title: "Email", info: "stayelli.multimedia@gmail.com", color: "from-blue-500 to-cyan-500" },
              { icon: Phone, title: "Phone", info: "+63 995-970-2451 | +852 9159-9816", color: "from-green-500 to-teal-500" },
              { icon: MapPin, title: "Location", info: "Hong Kong & Manila, PH", color: "from-purple-500 to-pink-500" }
            ].map((contact, index) => (
              <ScrollAnimation key={contact.title} animation="slideUp" delay={0.3 + index * 0.1}>
                <div 
                  className="group p-8 backdrop-blur-2xl border rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-4 cursor-pointer relative overflow-hidden h-48 flex flex-col justify-center items-center"
                  style={{
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    border: isDarkMode 
                      ? '1px solid rgba(255, 255, 255, 0.2)' 
                      : '1px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: isDarkMode
                      ? '0 25px 80px rgba(0, 0, 0, 0.4)'
                      : '0 25px 80px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <contact.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:text-white" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-500 group-hover:text-white">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500 group-hover:text-gray-200 text-center break-words">
                    {contact.info}
                  </p>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-current opacity-0 group-hover:opacity-30 scale-0 group-hover:scale-150 transition-all duration-700"></div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer 
        className="py-8 backdrop-blur-2xl border-t text-center transition-all duration-500"
        style={{
          background: isDarkMode 
            ? 'rgba(0, 0, 0, 0.2)' 
            : 'rgba(255, 255, 255, 0.8)',
          borderTop: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(59, 130, 246, 0.2)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Stayelli. All rights reserved. | Multimedia Artist
          </p>
        </div>
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;