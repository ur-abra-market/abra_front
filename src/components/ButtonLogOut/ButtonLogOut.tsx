import style from './ButtonLogOut.module.css';

import { LogoutIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { logout } from 'store/reducers/loginSlice';
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
