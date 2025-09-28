"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const loadingMessages = [
  { emoji: "⚡", text: "Initializing portfolio..." },
  { emoji: "🔧", text: "Compiling components..." },
  { emoji: "📦", text: "Loading awesome projects..." },
  { emoji: "✨", text: "Preparing digital magic..." },
  { emoji: "🚀", text: "Ready to showcase! Welcome 👋" }
];

interface LoadingMessagesProps {
  progress: number;
  currentMessageIndex: number;
}

export const LoadingMessages = ({ progress, currentMessageIndex }: LoadingMessagesProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const currentMessage = loadingMessages[currentMessageIndex] || loadingMessages[0];

  useEffect(() => {
    setDisplayedText('');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentMessage.text.length) {
        setDisplayedText(currentMessage.text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentMessage.text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-2 text-lg sm:text-xl">
            <span className="text-2xl">{currentMessage.emoji}</span>
            <span className="text-muted-foreground">
              {displayedText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          {/* Progress Percentage */}
          <motion.span 
            className="text-sm text-muted-foreground font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};