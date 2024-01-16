import { useLayoutEffect, RefObject } from 'react';

interface UseEqualWidthProps {
  refs: RefObject<HTMLElement>[];
}

const DEFAULT_WIDTH = 64;

export const useEqualWidth = ({ refs }: UseEqualWidthProps): void => {
  useLayoutEffect(() => {
    const updateWidth = (): void => {
      // Create an array to store width values
      const widths: number[] = [];

      // Fill the array with the width values of each ref
      refs.forEach(ref => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();

          widths.push(width);
        }
      });

      // Calculate the maximum width value
      const maxWidth =
        Math.max(...widths) > DEFAULT_WIDTH ? Math.max(...widths) : DEFAULT_WIDTH;

      // Apply the maximum value to all ref
      refs.forEach(ref => {
        if (ref.current) {
          Object.assign(ref.current.style, { width: `${maxWidth}px` });
        }
      });
    };

    // Call updateWidth on mount
    updateWidth();

    // Add resize event listener
    window.addEventListener('resize', updateWidth);

    // Remove unmount event listener
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [refs]);
};
