import React from 'react';

export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Solid base color */}
      {/* MODIFIED: Changed dark:bg-gray-900 to dark:bg-[#121212] for a premium black */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-[#121212]" />
      
      {/* The blobs container, blurred and animated */}
      <div className="absolute inset-0 filter blur-3xl opacity-40 dark:opacity-60">
        
        {/* Blob 1: Top-left corner */}
        {/* MODIFIED: Changed dark mode colors to fiery red/orange */}
        <div 
          className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] md:w-[800px] md:h-[800px] 
          bg-gradient-to-r from-pink-300 to-blue-300 
          dark:from-red-800 dark:to-orange-700 
          rounded-full animate-blob-1" 
        />
        
        {/* Blob 2: Bottom-right corner */}
        {/* MODIFIED: Changed dark mode colors to fiery red/orange */}
        <div 
          className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] md:w-[700px] md:h-[700px] 
          bg-gradient-to-r from-cyan-200 to-indigo-300 
          dark:from-orange-800 dark:to-yellow-700 
          rounded-full animate-blob-2" 
        />
        
      </div>
    </div>
  );
};

