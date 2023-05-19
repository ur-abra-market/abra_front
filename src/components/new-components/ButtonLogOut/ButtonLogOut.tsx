import React from 'react';

import { ReactComponent as LogOutIcon } from '../../../assets/img/icons/log_out.svg';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../store/reducers/loginSlice';
import { Button } from '../../ui-kit';

import style from './ButtonLogOut.module.css';

export const ButtonLogOut = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Button color="white" className={style.button} onClick={() => dispatch(logout())}>
      <div className={style.button_title}>Log Out</div>
      <LogOutIcon />
    </Button>
  );
};
