import { useNavigate } from 'react-router-dom';

import style from './ButtonLogOut.module.scss';

import { LogoutIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { HOME } from 'routes';
import { logoutUser } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

export const ButtonLogOut = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async (): Promise<void> => {
    const result = await dispatch(logoutUser());

    if (result) navigate(HOME);
  };

  return (
    <Button color="white" className={style.button} onClick={handleClickLogout}>
      <div className={style.button_title}>Log Out</div>
      <LogoutIcon />
    </Button>
  );
};
