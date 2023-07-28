import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import style from './ButtonLogOut.module.scss';

import { LogoutIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { HOME } from 'routes';
import { logoutUser } from 'store/reducers/authSlice';
import { Button, LoaderLinear } from 'ui-kit';

export const ButtonLogOut = (): JSX.Element => {
  const [isLogOut, setLogOut] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async (): Promise<void> => {
    setLogOut(true);
    const result = await dispatch(logoutUser());

    setLogOut(false);

    if (result) navigate(HOME);
  };

  return (
    <>
      {isLogOut && <LoaderLinear />}
      <Button color="white" className={style.button} onClick={handleClickLogout}>
        <div className={style.button_title}>Log Out</div>
        <LogoutIcon />
      </Button>
    </>
  );
};
