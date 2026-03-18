import React from 'react';

export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-gray-50 dark:bg-[#121212] transform-gpu">
      {/* FIXED: Removed the legacy 'filter' class which conflicts with CSS minifiers in production.
        Added 'transform-gpu' and 'saturate-150' to force hardware acceleration and restore color punch 
        that gets washed out by WebKit/Blink during Vercel's production build.
      */}
      <div className="absolute inset-0 blur-3xl opacity-40 dark:opacity-60 saturate-150 transform-gpu mix-blend-multiply dark:mix-blend-screen">
        
        <div 
          className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] md:w-[800px] md:h-[800px] 
          bg-gradient-to-r from-pink-300 to-blue-300 
          dark:from-red-800 dark:to-orange-700 
          rounded-full animate-blob-1 will-change-transform" 
        />
        
        <div 
          className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] md:w-[700px] md:h-[700px] 
          bg-gradient-to-r from-cyan-200 to-indigo-300 
          dark:from-orange-800 dark:to-yellow-700 
          rounded-full animate-blob-2 will-change-transform" 
        />
        
      </div>
    </div>
  );
};