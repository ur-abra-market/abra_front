import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './ButtonBundle.module.scss';

export interface IButtonBundle
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  children: string;
  isSelected?: boolean;
}

export const ButtonBundle: FC<IButtonBundle> = ({
  className,
  isSelected = false,
  children,
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

  return (
    <button type="button" className={buttonBundleClasses} {...resProps}>
      {children}
    </button>
  );
};
