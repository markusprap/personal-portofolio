"use client";

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiGo, 
  SiPhp, 
  SiLaravel 
} from 'react-icons/si';

interface TechOrbitAnimationProps {
  phase: 'orbit' | 'snap' | 'complete';
  onAnimationComplete?: () => void;
}

export const TechOrbitAnimation = ({ phase, onAnimationComplete }: TechOrbitAnimationProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Get current theme with fallback
  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';
  
  // Responsive icon count with hooks for performance
  const [iconCount, setIconCount] = useState(8);
  
  useEffect(() => {
    setMounted(true);
    const updateIconCount = () => {
      if (window.innerWidth < 640) setIconCount(4); // mobile
      else if (window.innerWidth < 1024) setIconCount(6); // tablet
      else setIconCount(8); // desktop
    };

    updateIconCount();
    window.addEventListener('resize', updateIconCount);
    return () => window.removeEventListener('resize', updateIconCount);
  }, []);

  // Tech stack - Theme-adaptive colors matching tech-stack-section.tsx
  const techIcons = [
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: currentTheme === 'dark' ? '#FBBF24' : '#F59E0B', // Yellow 400/500
      bg: currentTheme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(245, 158, 11, 0.1)'
    },
    {
      name: "React.js", 
      icon: SiReact,
      color: theme === 'dark' ? '#22D3EE' : '#06B6D4', // Cyan 400/500
      bg: theme === 'dark' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(6, 182, 212, 0.1)'
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: currentTheme === 'dark' ? '#FFFFFF' : '#000000', // Theme adaptive black/white
      bg: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: currentTheme === 'dark' ? '#4ADE80' : '#22C55E', // Green 400/500
      bg: currentTheme === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(34, 197, 94, 0.1)'
    },
    {
      name: "Python",
      icon: SiPython,
      color: currentTheme === 'dark' ? '#60A5FA' : '#3B82F6', // Blue 400/500
      bg: currentTheme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'
    },
    {
      name: "Go",
      icon: SiGo,
      color: currentTheme === 'dark' ? '#22D3EE' : '#06B6D4', // Cyan 400/500
      bg: currentTheme === 'dark' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(6, 182, 212, 0.1)'
    },
    {
      name: "PHP",
      icon: SiPhp,
      color: currentTheme === 'dark' ? '#A78BFA' : '#8B5CF6', // Purple 400/500
      bg: currentTheme === 'dark' ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)'
    },
    {
      name: "Laravel",
      icon: SiLaravel,
      color: currentTheme === 'dark' ? '#F87171' : '#EF4444', // Red 400/500
      bg: currentTheme === 'dark' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(239, 68, 68, 0.1)'
    }
  ];

  const visibleIcons = techIcons.slice(0, iconCount);
  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 160;

  const getOrbitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const getFinalPosition = (index: number, total: number) => {
    // Icons snap to positions around the screen edges
    const positions = [
      { x: -200, y: -100 }, // top left
      { x: 200, y: -100 },  // top right
      { x: -250, y: 0 },    // middle left
      { x: 250, y: 0 },     // middle right
      { x: -200, y: 100 },  // bottom left
      { x: 200, y: 100 },   // bottom right
      { x: 0, y: -150 },    // top center
      { x: 0, y: 150 }      // bottom center
    ];
    
    return positions[index] || { x: 0, y: 0 };
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {visibleIcons.map((tech, index) => {
        const orbitPos = getOrbitPosition(index, visibleIcons.length);
        const finalPos = getFinalPosition(index, visibleIcons.length);
        
        return (
          <motion.div
            key={tech.name}
            className="absolute w-12 h-12 flex items-center justify-center rounded-full border-2"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: tech.bg,
              backdropFilter: 'blur(10px)',
              borderColor: tech.color + (currentTheme === 'dark' ? '40' : '30'),
              boxShadow: `0 0 20px ${tech.color}${currentTheme === 'dark' ? '40' : '30'}`
            }}
            initial={{ x: 0, y: 0, scale: 0.8, opacity: 0 }}
            animate={
              phase === 'orbit' 
                ? {
                    x: orbitPos.x,
                    y: orbitPos.y,
                    scale: 1,
                    opacity: 1,
                    rotate: 360
                  }
                : phase === 'snap'
                ? {
                    x: finalPos.x,
                    y: finalPos.y,
                    scale: 0.9,
                    opacity: 0.8,
                    rotate: 0
                  }
                : {
                    scale: 0,
                    opacity: 0
                  }
            }
            transition={
              phase === 'orbit'
                ? {
                    duration: 2,
                    ease: "easeInOut",
                    rotate: {
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity
                    }
                  }
                : phase === 'snap'
                ? {
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: index * 0.1
                  }
                : {
                    duration: 0.3
                  }
            }
            onAnimationComplete={() => {
              if (phase === 'snap' && index === visibleIcons.length - 1) {
                onAnimationComplete?.();
              }
            }}
          >
            <tech.icon 
              className="text-2xl"
              style={{ 
                color: tech.color,
                filter: `drop-shadow(0 0 8px ${tech.color}60)`,
                textShadow: `0 0 10px ${tech.color}40`
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};