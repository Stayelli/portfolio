import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioProject } from '../data/portfolioData';
import { ChevronRight } from 'lucide-react';

interface PortfolioListItemProps {
  project: PortfolioProject;
  onClick: () => void;
  isDarkMode: boolean;
  style: React.CSSProperties; // For the glass style
  className?: string; // ⬅️ ADDED: To allow custom sizing
}

// Animation variants for framer-motion
export const listItemVariants = {
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

export const PortfolioListItem: React.FC<PortfolioListItemProps> = ({ 
  project, 
  onClick, 
  isDarkMode, 
  style,
  className = '' // ⬅️ ADDED: Destructure with default
}) => {
  return (
    <motion.li
      variants={listItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout // This animates its position in the list
      className={className} // ⬅️ ADDED: Apply the className here
    >
      <button
        onClick={onClick}
        className="w-full h-full p-4 md:p-6 rounded-2xl shadow-xl transition-all duration-300 group flex items-center justify-between"
        style={style}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <img
            src={project.coverImage}
            alt={`${project.title} cover`}
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="text-left overflow-hidden">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 truncate">
              {project.category}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
      </button>
    </motion.li>
  );
};

