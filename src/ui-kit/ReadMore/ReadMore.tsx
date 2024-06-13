import React, { FC, useRef, useState } from 'react';

import { useOutsideClick } from 'common/hooks/useOutsideClick';

import s from './ReadMore.module.scss';

type ReadMoreProps = {
  text: string;
  maxLength: number;
  /** text for ReadMore button when text is hidden */
  moreText?: string;
  /** text for ReadMore button when text is shown */
  lessText?: string;
  tooltip?: boolean;
};

interface TooltipProps {
  opened: boolean;
  onClose: () => void;
  text: string;
  triggerRef?: React.RefObject<HTMLElement>;
}

const Tooltip = ({
  opened,
  triggerRef,
  onClose,
  text,
}: TooltipProps): JSX.Element | null => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    triggerRef,
    elementRef: tooltipRef,
    onOutsideClick: onClose,
    enabled: opened,
  });

  if (!opened) return null;

  return (
    <div ref={tooltipRef} className={s.tooltip}>
      {text}
    </div>
  );
};

export const ReadMore: FC<ReadMoreProps> = ({
  text,
  maxLength,
  moreText = 'More',
  lessText = 'Hide',
  tooltip = false,
}) => {
  const [isTrimmed, setIsTrimmed] = useState(true);
  const [opened, setOpened] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = (): void => {
    setOpened(false);
    toggleReadMore();
  };

  const toggleTooltip = (): void => {
    setOpened(!opened);
  };
  const toggleReadMore = (): void => {
    setIsTrimmed(!isTrimmed);
  };

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const trimmedText = `${text.slice(0, maxLength)}`;
  const textToShow = isTrimmed ? trimmedText : text;
  const buttonText = isTrimmed ? moreText : lessText;

  return (
    <div className={s.container}>
      {tooltip && (
        <Tooltip
          triggerRef={buttonRef}
          text={textToShow}
          onClose={onClose}
          opened={opened}
        />
      )}
      {opened ? trimmedText : textToShow}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (tooltip) {
            toggleTooltip();
          }
          toggleReadMore();
        }}
        className={s.button}
      >
        {buttonText}
      </button>
    </div>
  );
};
