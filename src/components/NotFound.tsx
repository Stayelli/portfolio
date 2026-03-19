import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiquidBackground } from './LiquidBackground';

export const NotFound = () => {
  // Forces the page to the top and locks in dark mode immediately
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
  }, []);

  const glassStyle = {
    background: 'rgba(18, 18, 18, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  };

  return (
    <div className="min-h-dvh flex items-center justify-center relative py-20 px-6">
      <LiquidBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="p-10 md:p-14 rounded-3xl text-center max-w-lg mx-auto w-full relative overflow-hidden" 
        style={glassStyle}
      >
        {/* Subtle background glow behind the 404 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>

        <AlertCircle className="w-12 h-12 text-zinc-500 mx-auto mb-6" />
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-300 mb-6 tracking-tight">Asset Not Found.</h2>
        
        <p className="text-zinc-400 mb-10 leading-relaxed text-sm md:text-base">
          The link you followed is broken, or this page has been moved. Let's get you back to the main timeline.
        </p>

        <Link 
          to="/" 
          className="group flex items-center justify-center gap-2 w-full py-4 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Portfolio
        </Link>
      </motion.div>
    </div>
  );
};