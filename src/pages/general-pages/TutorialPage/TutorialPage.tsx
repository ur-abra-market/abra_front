import React from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

import style from './Tutorial.module.scss';

const TutorialPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <Title>Coming soon...</Title>
      {/* <p className={style.title}>Tutorial for Buyers</p> */}
    </div>
  );
});

export default TutorialPage;
