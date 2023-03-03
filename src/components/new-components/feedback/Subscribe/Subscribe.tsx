import React, { FC } from 'react';

import cn from 'classnames';

import { Button, Input } from '../../../ui-kit';

import style from './Subscribe.module.css';
import { SubscribeProps } from './Subscribe.props';

const Subscribe: FC<SubscribeProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

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

export default Subscribe;
