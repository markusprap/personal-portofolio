"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme with fallback
  const currentTheme = mounted ? resolvedTheme : 'dark';

  useEffect(() => {
    setMounted(true);
    
    // Simple timer to complete loading
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
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
        {/* Simple Loading Content */}
        <div className="text-center">
          <div 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: currentTheme === 'dark' ? '#ffffff' : '#1f2937'
            }}
          >
            Loading Portfolio...
          </div>
          
          <div 
            className="text-lg"
            style={{ 
              color: currentTheme === 'dark' ? '#9ca3af' : '#6b7280'
            }}
          >
            {mounted ? 'Ready!' : 'Initializing...'}
          </div>

          {/* Simple animated dot */}
          <motion.div
            className="mt-8 w-4 h-4 rounded-full mx-auto"
            style={{
              backgroundColor: currentTheme === 'dark' ? '#ffffff' : '#1f2937'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};