import { useEffect } from 'react';

export const useBodyOverflowHidden = (isHidden: boolean, minHeigth?: number): void => {
  useEffect(() => {
    const setStyle = (
      overflow = '',
      maxHeight = '',
      minHeight = '',
      htmlOverflowY = '',
    ): void => {
      document.body.style.overflow = overflow;
      document.body.style.maxHeight = maxHeight;
      document.body.style.minHeight = minHeight;
      document.querySelector('html')!.style.overflowY = htmlOverflowY;
    };

    if (isHidden) {
      setStyle('hidden', '100vh', `${minHeigth}px`, 'scroll');
    } else {
      setStyle();
    }
  }, [isHidden, minHeigth]);
};
