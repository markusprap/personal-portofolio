"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/loading/loading-screen';

interface GlobalLoadingProviderProps {
  children: React.ReactNode;
}

export const GlobalLoadingProvider = ({ children }: GlobalLoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Show loading screen immediately on navigation
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for navigation events
    const originalPush = router.push;
    router.push = (...args) => {
      handleStart();
      return originalPush.apply(router, args);
    };

    // Hide loading when page is ready
    const timer = setTimeout(handleComplete, 100);

    return () => {
      clearTimeout(timer);
      router.push = originalPush;
    };
  }, [router]);

  // Show loading for initial page load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
};