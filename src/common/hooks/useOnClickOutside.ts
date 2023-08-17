import { RefObject, useEffect, useRef } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  handler: (value: boolean) => void,
  value?: boolean,
): RefObject<any> => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (event: Event): void => {
      const el = ref?.current;

      if (!el || el.contains((event?.target as Node) || null)) return;

      handler(false); // Call the handler only if the click is outside the element passed.
    };

    const keydownListener = (): void => {
      setTimeout(() => {
        const isActiveElement = ref?.current?.contains(document.activeElement);

        if (!isActiveElement) handler(false);
      }, 0);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    if (value) document.addEventListener('keydown', keydownListener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keydown', keydownListener);
    };
  }, [ref, handler, value]); // Reload only if ref or handler changes

  return ref;
};
