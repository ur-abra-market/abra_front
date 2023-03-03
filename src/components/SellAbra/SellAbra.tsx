import React, { FC } from 'react';

import { Layout } from '../../layouts/Layout/Layout';

import { ContentBox } from './Content/ContentBox';
import style from './SellAbra.module.css';

export const SellAbra: FC = () => {
  return (
    <Layout>
      <div className={style.container}>
        <p className={style.title}>Sell on Abra</p>
        <div>
          <ContentBox
            content="You only need email and password"
            value={1}
            titleText="Register on Abra as a supplier"
          />
          <ContentBox
            content="This information will not be published. The data will only be used to create your account"
            value={2}
            titleText="Fill in the account page info"
          />
          <ContentBox
            content="Fill the business profile page"
            value={3}
            titleText="Enter the information you want to show on your store profile"
          />
          <ContentBox
            content="Fill the product list page with your product information"
            value={4}
            titleText="Tell us about your first product"
          />
        </div>
      </div>
    </Layout>
  );
};
