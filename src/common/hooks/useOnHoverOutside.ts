import { useEffect } from 'react';

export function useOnHoverOutside(ref: any, handler: (event: Event) => void): void {
  useEffect(() => {
    const listener = (event: Event): void => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mouseover', listener);

    return () => {
      document.removeEventListener('mouseout', listener);
    };
  }, [ref, handler]);
}
