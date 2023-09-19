import { ComponentPropsWithoutRef } from 'react';

import cn from 'classnames';

import style from './Title.module.scss';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4';

export interface TextProps<T extends TitleType> {
  as?: T;
  font?: 'xl' | 'l' | 'm' | 's' | 'xs';
  weight?: 'bold' | 'semi_bold';
  className?: string;
}

export const Title = <T extends TitleType = 'h2'>({
  as,
  className,
  font = 'l',
  weight = 'bold',
  ...restProps
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>): JSX.Element => {
  const classNames = cn(style.default, style[font], style[weight], className);
  const Component: TitleType = as || 'h2';

  return <Component className={classNames} {...restProps} />;
};
