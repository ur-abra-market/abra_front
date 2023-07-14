import React from 'react';

import style from './Subscribe.module.scss';

import { Button, Input } from 'ui-kit';

export const Subscribe = (): JSX.Element => {
  return (
    <div>
      <div className={style.title}>Do you want to be the first</div>
      <div className={style.subtitle}>to know about new products and hype products?</div>
      <div className={style.input_box}>
        <Input placeholder="Enter your email address" />
        <Button label="Subscribe" />
      </div>
    </div>
  );
};
