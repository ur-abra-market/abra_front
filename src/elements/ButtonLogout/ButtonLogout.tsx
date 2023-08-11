import { FC } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import style from './ButtonLogout.module.scss';

import { LogoutIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { HOME } from 'routes';
import { logoutUser } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

interface IButtonLogOutProps {
  withIcon?: boolean;
}

export const ButtonLogout: FC<IButtonLogOutProps> = ({
  withIcon = false,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async (): Promise<void> => {
    const result = await dispatch(logoutUser());

    if (result.payload) navigate(HOME);
  };

  const logoutButtonClasses = cn({
    [style.button]: !withIcon,
    [style.button_with_icon]: withIcon,
  });

  return (
    <Button color="white" className={logoutButtonClasses} onClick={handleClickLogout}>
      <div className={style.button_title}>Log out</div>
      {withIcon && <LogoutIcon />}
    </Button>
  );
};
