import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Camera, Video, Palette, Box } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { AnimatedSocialIcons } from './components/AnimatedSocialIcons';
import { Enhanced3DNavigation } from './components/Enhanced3DNavigation';
import { ProjectViewer } from './components/ProjectViewer';
import { portfolioProjects, categoryLabels, PortfolioProject } from './data/portfolioData';
import stayelliPortrait from '/images/stayelli_portrait.avif';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { LiquidBackground } from './components/LiquidBackground'; 

// Define a consistent "glass" style for all cards
const glassCardStyle = (isDarkMode: boolean) => ({
  background: isDarkMode 
    ? 'rgba(18, 18, 18, 0.4)' // Premium black
    : 'rgba(255, 255, 255, 0.5)', // bg-white/50
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: isDarkMode
    ? '0 10px 30px rgba(0, 0, 0, 0.2)'
    : '0 10px 30px rgba(0, 0, 0, 0.1)'
});

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 100,
      duration: 0.8,
    }
  }
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  },
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState<'Branded' | 'Personal'>('Branded');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = React.useMemo(() => {
    return portfolioProjects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  const openProject = (project: PortfolioProject) => {
    document.body.style.overflow = 'hidden';
    setSelectedProject(project);
  };

  const closeProject = () => {
    document.body.style.overflow = 'unset';
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200; 
      
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
      
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const { offsetTop } = contactElement;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollPosition >= offsetTop - 100 || 
            window.scrollY + windowHeight >= documentHeight - 100) {
          setActiveSection('contact');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
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
      const offsetPosition = elementPosition - 120; 
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-dvh transition-colors duration-500 bg-transparent">
      
      <LiquidBackground />

      <Enhanced3DNavigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Home Section */}
      <section id="home" className="min-h-dvh flex items-center pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex justify-center text-center">
            
            <motion.div 
              className="max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-6 leading-none tracking-tight">
                <motion.span 
                  className="inline-block relative z-10"
                  whileHover={{ scale: 1.1, rotate: -2, transition: { type: 'spring', stiffness: 300 } }}
                >
                  Stay
                </motion.span>
                <motion.span 
                  className="inline-block text-gray-600 dark:text-gray-400 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 2, transition: { type: 'spring', stiffness: 300 } }}
                >
                  elli
                </motion.span>
              </h1>
              
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-light mb-8 leading-tight">
                Digital Creator
              </p>

              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mb-8 rounded-full shadow-lg mx-auto"></div>

              <div className="mb-12 max-w-lg">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                  One Vision. Unlimited ways to capture your story.
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  My focus is on <strong className="font-semibold text-gray-800 dark:text-gray-100">blending diverse creative mediums</strong>—including high-resolution image-making and dynamic video production—to forge powerful, cohesive visual stories.
                </p>
              </div>

              <div className="flex justify-center">
                <AnimatedSocialIcons isDarkMode={isDarkMode} />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">The Creative Chameleon</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            <motion.div 
              className="rounded-3xl p-8 shadow-xl transition-all duration-500 hover:scale-[1.03]"
              style={glassCardStyle(isDarkMode)}
              variants={sectionVariants}
            >
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed font-medium italic">
                "The visual medium changes, but the core goal remains constant: impactful storytelling."
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As a <strong className="font-semibold text-gray-800 dark:text-gray-100">Digital Creator</strong> and visual strategist, I maintain a sharp focus on trending aesthetic standards across film, photography, and motion graphics. But knowing a trend isn't the strategy. I strategically blend my full technical mastery with your unique brand story, ensuring the final visual solution is potent, purposeful, and perfectly tailored to your project's specific goals.
              </p>
            </motion.div>
            
            <motion.div className="flex justify-center" variants={sectionVariants}>
              <div 
                className="relative overflow-hidden rounded-3xl p-2 shadow-xl transition-all duration-500 group"
                style={glassCardStyle(isDarkMode)}
              >
                <img
                  src={stayelliPortrait}
                  alt="Stayelli - Digital Creator"
                  className="w-80 h-96 lg:w-96 lg:h-[500px] rounded-2xl object-cover transition-all duration-700 group-hover:scale-110"
                  fetchPriority="high"
                />
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Camera, title: "Photo", description: "Professional photography services with expertise in portrait, commercial, and creative conceptual work. Also includes photo editing and retouching", color: "from-blue-500 to-cyan-500", category: "Photo" },
              { icon: Video, title: "Video", description: "Director of Photography role with comprehensive video production, editing, color grading, and motion graphics expertise.", color: "from-purple-500 to-pink-500", category: "Video" },
              { icon: Box, title: "3D", description: "3D modeling, animation, and rendering for commercial projects, architectural visualization, and creative expressions.", color: "from-green-500 to-teal-500", category: "3D" },
              { icon: Palette, title: "Branding", description: "Professional branding services tailored to your needs, delivering modern solutions aligned with market trends.", color: "from-orange-500 to-red-500", category: "Branding" }
            ].map((skill, index) => (
              <motion.div 
                key={skill.title} 
                variants={sectionVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="group text-center p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.03] cursor-pointer relative overflow-hidden h-64 md:h-80 flex flex-col justify-center skill-card"
                  style={glassCardStyle(isDarkMode)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="flex flex-col justify-center"> 
                    <div className="relative mb-3 md:mb-4 group-hover:scale-125 transition-transform duration-500">
                      <skill.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-gray-200 mx-auto transition-all duration-500 skill-icon" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3 transition-colors duration-500 skill-title">
                      {skill.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500 skill-description leading-relaxed h-[5rem] md:h-[6rem] overflow-hidden">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* === PORTFOLIO SECTION: MODIFIED === */}
      <section id="portfolio" className="py-20 relative">
        <motion.div 
          className="w-full max-w-6xl mx-auto px-6" // MODIFIED: Changed max-width for a grid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfolio</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Explore my work across creative disciplines. Select a category to see the projects.
            </p>
          </div>
          
          {/* Your original filter, unchanged */}
          <motion.div 
            className="flex w-full max-w-sm mx-auto p-1.5 rounded-2xl mb-8 md:mb-12"
            style={glassCardStyle(isDarkMode)}
            variants={sectionVariants}
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key as 'Branded' | 'Personal')}
                className={`relative w-1/2 py-2.5 rounded-xl font-semibold text-sm md:text-base transition-colors duration-300 ${
                  activeFilter === key 
                    ? (isDarkMode ? 'text-gray-900' : 'text-gray-900') 
                    : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                }`}
              >
                <span className="relative z-10">{label}</span>
                {activeFilter === key && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.9)' // Solid white pill
                        : 'rgba(255, 255, 255, 0.9)', // Solid white pill
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    }}
                    layoutId="filter-pill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
          
          {/* MODIFIED: Replaced vertical list with Instagram-style grid */}
          <motion.div 
            layout // Animate layout changes when filtering
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => openProject(project)}
                  className="relative w-full aspect-square rounded-xl overflow-hidden group shadow-lg"
                  variants={gridItemVariants} // Use the new grid item variants
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout // Animate position changes
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover effect to show title */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-base md:text-lg font-bold text-center">
                      {project.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        
        {/* Your original ProjectViewer, unchanged */}
        <ProjectViewer
          project={selectedProject}
          onClose={closeProject}
          isDarkMode={isDarkMode}
        />
      </section>
      {/* === END OF PORTFOLIO SECTION === */}


      {/* Contact Section (Your original code, unchanged) */}
      <section id="contact" className="py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Create Together</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-white dark:to-gray-400 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Ready to bring your creative vision to life? Let's discuss your project and explore the possibilities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Mail, title: "Email", info: "stayelli.multimedia@gmail.com", color: "from-blue-500 to-cyan-500" },
              { icon: Phone, title: "Phone", info: "+63 995-970-2451 | +852 9159-9816", color: "from-green-500 to-teal-500" },
              { icon: MapPin, title: "Location", info: "Hong Kong & Manila, PH", color: "from-purple-500 to-pink-500" }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                variants={sectionVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="group p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.03] cursor-pointer relative overflow-hidden h-52 flex flex-col justify-center items-center"
                  style={glassCardStyle(isDarkMode)}
                >
                 <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <contact.icon className="w-8 h-8 text-gray-800 dark:text-gray-200 mx-auto mb-4 transition-all duration-500 group-hover:scale-125" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-500">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500 text-center break-words">
                    {contact.info}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer (Your original code, unchanged) */}
      <footer 
        className="py-8 border-t text-center transition-all duration-500"
        style={{
          background: isDarkMode 
            ? 'rgba(18, 18, 18, 0.7)' // Premium black
            : 'rgba(255, 255, 255, 0.7)',
          borderColor: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Stayelli. All rights reserved. | Digital Creator
          </p>
        </div>
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;