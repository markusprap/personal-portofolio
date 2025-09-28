"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { TechOrbitAnimation } from './tech-orbit-animation';
import { LoadingMessages } from './loading-messages';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [logoBlur, setLogoBlur] = useState(10);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'orbit' | 'snap' | 'complete'>('initial');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Get current theme with fallback
  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {

    // Animation timeline - faster on mobile
    const mobileFactor = isMobile ? 0.7 : 1; // 30% faster on mobile
    const timeline = [
      // Phase 1: Initial setup (0-500ms)
      { time: 0, action: () => setAnimationPhase('initial') },
      
      // Phase 2: Start orbit and logo animation (500ms)
      { 
        time: 500 * mobileFactor, 
        action: () => {
          setAnimationPhase('orbit');
          // Start progress and logo blur animation
          const progressSpeed = isMobile ? 3 : 2;
          const progressInterval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 100) {
                clearInterval(progressInterval);
                return 100;
              }
              return prev + progressSpeed;
            });
          }, 50);

          const blurSpeed = isMobile ? 0.3 : 0.2;
          const blurInterval = setInterval(() => {
            setLogoBlur(prev => {
              if (prev <= 0) {
                clearInterval(blurInterval);
                return 0;
              }
              return prev - blurSpeed;
            });
          }, 30);
        }
      },

      // Phase 3: Update messages throughout
      { time: 800 * mobileFactor, action: () => setCurrentMessageIndex(1) },
      { time: 1400 * mobileFactor, action: () => setCurrentMessageIndex(2) },
      { time: 1800 * mobileFactor, action: () => setCurrentMessageIndex(3) },
      { time: 2200 * mobileFactor, action: () => setCurrentMessageIndex(4) },

      // Phase 4: Snap to positions (2000ms)
      { time: 2000 * mobileFactor, action: () => setAnimationPhase('snap') },

      // Phase 5: Complete and exit (2500ms)
      { time: 2500 * mobileFactor, action: () => setAnimationPhase('complete') },
      { time: 3000 * mobileFactor, action: () => onComplete() }
    ];

    const timers = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);



  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-background"
        style={{
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh'
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
              width={240}
              height={240}
              className="w-48 h-48 sm:w-60 sm:h-60 object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Tech Icons Orbit Animation */}
        <TechOrbitAnimation 
          phase={animationPhase === 'initial' ? 'orbit' : animationPhase}
          onAnimationComplete={() => {
            if (animationPhase === 'snap') {
              setTimeout(() => setAnimationPhase('complete'), 500);
            }
          }}
        />

        {/* Loading Messages */}
        <LoadingMessages 
          progress={progress}
          currentMessageIndex={currentMessageIndex}
        />

        {/* Ambient Background Effect - Enhanced theme-adaptive */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            style={{
              background: currentTheme === 'dark'
                ? `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(100, 100, 100, 0.01) 40%, transparent 70%)`
                : `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Secondary ambient layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: currentTheme === 'dark'
                ? `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.01) 0%, transparent 50%)`
                : `radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)`
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>

        {/* Particle Effects - Theme-adaptive and reduced on mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: currentTheme === 'dark' 
                  ? `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${200 + Math.random() * 55}, 0.1)` // White/gray variations for dark
                  : `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 100}, ${241}, 0.4)`, // Blue variations for light
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: currentTheme === 'dark' 
                  ? '0 0 4px rgba(255, 255, 255, 0.1)' 
                  : '0 0 6px rgba(99, 102, 241, 0.4)'
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};