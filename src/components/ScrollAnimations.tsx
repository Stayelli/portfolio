import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'parallax';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}s`
    };

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return { ...baseStyles, opacity: 0, transform: 'translateY(30px)' };
        case 'slideUp':
          return { ...baseStyles, opacity: 0, transform: 'translateY(60px)' };
        case 'slideLeft':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-60px)' };
        case 'slideRight':
          return { ...baseStyles, opacity: 0, transform: 'translateX(60px)' };
        case 'scale':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.8)' };
        case 'rotate':
          return { ...baseStyles, opacity: 0, transform: 'rotate(-10deg) scale(0.9)' };
        case 'parallax':
          return { 
            ...baseStyles, 
            opacity: 0, 
            transform: `translateY(${scrollY * 0.1}px) scale(0.95)` 
          };
        default:
          return { ...baseStyles, opacity: 0 };
      }
    }

    // Visible state
    switch (animation) {
      case 'parallax':
        return { 
          ...baseStyles, 
          opacity: 1, 
          transform: `translateY(${scrollY * -0.05}px) scale(1)` 
        };
      default:
        return { ...baseStyles, opacity: 1, transform: 'none' };
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
};

// Parallax Background Component
export const ParallaxBackground: React.FC<{ children: React.ReactNode; speed?: number }> = ({ 
  children, 
  speed = 0.5 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className="relative"
      style={{
        transform: `translateY(${scrollY * speed}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// Floating 3D Elements Component
export const Floating3DElements: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Smooth floating geometric shapes with gentle parallax */}
      {[...Array(12)].map((_, i) => {
        const parallaxSpeed = 0.05 + (i % 4) * 0.02; // Gentler parallax speeds
        const rotationSpeed = 0.01 + (i % 3) * 0.005; // Slower rotation
        
        return (
        <div
          key={i}
          className={`absolute rounded-full transition-all duration-1000 ease-out ${
            isDarkMode ? 'bg-white' : 'bg-blue-500'
          }`}
          style={{
            width: `${8 + (i % 4) * 8}px`,
            height: `${8 + (i % 4) * 8}px`,
            left: `${5 + (i % 10) * 10}%`,
            top: `${10 + (i % 8) * 12}%`,
            opacity: isDarkMode ? 0.1 : 0.15,
            transform: `
              translate3d(
                ${Math.sin(scrollY * 0.0005 + i) * 15}px,
                ${scrollY * -parallaxSpeed}px,
                0
              ) 
              rotate(${scrollY * rotationSpeed}deg)
              scale(${1 + Math.sin(scrollY * 0.001 + i) * 0.05})
            `,
            animation: `float-${(i % 3) + 1} ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: isDarkMode
              ? `0 0 20px rgba(255, 255, 255, 0.05)`
              : `0 0 20px rgba(59, 130, 246, 0.1)`
          }}
        />
        );
      })}

      {/* 3D Cubes with smooth parallax */}
      {[...Array(8)].map((_, i) => {
        const cubeParallaxSpeed = 0.08 + (i % 4) * 0.03; // Gentler parallax
        const cubeRotationX = scrollY * (0.02 + i * 0.005); // Slower rotation
        const cubeRotationY = scrollY * (0.015 + i * 0.003);
        const cubeScale = 1 + Math.sin(scrollY * 0.001 + i) * 0.1; // Subtle scaling
        
        return (
        <div
          key={`cube-${i}`}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            left: `${8 + (i % 6) * 15}%`,
            top: `${15 + (i % 5) * 18}%`,
            transform: `
              perspective(1000px) 
              translate3d(
                ${Math.cos(scrollY * 0.001 + i) * 20}px,
                ${scrollY * -cubeParallaxSpeed}px,
                ${Math.sin(scrollY * 0.0015 + i) * 15}px
              )
              rotateX(${cubeRotationX}deg) 
              rotateY(${cubeRotationY}deg)
              scale(${cubeScale})
            `,
            opacity: isDarkMode ? 0.08 : 0.12
          }}
        >
          <div
            className={`${
              isDarkMode 
                ? 'bg-gradient-to-br from-white/10 to-white/5' 
                : 'bg-gradient-to-br from-blue-200/30 to-purple-200/30'
            } backdrop-blur-sm border border-white/20 transform-gpu rounded-lg`}
            style={{
              width: `${32 + (i % 3) * 8}px`,
              height: `${32 + (i % 3) * 8}px`,
              transform: `rotateX(${i * 45}deg) rotateY(${i * 45}deg)`,
              animation: `spin-3d ${6 + (i % 4)}s linear infinite`,
              boxShadow: isDarkMode
                ? `0 8px 32px rgba(255, 255, 255, 0.05)`
                : `0 8px 32px rgba(59, 130, 246, 0.1)`
            }}
          />
        </div>
        );
      })}

      {/* Additional smooth floating orbs for depth */}
      <ParallaxBackground speed={0.1}>
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className={`absolute rounded-full ${
              isDarkMode ? 'bg-white' : 'bg-purple-400'
            }`}
            style={{
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              left: `${15 + i * 12}%`,
              top: `${20 + i * 15}%`,
              opacity: isDarkMode ? 0.05 : 0.08,
              animation: `float-${(i % 3) + 1} ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              filter: 'blur(1px)',
              boxShadow: isDarkMode
                ? '0 0 30px rgba(255, 255, 255, 0.1)'
                : '0 0 30px rgba(147, 51, 234, 0.2)'
            }}
          />
        ))}
      </ParallaxBackground>
    </div>
  );
};