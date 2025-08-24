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
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime;
      
      if (timeDelta > 0) {
        const velocity = Math.abs(currentScrollY - lastScrollY) / timeDelta;
        setScrollVelocity(Math.min(velocity * 100, 50)); // Cap velocity for performance
      }
      
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
      setLastScrollTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastScrollTime]);

  // Decay scroll velocity over time for smooth motion blur fade
  useEffect(() => {
    const decayInterval = setInterval(() => {
      setScrollVelocity(prev => Math.max(0, prev * 0.95));
    }, 16); // ~60fps

    return () => clearInterval(decayInterval);
  }, []);

  // Calculate motion blur intensity based on scroll velocity
  const motionBlurIntensity = Math.min(scrollVelocity * 0.5, 10);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes with scroll-based parallax */}
      {[...Array(15)].map((_, i) => {
        const parallaxSpeed = 0.1 + (i % 5) * 0.05; // Different speeds for depth
        const rotationSpeed = 0.02 + (i % 3) * 0.01;
        const floatOffset = Math.sin(Date.now() * 0.001 + i) * 20;
        
        return (
        <div
          key={i}
          className={`absolute rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-white' : 'bg-blue-500'
          }`}
          style={{
            width: `${15 + (i % 4) * 15}px`,
            height: `${15 + (i % 4) * 15}px`,
            left: `${5 + (i % 10) * 10}%`,
            top: `${10 + (i % 8) * 12}%`,
            opacity: isDarkMode ? 0.15 : 0.25,
            transform: `
              translate3d(
                ${Math.sin(scrollY * 0.001 + i) * 30}px,
                ${scrollY * -parallaxSpeed + floatOffset}px,
                0
              ) 
              rotate(${scrollY * rotationSpeed}deg)
              scale(${1 + Math.sin(scrollY * 0.002 + i) * 0.1})
            `,
            filter: `blur(${motionBlurIntensity * 0.2}px)`,
            animation: `float-${(i % 3) + 1} ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: isDarkMode
              ? `0 0 ${20 + motionBlurIntensity}px rgba(255, 255, 255, 0.1)`
              : `0 0 ${20 + motionBlurIntensity}px rgba(59, 130, 246, 0.2)`
          }}
        />
        );
      })}

      {/* 3D Cubes with enhanced parallax and motion blur */}
      {[...Array(8)].map((_, i) => {
        const cubeParallaxSpeed = 0.15 + (i % 4) * 0.1;
        const cubeRotationX = scrollY * (0.05 + i * 0.01);
        const cubeRotationY = scrollY * (0.03 + i * 0.008);
        const cubeScale = 1 + Math.sin(scrollY * 0.003 + i) * 0.2;
        
        return (
        <div
          key={`cube-${i}`}
          className="absolute transition-all duration-200"
          style={{
            left: `${8 + (i % 6) * 15}%`,
            top: `${15 + (i % 5) * 18}%`,
            transform: `
              perspective(1000px) 
              translate3d(
                ${Math.cos(scrollY * 0.002 + i) * 40}px,
                ${scrollY * -cubeParallaxSpeed}px,
                ${Math.sin(scrollY * 0.003 + i) * 30}px
              )
              rotateX(${cubeRotationX}deg) 
              rotateY(${cubeRotationY}deg)
              scale(${cubeScale})
            `,
            filter: `blur(${motionBlurIntensity * 0.3}px)`,
            opacity: Math.max(0.1, 0.3 - motionBlurIntensity * 0.02)
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
                ? `0 8px 32px rgba(255, 255, 255, ${0.1 + motionBlurIntensity * 0.01})`
                : `0 8px 32px rgba(59, 130, 246, ${0.2 + motionBlurIntensity * 0.01})`
            }}
          />
        </div>
        );
      })}

      {/* Dynamic light rays that respond to scroll velocity */}
      {scrollVelocity > 5 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={`ray-${i}`}
              className={`absolute ${
                isDarkMode ? 'bg-white' : 'bg-blue-400'
              }`}
              style={{
                width: '2px',
                height: `${100 + scrollVelocity * 10}px`,
                left: `${10 + i * 15}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.min(scrollVelocity * 0.02, 0.3),
                transform: `
                  translateY(${-scrollY * 0.5}px) 
                  rotate(${15 + i * 10}deg)
                  scaleY(${1 + scrollVelocity * 0.1})
                `,
                filter: `blur(${scrollVelocity * 0.2}px)`,
                boxShadow: isDarkMode
                  ? `0 0 ${scrollVelocity}px rgba(255, 255, 255, 0.5)`
                  : `0 0 ${scrollVelocity}px rgba(59, 130, 246, 0.5)`,
                animation: `fadeIn 0.3s ease-out`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};