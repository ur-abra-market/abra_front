import React, { FC } from 'react';

import style from './HeaderUserActionsGuest.module.scss';

import { Button } from 'ui-kit';

interface IHeaderUserActionsGuestProps {
  callBack: (target: string) => void;
}

export const HeaderUserActionsGuest: FC<IHeaderUserActionsGuestProps> = ({
  callBack,
}): JSX.Element => {
  return (
    <div className={style.group_btn}>
      <Button
        onClick={() => callBack('register')}
        color="light-red"
        className={style.btn}
        label="Register"
      />
      <Button onClick={() => callBack('login')} className={style.btn} label="Log in" />
    </div>
  );
};
