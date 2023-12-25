import { DetailedHTMLProps, FC, HTMLAttributes, KeyboardEvent } from 'react';

import cn from 'classnames';

import styles from './ButtonBundle.module.scss';

export interface IButtonBundle
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  children: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const ButtonBundle: FC<IButtonBundle> = ({
  className,
  isSelected = false,
  children,
  onClick,
  ...resProps
}): JSX.Element => {
  const buttonBundleClasses = cn(
    styles.button,
    {
      [styles.default]: !isSelected,
      [styles.selected]: isSelected,
    },
    className,
  );

  const onHandlerKeyDown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
      onClick();
    }
  };

  return (
    <div
      className={buttonBundleClasses}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onHandlerKeyDown}
      {...resProps}
    >
      {children}
    </div>
  );
};
