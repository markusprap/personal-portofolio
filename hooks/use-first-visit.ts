"use client";

import { useState, useEffect } from 'react';

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check localStorage for previous visit
    const hasVisited = localStorage.getItem('portfolio-visited');
    
    if (!hasVisited) {
      // First time visitor
      setIsFirstVisit(true);
      localStorage.setItem('portfolio-visited', 'true');
    } else {
      // Returning visitor
      setIsFirstVisit(false);
    }
    
    setIsLoading(false);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return { isFirstVisit: false, isLoading: true };
  }

  return { isFirstVisit, isLoading };
};