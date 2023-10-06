import React from 'react';

import { Item } from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

import style from './SellAbra.module.scss';

const SellAbraPage = WithLayout(() => (
  <div className={style.container}>
    <Title>Sell on Abra</Title>
    <div className={style.wrapper}>
      <Item
        description="You only need email and password"
        numberItem={1}
        title="Register on Abra as a supplier"
      />
      <Item
        description="This information will not be published. The data will only be used to create your account"
        numberItem={2}
        title="Fill in the account page info"
      />
      <Item
        description="Fill the business profile page"
        numberItem={3}
        title="Enter the information you want to show on your store profile"
      />
      <Item
        description="Fill the product list page with your product information"
        numberItem={4}
        title="Tell us about your first product"
      />
    </div>
  </div>
));

export default SellAbraPage;
