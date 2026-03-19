import React from 'react';
import { motion } from 'framer-motion';
import { LiquidBackground } from './LiquidBackground';

export const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 overflow-hidden"
      // The screen fades out smoothly when loading is complete
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Run the liquid background behind the loader for immediate immersion */}
      <LiquidBackground />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Name Reveal */}
        <motion.div 
          className="text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-1 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span>Stay</span>
          <span className="text-zinc-500">elli</span>
        </motion.div>

        {/* Cinematic Progress Bar */}
        <div className="w-48 md:w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            // This 2-second animation dictates how long the loading screen stays visible
            transition={{ duration: 2, ease: "easeInOut" }} 
          />
        </div>

        {/* Premium Subtitle */}
        <motion.p
          className="mt-6 text-[10px] md:text-xs tracking-[0.3em] text-zinc-400 uppercase font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Sometimes it takes time to load something this good...
        </motion.p>
      </div>
    </motion.div>
  );
};