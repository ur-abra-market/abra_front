import { useEffect, useState } from 'react';

const DEFAULT_BREAKPOINT = 769;

export const useMediaQuery = (breakpoint = DEFAULT_BREAKPOINT): { isDevice: boolean } => {
  const [isDevice, setIsDevice] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handlePageResized = (): void => {
      setIsDevice(window.innerWidth < breakpoint);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handlePageResized);
      window.addEventListener('orientationchange', handlePageResized);
      window.addEventListener('load', handlePageResized);
      window.addEventListener('reload', handlePageResized);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handlePageResized);
        window.removeEventListener('orientationchange', handlePageResized);
        window.removeEventListener('load', handlePageResized);
        window.removeEventListener('reload', handlePageResized);
      }
    };
  }, [breakpoint]);

  return {
    isDevice,
  };
};
