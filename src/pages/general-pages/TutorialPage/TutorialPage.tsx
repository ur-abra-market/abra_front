import React from 'react';

import style from './Tutorial.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const TutorialPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <h2>Coming soon...</h2>
      {/* <p className={style.title}>Tutorial for Buyers</p> */}
    </div>
  );
});
