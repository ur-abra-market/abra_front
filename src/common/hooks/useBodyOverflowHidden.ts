import { useEffect } from 'react';

// import { getScrollBarWidth } from 'common/utils';

export const useBodyOverflowHidden = (isHidden: boolean): void => {
  useEffect(() => {
    // const scrollWidth = getScrollBarWidth();

    [
      document.body.style.overflow,
      document.body.style.maxHeight,
      document.querySelector('html')!.style.overflowY,
    ] = isHidden ? ['hidden', '100vh', 'scroll'] : ['', '', ''];
  }, [isHidden]);
};
