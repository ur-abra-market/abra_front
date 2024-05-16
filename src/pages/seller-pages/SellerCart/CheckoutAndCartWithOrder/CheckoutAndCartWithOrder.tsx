import React, { useState } from 'react';

import { CheckoutPage } from 'pages/seller-pages/CheckoutPage/CheckoutPage';
import { CartWithOrder } from 'pages/seller-pages/SellerCart/CartWithOrder/CartWithOrder';

const CheckoutAndCartWithOrder = (): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  return !toggle ? (
    <CartWithOrder handleButton={setToggle} />
  ) : (
    <CheckoutPage handleButton={setToggle} />
  );
};

export default CheckoutAndCartWithOrder;
