import React from 'react';

import { Container } from '../../Container/Container';
import Social from '../Social';
import Subscribe from '../Subscribe';
import WhatsApp from '../WhatsApp';

import style from './Feedback.module.css';

const Feedback = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <Container className={style.container}>
        <div>
          <Subscribe />
        </div>
        <div className={style.social_block}>
          <WhatsApp />
          <Social />
        </div>
      </Container>
    </div>
  );
};

export default Feedback;
