import React from 'react';

import { WithLayout } from '../../../common/hocs/WithLayout';

import style from './Tutorial.module.scss';

export const TutorialPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <p className={style.title}>Tutorial for Buyers</p>
    </div>
  );
});
