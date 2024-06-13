import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { LOGIN, REGISTER } from 'routes';
import { Button } from 'ui-kit';

import style from './HeaderGuestUserActions.module.scss';

export const HeaderGuestUserActions: FC<{}> = (): JSX.Element => {
  return (
    <div className={style.buttons_wrapper}>
      <Button
        color="light-red"
        className={style.button}
        label="Register"
        as={NavLink}
        to={REGISTER}
      />
      <Button className={style.button} label="Log in" as={NavLink} to={LOGIN} />
    </div>
  );
};
