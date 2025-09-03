import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

// Custom TikTok icon component
const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface AnimatedSocialIconsProps {
  isDarkMode: boolean;
}

export const AnimatedSocialIcons: React.FC<AnimatedSocialIconsProps> = ({ isDarkMode }) => {
  return (
    <div className="flex space-x-6">
      {/* Instagram Icon with Gradient Animation */}
      <a
        href="https://instagram.com/stayelli"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden transform-gpu transition-all duration-500 hover:scale-110 hover:rotate-12"
        style={{
          background: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          backdropFilter: 'blur(20px)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          boxShadow: isDarkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(240, 148, 51, 0.4)'
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        
        {/* Rotating border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 animate-spin-slow transition-opacity duration-500" style={{ padding: '2px' }}>
          <div className="w-full h-full rounded-2xl bg-white/20 backdrop-blur-xl"></div>
        </div>
        
        <Instagram 
          size={22} 
          className={`relative z-10 transition-all duration-500 group-hover:scale-125 ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}
        />
        
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-pink-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
      </a>

      {/* X (Twitter) Icon with Morphing Animation */}
      <a
        href="https://twitter.com/stayelli"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden transform-gpu transition-all duration-700 hover:scale-110 hover:-rotate-12"
        style={{
          background: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
          backdropFilter: 'blur(20px)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          boxShadow: isDarkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(29, 161, 242, 0.4)'
        }}
      >
        {/* Morphing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-180"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 animate-bounce"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + i * 8}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s'
              }}
            ></div>
          ))}
        </div>
        
        <Twitter 
          size={22} 
          className={`relative z-10 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}
        />
        
        {/* Expanding circle effect */}
        <div className="absolute inset-0 rounded-2xl bg-blue-400/30 scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
      </a>

      {/* TikTok Icon with Glitch Animation */}
      <a
        href="https://tiktok.com/@stayelli"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden transform-gpu transition-all duration-500 hover:scale-110"
        style={{
          background: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'linear-gradient(135deg, #ff0050 0%, #00f2ea 100%)',
          backdropFilter: 'blur(20px)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          boxShadow: isDarkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(255, 0, 80, 0.4)'
        }}
      >
        {/* Glitch effect layers */}
        <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-70 transition-opacity duration-100 animate-pulse transform group-hover:translate-x-1"></div>
        <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-100 animate-pulse transform group-hover:-translate-x-1" style={{ animationDelay: '0.1s' }}></div>
        
        {/* Scanning line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <TikTokIcon 
          size={22} 
          className={`relative z-10 transition-all duration-500 group-hover:scale-125 ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}
        />
        
        {/* Digital noise effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      </a>
    </div>
  );
};