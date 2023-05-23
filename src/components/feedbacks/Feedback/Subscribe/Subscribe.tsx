import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import { Button, Input } from '../../../../ui-kit';

import style from './Subscribe.module.css';

export interface SubscribeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Subscribe: FC<SubscribeProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <div className={cn(className)} {...restProps}>
      <div className={style.title}>Do you want to be the first</div>
      <div className={style.subtitle}>to know about new products and hype products?</div>
      <div className={style.input_box}>
        <Input placeholder="Enter your email address" />
        <Button label="Subscribe" />
      </div>
    </div>
  );
};
