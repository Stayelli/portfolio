import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Camera, Video, Palette, Music, Box, Palette, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSocialIcons } from './components/AnimatedSocialIcons';
import { Enhanced3DNavigation } from './components/Enhanced3DNavigation';
import { ScrollAnimation, ParallaxBackground, Floating3DElements } from './components/ScrollAnimations';
import { ProjectFolder } from './components/ProjectFolder';
import { ProjectViewer } from './components/ProjectViewer';
import { portfolioProjects, categoryLabels, PortfolioProject } from './data/portfolioData';
import stayelliPortrait from '../public/images/stayelli_portrait.avif';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState<'all' | 'Photo' | 'Video' | '3D' | 'Branding'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

  // Filter portfolio items based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  // Project viewer functions
  const openProject = (project: PortfolioProject) => {
    document.body.style.overflow = 'hidden';
    setSelectedProject(project);
    setOpenFolders(prev => new Set([...prev, project.id]));
  };

  const closeProject = () => {
    document.body.style.overflow = 'unset';
    setSelectedProject(null);
  };

  const toggleFolder = (projectId: string) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

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
                      src={stayelliPortrait}
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
              { icon: Camera, title: "Photo", description: "Professional photography services with expertise in portrait, commercial, and creative conceptual work. Also includes photo editing and retouching", color: "from-blue-500 to-cyan-500", category: "Photo" },
              { icon: Video, title: "Video", description: "Director of Photography role with comprehensive video production, editing, color grading, and motion graphics expertise.", color: "from-purple-500 to-pink-500", category: "Video" },
              { icon: Box, title: "3D", description: "3D modeling, animation, and rendering for commercial projects, architectural visualization, and creative expressions.", color: "from-green-500 to-teal-500", category: "3D" },
              { icon: Palette, title: "Branding", description: "Professional branding services tailored to your needs, delivering modern solutions aligned with market trends.", color: "from-orange-500 to-red-500", category: "Branding" }
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
                  onClick={() => setActiveFilter(key as 'Photography' | 'Video' | '3D' | 'Branding')}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectFolder
                key={project.id}
                project={project}
                isOpen={openFolders.has(project.id)}
                onClick={() => openProject(project)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
        
        {/* Project Viewer Modal */}
        <ProjectViewer
          project={selectedProject}
          onClose={closeProject}
          isDarkMode={isDarkMode}
        />
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
    </div>
  );
}

export default App;