import React from 'react';

import { useNavigate } from 'react-router-dom';

import style from './CheckoutSuccessPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { HOME, ORDER_HISTORY } from 'routes';
import { Button } from 'ui-kit';

export const CheckoutSuccessPage = WithLayout((): JSX.Element => {
  const navigate = useNavigate();
  const onClickMain = (): void => {
    return navigate(HOME);
  };
  const onClickHistory = (): void => {
    return navigate(ORDER_HISTORY);
  };

  return (
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
  );
});
