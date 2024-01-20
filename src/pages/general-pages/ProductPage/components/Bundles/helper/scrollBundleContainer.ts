import { RefObject } from 'react';

export const scrollBundleContainer = (
  direction: 'left' | 'right',
  ref: RefObject<HTMLElement>,
): void => {
  const container = ref.current;

  if (container) {
    const step = 100;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    let newScroll;

    if (direction === 'left') {
      newScroll = Math.max(0, currentScroll - step);
    } else {
      newScroll = Math.min(maxScroll, currentScroll + step);
    }

    container.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  }
};
