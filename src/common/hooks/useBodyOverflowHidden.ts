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
      // setStyle('hidden', '100vh', `${minHeigth}px`, 'scroll');
      document.body.style.maxHeight = '100vh';
      document.body.style.marginRight = '17px';
      document.body.style.overflow = 'hidden';
    } else {
      // setStyle();
      document.body.style.maxHeight = '';
      document.body.style.marginRight = '';
      document.body.style.overflow = '';
    }
  }, [isHidden, minHeigth]);
};
