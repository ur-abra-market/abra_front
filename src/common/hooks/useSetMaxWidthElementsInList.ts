import { useLayoutEffect, RefObject, useState } from 'react';

interface IUseSetMaxWidthElementsInList {
  refs: RefObject<HTMLElement>[];
}

const DEFAULT_WIDTH = 64;
const EXTRA_PADDING = 12;

export const useSetMaxWidthElementsInList = ({
  refs,
}: IUseSetMaxWidthElementsInList): void => {
  const [maxWidthElement, setMaxWidthElement] = useState<number>(DEFAULT_WIDTH);

  useLayoutEffect(() => {
    const updateWidth = (): void => {
      refs.forEach(ref => {
        if (ref.current) {
          // Get element width
          const { width } = ref.current.getBoundingClientRect();

          if (maxWidthElement < width) {
            // Set element width in state
            setMaxWidthElement(width + EXTRA_PADDING);
          }
        }
      });
    };

    // Call updateWidth on mount
    updateWidth();

    // Set the maximum value to all ref
    refs.forEach(ref => {
      if (ref.current) {
        Object.assign(ref.current.style, { width: `${maxWidthElement}px` });
      }
    });

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [refs]);
};
