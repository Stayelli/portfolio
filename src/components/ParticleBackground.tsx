// src/components/ParticleBackground.tsx
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim'; // This loads the lightweight engine
import type { ISourceOptions } from 'tsparticles-engine';

interface ParticleBackgroundProps {
  isDarkMode: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isDarkMode }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // This loads the 'slim' version of tsparticles, which is lightweight
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = React.useMemo(() => ({
    background: {
      color: {
        value: 'transparent', // Handled by App.tsx CSS
      },
    },
    fpsLimit: 60, // Limit FPS to save resources
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse', // Pushes particles away on hover
        },
      },
      modes: {
        repulse: {
          distance: 60,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: isDarkMode ? '#ffffff' : '#3b82f6', // Changes with dark mode
      },
      links: {
        color: isDarkMode ? '#4b5563' : '#9ca3af', // Faint lines
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true, // Random movement
        speed: 0.3, // Very slow
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1200, // Adjust density
        },
        value: 40, // Number of particles
      },
      opacity: {
        value: 0.1, // Faint particles
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), [isDarkMode]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="fixed inset-0 -z-10" // Ensures it stays in the background
    />
  );
};