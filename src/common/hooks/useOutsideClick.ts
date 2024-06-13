import React, { useEffect } from 'react';

interface UseOutsideClickOptions {
  elementRef: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
  onOutsideClick: (e: MouseEvent | TouchEvent) => void;
}

export function useOutsideClick({
  elementRef,
  onOutsideClick,
  enabled = true,
  triggerRef,
}: UseOutsideClickOptions): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const handleClick = (e: MouseEvent | TouchEvent): void => {
      const { target } = e;

      if (!(target instanceof Node)) {
        return;
      }
      if (!elementRef.current) {
        return;
      }
      const ignoreElements = [elementRef.current];

      if (triggerRef?.current) {
        ignoreElements.push(triggerRef.current);
      }

      if (!ignoreElements.some(el => el.contains(target))) {
        onOutsideClick(e);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [enabled, onOutsideClick, elementRef, triggerRef]);
}
