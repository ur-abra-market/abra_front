import { ComponentPropsWithoutRef, ElementType, JSX, ReactNode } from 'react';

import cn from 'classnames';

import style from './Typography.module.scss';

export interface TextProps<T extends ElementType> {
  as?: T;
  children?: ReactNode;
  className?: string;
}

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  ...restProps
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>): JSX.Element => {
  const Component = as || 'p';

  const typographyClasses = cn(className, {
    [style.default_typography]: !className,
  });

  return <Component className={typographyClasses} {...restProps} />;
};
