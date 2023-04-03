import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Layout } from '../../../../layouts/Layout/Layout';
import { Button } from '../../../ui-kit';

import style from './CheckoutSuccess.module.css';

export const CheckoutSuccess = (): JSX.Element => {
  const navigate = useNavigate();
  const onClickMain = (): void => {
    return navigate('/');
  };
  const onClickHistory = (): void => {
    return navigate('/orders');
  };

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.container_header}>
          <span className={style.title}>
            The order has been successfully placed and paid! <br />
            You can track progress in the Order History section.
          </span>
          <div className={style.container_button}>
            <Button
              onClick={onClickMain}
              className={style.button_red}
              label="Go to Main Page"
            />
            <Button
              onClick={onClickHistory}
              className={style.button_back}
              label="Go to Order History"
            />
          </div>
        </div>
        <div className={style.container_info}>
          <span className={style.info_text}>You may also like</span>
        </div>
      </div>
    </Layout>
  );
};
