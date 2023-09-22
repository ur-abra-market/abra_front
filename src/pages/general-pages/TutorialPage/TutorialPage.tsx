import React from 'react';

import style from './Tutorial.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

export const TutorialPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <Title>Coming soon...</Title>
      {/* <p className={style.title}>Tutorial for Buyers</p> */}
    </div>
  );
});
