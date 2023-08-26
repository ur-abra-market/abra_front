import { useEffect } from 'react';

export const useBodyOverflowHidden = (isHidden: boolean, minHeigth?: number): void => {
  useEffect(() => {
    [
      document.body.style.overflow,
      document.body.style.maxHeight,
      document.body.style.minHeight,
      document.querySelector('html')!.style.overflowY,
    ] = isHidden ? ['hidden', '100vh', `${minHeigth}px`, 'scroll'] : ['', '', '', ''];
  }, [isHidden, minHeigth]);
};
