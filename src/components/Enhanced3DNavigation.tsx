import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface Enhanced3DNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export const Enhanced3DNavigation: React.FC<Enhanced3DNavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  isDarkMode,
  setIsDarkMode,
  scrollToSection,
  activeSection
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced navigation style based on scroll position
  const navStyle = {
    background: isDarkMode 
      ? `rgba(0, 0, 0, ${Math.min(0.8, scrollY / 500)})` 
      : `rgba(255, 255, 255, ${Math.min(0.95, 0.2 + scrollY / 300)})`,
    backdropFilter: `blur(${Math.min(30, 10 + scrollY / 20)}px)`,
    transform: `translateY(${Math.min(scrollY / 50, 10)}px) perspective(1000px) rotateX(${Math.min(scrollY / 100, 5)}deg)`,
    boxShadow: isDarkMode
      ? `0 ${8 + scrollY / 50}px ${32 + scrollY / 20}px rgba(0, 0, 0, 0.3), 
         0 0 ${20 + scrollY / 30}px rgba(255, 255, 255, 0.1) inset`
      : `0 ${8 + scrollY / 50}px ${32 + scrollY / 20}px rgba(0, 0, 0, 0.1), 
         0 0 ${20 + scrollY / 30}px rgba(255, 255, 255, 0.8) inset,
         0 ${4 + scrollY / 100}px ${16 + scrollY / 40}px rgba(59, 130, 246, 0.15)`,
    border: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(59, 130, 246, 0.2)'
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl transition-all duration-500">
      <div 
        className="rounded-2xl transition-all duration-500 transform-gpu"
        style={navStyle}
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo with 3D effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform rotate-3 scale-110"></div>
              <div 
                className={`text-xl font-bold transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
                style={{
                  textShadow: isDarkMode 
                    ? '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)' 
                    : '0 4px 8px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.3)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                }}
              >
                Stayelli
              </div>
              {/* Floating particles around logo */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full animate-ping ${
                      isDarkMode ? 'bg-white' : 'bg-blue-500'
                    }`}
                    style={{
                      left: `${-10 + Math.random() * 120}%`,
                      top: `${-10 + Math.random() * 120}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '2s'
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 nav-item ${
                    activeSection === item.id
                      ? isDarkMode ? 'text-white nav-active-dark' : 'text-blue-600 nav-active-light'
                      : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* 3D button background */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 transform group-hover:scale-110 nav-bg ${
                    activeSection === item.id
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-500 opacity-60' 
                        : 'bg-gradient-to-r from-blue-100 to-indigo-200 opacity-80'
                      : isDarkMode 
                        ? 'bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100' 
                        : 'bg-gradient-to-r from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    boxShadow: isDarkMode
                      ? '0 4px 15px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : '0 4px 15px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                  }}
                  ></div>
                  
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'w-full from-blue-500 to-purple-600 opacity-100' 
                      : 'w-0 group-hover:w-full from-blue-400 to-indigo-500'
                  }`}></div>
                  
                  <span className="relative z-10 font-medium">{item.label}</span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-blue-400 to-purple-500 blur-sm"></div>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Enhanced Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative group p-3 rounded-full transition-all duration-500 transform hover:scale-110 hover:rotate-12 overflow-hidden"
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' 
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                  backdropFilter: 'blur(20px)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                }`}></div>
                
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-50 animate-spin transition-opacity duration-500"></div>
                
                {isDarkMode ? (
                  <Sun size={20} className="relative z-10 text-yellow-400 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125" />
                ) : (
                  <Moon size={20} className="relative z-10 text-indigo-600 transition-all duration-500 group-hover:-rotate-180 group-hover:scale-125" />
                )}
                
                {/* Pulsing glow */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 animate-pulse ${
                  isDarkMode ? 'bg-yellow-400' : 'bg-indigo-500'
                } blur-md`}></div>
              </button>

              {/* Enhanced Mobile Menu Button */}
              <button
                className="md:hidden relative group p-3 rounded-full transition-all duration-300 transform hover:scale-110 overflow-hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(59, 130, 246, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode ? 'bg-white/10' : 'bg-blue-500/10'
                }`}></div>
                
                {isMenuOpen ? (
                  <X size={24} className={`relative z-10 transition-all duration-300 transform group-hover:rotate-90 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                ) : (
                  <Menu size={24} className={`relative z-10 transition-all duration-300 transform group-hover:rotate-180 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 dark:border-white/10 overflow-hidden">
            <div 
              className="px-6 py-4 space-y-3"
              style={{
                background: isDarkMode 
                  ? 'rgba(0, 0, 0, 0.2)' 
                  : 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 mobile-nav-item ${
                    activeSection === item.id
                      ? isDarkMode ? 'text-white bg-white/20' : 'text-blue-600 bg-blue-100'
                      : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-blue-50'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};