import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Home, User, Lightbulb, Briefcase, Mail } from 'lucide-react';

interface Enhanced3DNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Lightbulb },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail }
];

// Reusable toggle button component for consistency
const GlassButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  isDarkMode: boolean;
  className?: string;
}> = ({ onClick, children, isDarkMode, className = '' }) => (
  <motion.button
    onClick={onClick}
    className={`relative p-2.5 rounded-full transition-colors duration-300 ${className}`}
    style={{
      // Updated button style to match premium black
      background: isDarkMode 
        ? 'rgba(255, 255, 255, 0.1)' // White/10
        : 'rgba(0, 0, 0, 0.05)', // Black/5
      border: isDarkMode 
        ? '1px solid rgba(255, 255, 255, 0.15)' // White/15
        : '1px solid rgba(0, 0, 0, 0.1)', // Black/10
    }}
    whileHover={{ scale: 1.1, rotate: 12 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.button>
);


export const Enhanced3DNavigation: React.FC<Enhanced3DNavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  isDarkMode,
  setIsDarkMode,
  scrollToSection,
  activeSection
}) => {

  // MODIFIED: This style is now static and doesn't change on scroll.
  // It matches the "premium black" theme from LiquidBackground.
  const navStyle = {
    background: isDarkMode 
      ? 'rgba(18, 18, 18, 0.7)' // Premium black (#121212) at 70% opacity
      : 'rgba(255, 255, 255, 0.7)', // Light mode white at 70% opacity
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.1)' // Faint white border
      : '1px solid rgba(0, 0, 0, 0.1)', // Faint black border
    boxShadow: isDarkMode
      ? '0 4px 30px rgba(0, 0, 0, 0.3)' // Darker shadow
      : '0 4px 30px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s ease, border-color 0.3s ease', // Smooth dark mode toggle
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.nav
      // MODIFIED: Removed the scroll-based style logic and used the static navStyle object
      style={navStyle}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl rounded-2xl"
    >
      <div className="px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <motion.div
            className={`text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            whileHover={{ scale: 1.05 }}
          >
            Stayelli
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeSection === item.id
                    ? (isDarkMode ? 'text-white' : 'text-gray-900')
                    : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                }`}
              >
                <span className="relative z-10 font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.1)' // Active pill light
                        : 'rgba(0, 0, 0, 0.05)', // Active pill dark
                    }}
                    layoutId="desktop-pill" // Animate this "pill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <GlassButton onClick={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? 'moon' : 'sun'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? (
                    <Sun size={18} className="text-white" />
                  ) : (
                    <Moon size={18} className="text-gray-900" />
                  )}
                </motion.div>
              </AnimatePresence>
            </GlassButton>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <GlassButton onClick={() => setIsMenuOpen(!isMenuOpen)} isDarkMode={isDarkMode}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <X size={20} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                    ) : (
                      <Menu size={20} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </GlassButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            // MODIFIED: Updated style to match the new theme
            style={{
              background: isDarkMode 
                ? 'rgba(18, 18, 18, 0.8)' // Premium black
                : 'rgba(255, 255, 255, 0.8)', // Light white
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }}
            className="md:hidden overflow-hidden rounded-b-2xl border-t"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-4 py-4 space-y-2">
              <motion.ul
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navItems.map((item) => (
                  <motion.li key={item.id} variants={mobileItemVariants}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-4 w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                        activeSection === item.id
                          ? (isDarkMode ? 'text-white bg-white/10' : 'text-gray-900 bg-black/5')
                          : (isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

