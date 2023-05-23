import React from 'react';

import { Layout } from '../../../layouts/Layout/Layout';

import style from './Tutorial.module.css';

export const TutorialPage = (): JSX.Element => {
  return (
    <Layout>
      <div className={style.container}>
        <p className={style.title}>Tutorial for Buyers</p>
      </div>
    </Layout>
  );
};
