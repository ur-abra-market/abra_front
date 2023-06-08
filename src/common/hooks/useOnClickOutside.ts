import { RefObject, useEffect, useRef } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = (handler: (value: boolean) => void): RefObject<any> => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (event: Event): void => {
      const el = ref?.current;

      if (!el || el.contains((event?.target as Node) || null)) return;

      if (handler) {
        handler(false);
      } // Call the handler only if the click is outside the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes

  return ref;
};

export default useOnClickOutside;
