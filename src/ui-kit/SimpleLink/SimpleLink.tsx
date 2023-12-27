import { FC, ReactNode } from 'react';

import cn from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import styles from './SimpleLink.module.scss';

export interface ISimpleLink extends LinkProps {
  color: 'accent' | 'default';
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

export const SimpleLink: FC<ISimpleLink> = ({
  to,
  className,
  color,
  children,
  disabled,
  ...restProps
}) => {
  const simpleLinkClasses = cn(className, styles.link, {
    [styles.default]: color === 'default',
    [styles.accent]: color === 'accent',
    [styles.disabled]: disabled,
  });

  return (
    <Link to={to} className={simpleLinkClasses} {...restProps}>
      {children}
    </Link>
  );
};
