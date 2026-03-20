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
          className="text-4xl md:text-5xl font-bold tracking-tight flex items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span>Stay</span>
          <span className="text-zinc-500">elli</span>
        </motion.div>

{/* Cinematic Progress Bar */}
        {/* Note: Removed `overflow-hidden` here so the glow can bleed out */}
        <div className="w-48 md:w-64 h-[2px] bg-zinc-800 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <motion.div
            // Added `rounded-full` here to keep the edges smooth since we removed overflow-hidden above
            className="h-full rounded-full bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-200"
            initial={{ 
              width: "0%",
              boxShadow: "0px 0px 4px rgba(228, 228, 231, 0.2)"
            }}
            animate={{ 
              width: "100%",
              // Animate through an array of shadows to create the pulse
              boxShadow: [
                "0px 0px 4px rgba(228, 228, 231, 0.3)", 
                "0px 0px 12px rgba(228, 228, 231, 0.8)", 
                "0px 0px 4px rgba(228, 228, 231, 0.3)"
              ]
            }}
            transition={{ 
              // The width fills once over 2 seconds
              width: { duration: 2, ease: "easeInOut" },
              // The glow loops continuously every 1.5 seconds
              boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }} 
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