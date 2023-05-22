import React, { FC } from 'react';

import { Layout } from '../../layouts/Layout/Layout';

import style from './UnderConstruction.module.css';

const UnderConstruction: FC = () => {
  return (
    <Layout>
      <div className={style.container}>
        <p className={style.title}>SORRY!</p>
        <div className={style.under_construction_icon} />
        <p className={style.title}>THIS PAGE IS UNDER CONSTRUCTION</p>
        <p className={style.text}>
          Please bare with us we are updating the page content.
        </p>
      </div>
    </Layout>
  );
};

export default UnderConstruction;
