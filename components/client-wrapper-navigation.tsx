"use client";

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoadingScreen } from '@/components/loading/loading-screen';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showLoading, setShowLoading] = useState(true); // Start with loading TRUE
  const [isNavigating, setIsNavigating] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [previousPathname, setPreviousPathname] = useState(pathname);
  
  // Configuration - production ready
  const FORCE_LOADING = false; 
  const SHOW_ON_NAVIGATION = true;

  // Handle initial load
  useEffect(() => {
    if (initialLoad) {
      setShowLoading(true);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Track route changes - SMART LOGIC: Only show loading for different pages
  useEffect(() => {
    if (SHOW_ON_NAVIGATION && !initialLoad && pathname !== previousPathname) {
      // Only show loading if we're actually navigating to a DIFFERENT page
      const isDifferentPage = pathname !== previousPathname;
      
      if (isDifferentPage) {
        setIsNavigating(true);
        setShowLoading(true);
        setPreviousPathname(pathname);
        
        // Show loading screen immediately, then hide after page is ready
        const timer = setTimeout(() => {
          setIsNavigating(false);
        }, 10); // Very short delay to ensure loading shows

        return () => clearTimeout(timer);
      }
    }
  }, [pathname, searchParams, SHOW_ON_NAVIGATION, initialLoad, previousPathname]);

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

  // Show loading screen conditions
  const shouldShowLoading = FORCE_LOADING || showLoading || initialLoad;

  if (shouldShowLoading) {
    return (
      <>
        <LoadingScreen onComplete={() => {
          setShowLoading(false);
          setInitialLoad(false);
        }} />
        <div style={{ visibility: 'hidden' }}>
          {children}
        </div>
      </>
    );
  }

  // Default: show main content
  return <>{children}</>;
};

// Wrapper with Suspense for useSearchParams
export const ClientWrapperWithSuspense = ({ children }: ClientWrapperProps) => {
  return (
    <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
      <ClientWrapper>{children}</ClientWrapper>
    </Suspense>
  );
};