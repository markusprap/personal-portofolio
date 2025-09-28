"use client";

import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/loading/loading-screen';
import { useFirstVisit } from '@/hooks/use-first-visit';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const { isFirstVisit, isLoading } = useFirstVisit();
  const [showLoading, setShowLoading] = useState(true);
  
  // DEBUG: Force loading screen for testing (comment out when done)
  const FORCE_LOADING = false; // Set to true to always show loading

  // DEBUG: Log values to console (remove in production)
  // console.log('ClientWrapper Debug:', { isFirstVisit, isLoading, showLoading, FORCE_LOADING });

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      '/logo_light.png',
      '/logo_dark.png'
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // If forcing loading, show loading screen immediately
  if (FORCE_LOADING && showLoading) {
    return (
      <>
        <LoadingScreen onComplete={() => setShowLoading(false)} />
        <div style={{ visibility: 'hidden' }}>
          {children}
        </div>
      </>
    );
  }

  // If we're still checking localStorage (and not forcing), wait
  if (isLoading && !FORCE_LOADING) {
    return null;
  }

  // If first visit and not forcing, show loading screen
  if (isFirstVisit && !FORCE_LOADING && showLoading) {
    return (
      <>
        <LoadingScreen onComplete={() => setShowLoading(false)} />
        <div style={{ visibility: 'hidden' }}>
          {children}
        </div>
      </>
    );
  }

  // Loading complete - show main content
  return <>{children}</>;
};