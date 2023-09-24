import { ComponentPropsWithoutRef, FC } from 'react';

import cn from 'classnames';

import style from './Paragraph.module.scss';

export type ParagraphType = {
  size?: 'm' | 's2' | 's' | 'xs2' | 'xs' | 'xxs';
  weight?: 'regular' | 'medium' | 'light';
  className?: string;
} & ComponentPropsWithoutRef<'p'>;

export const Paragraph: FC<ParagraphType> = ({
  size = 's',
  weight = 'regular',
  className = '',
  ...rest
}): JSX.Element => {
  const classNames = cn(style.default, style[size], style[weight], className);

  return <p {...rest} className={classNames} />;
};
