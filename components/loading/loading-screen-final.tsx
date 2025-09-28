"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiGo 
} from 'react-icons/si';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logoBlur, setLogoBlur] = useState(10);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'orbit' | 'complete'>('initial');

  // Theme with fallback
  const currentTheme = mounted ? resolvedTheme : 'dark';

  // Tech stack icons
  const techIcons = [
    { icon: SiJavascript, color: '#f7df1e' },
    { icon: SiReact, color: '#61dafb' },
    { icon: SiNextdotjs, color: currentTheme === 'dark' ? '#ffffff' : '#000000' },
    { icon: SiNodedotjs, color: '#339933' },
    { icon: SiPython, color: '#3776ab' },
    { icon: SiGo, color: '#00add8' },
  ];

  useEffect(() => {
    setMounted(true);
    
    // Animation timeline
    const timeline = [
      { time: 0, action: () => setAnimationPhase('initial') },
      { time: 500, action: () => setAnimationPhase('orbit') },
      { time: 2000, action: () => setAnimationPhase('complete') },
      { time: 3000, action: () => onComplete() }
    ];

    const timers = timeline.map(({ time, action }) => 
      setTimeout(action, time)
    );

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Logo blur animation
    const blurTimer = setInterval(() => {
      setLogoBlur(prev => {
        if (prev <= 0) {
          clearInterval(blurTimer);
          return 0;
        }
        return prev - 0.2;
      });
    }, 30);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressTimer);
      clearInterval(blurTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center"
        style={{
          background: currentTheme === 'dark' 
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          zIndex: 9999,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Central Logo with Blur Animation */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            style={{ filter: `blur(${logoBlur}px)` }}
            className="flex items-center justify-center"
          >
            <Image
              src={currentTheme === 'dark' ? '/logo_dark.png' : '/logo_light.png'}
              alt="Portfolio Logo"
              width={120}
              height={120}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Tech Stack Orbit Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techIcons.map((tech, index) => {
            const IconComponent = tech.icon;
            const angle = (index * 360) / techIcons.length;
            const radius = 120;
            
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  width: '48px',
                  height: '48px',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0
                }}
                animate={animationPhase === 'orbit' || animationPhase === 'complete' ? {
                  x: Math.cos((angle * Math.PI) / 180) * radius,
                  y: Math.sin((angle * Math.PI) / 180) * radius,
                  opacity: 1,
                  scale: 1,
                  rotate: animationPhase === 'orbit' ? 360 : 0
                } : {}}
                transition={{
                  duration: animationPhase === 'orbit' ? 10 : 1,
                  repeat: animationPhase === 'orbit' ? Infinity : 0,
                  ease: animationPhase === 'orbit' ? 'linear' : 'easeOut',
                  delay: index * 0.1
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                  style={{
                    backgroundColor: currentTheme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    border: `2px solid ${tech.color}`,
                    boxShadow: `0 0 20px ${tech.color}40`
                  }}
                >
                  <IconComponent 
                    size={24} 
                    color={tech.color}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64">
          <div 
            className="h-1 rounded-full mb-4"
            style={{
              backgroundColor: currentTheme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: currentTheme === 'dark'
                  ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                  : 'linear-gradient(90deg, #2563eb, #7c3aed)'
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div 
            className="text-center text-sm"
            style={{ 
              color: currentTheme === 'dark' ? '#9ca3af' : '#6b7280'
            }}
          >
            Assembling Tech Stack... {Math.round(progress)}%
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};