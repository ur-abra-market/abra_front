import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../common/hooks';
import { HOME } from '../../routes';

import style from './ButtonLogOut.module.scss';

import { LogoutIcon } from 'assets/icons';
import { logout } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

export const ButtonLogOut = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickHAndlerLogout = (): void => {
    dispatch(logout());
    navigate(HOME);
  };

  return (
    <Button color="white" className={style.button} onClick={onClickHAndlerLogout}>
      <div className={style.button_title}>Log Out</div>
      <LogoutIcon />
    </Button>
  );
};
