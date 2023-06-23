import { useAppDispatch } from '../../common/hooks';

import style from './ButtonLogOut.module.scss';

import { LogoutIcon } from 'assets/icons';
import { logout } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

export const ButtonLogOut = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Button color="white" className={style.button} onClick={() => dispatch(logout())}>
      <div className={style.button_title}>Log Out</div>
      <LogoutIcon />
    </Button>
  );
};
