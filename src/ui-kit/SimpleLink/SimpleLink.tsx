import React, { forwardRef, ReactNode } from 'react';

import cn from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import styles from './SimpleLink.module.scss';

export interface ISimpleLink extends LinkProps {
  color: 'accent' | 'default';
  className?: string;
  children: ReactNode;
}

export const SimpleLink = forwardRef<LinkProps, ISimpleLink>(
  ({ to, className, color, children, ...restProps }, ref) => {
    const linkClasses = cn(
      styles.link,
      {
        [styles.default]: color === 'default',
        [styles.accent]: color === 'accent',
      },
      className,
    );

    return (
      <Link to={to} className={linkClasses} {...restProps}>
        {children}
      </Link>
    );
  },
);
