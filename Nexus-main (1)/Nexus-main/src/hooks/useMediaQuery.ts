import { useState, useEffect } from 'react';

/**
 * A custom hook that returns whether a media query matches
 * @param query The media query to check
 * @returns A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQuery.matches);

    // Define a callback function to handle changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the callback as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoints for common screen sizes
 */
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

/**
 * A custom hook that returns whether the screen is mobile
 * @returns A boolean indicating whether the screen is mobile
 */
export function useIsMobile(): boolean {
  return !useMediaQuery(breakpoints.md);
}

/**
 * A custom hook that returns whether the screen is tablet
 * @returns A boolean indicating whether the screen is tablet
 */
export function useIsTablet(): boolean {
  return useMediaQuery(breakpoints.md) && !useMediaQuery(breakpoints.lg);
}

/**
 * A custom hook that returns whether the screen is desktop
 * @returns A boolean indicating whether the screen is desktop
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(breakpoints.lg);
}