import React, { FC } from 'react';

import style from './HeaderGuestUserActions.module.scss';

import { Button } from 'ui-kit';

interface IHeaderGuestUserActions {
  callBack: (target: string) => void;
}

export const HeaderGuestUserActions: FC<IHeaderGuestUserActions> = ({
  callBack,
}): JSX.Element => {
  return (
    <div className={style.buttons_wrapper}>
      <Button
        onClick={() => callBack('register')}
        color="light-red"
        className={style.button}
        label="Register"
      />
      <Button onClick={() => callBack('login')} className={style.button} label="Log in" />
    </div>
  );
};
