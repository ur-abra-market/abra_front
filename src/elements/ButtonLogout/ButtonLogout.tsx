import { FC, useState } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import style from './ButtonLogout.module.scss';

import { LogoutIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { HOME } from 'routes';
import { logoutUser } from 'store/reducers/authSlice';
import { Button, LoaderLinear } from 'ui-kit';

interface IButtonLogOutProps {
  withIcon?: boolean;
}

export const ButtonLogout: FC<IButtonLogOutProps> = ({
  withIcon = false,
}): JSX.Element => {
  const [isLogOut, setLogOut] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async (): Promise<void> => {
    setLogOut(true);
    const result = await dispatch(logoutUser());

    setLogOut(false);

    if (result) navigate(HOME);
  };

  const logoutButtonClasses = cn({
    [style.button]: !withIcon,
    [style.button_with_icon]: withIcon,
  });

  return (
    <>
      {isLogOut && <LoaderLinear />}

      <Button color="white" className={logoutButtonClasses} onClick={handleClickLogout}>
        <div className={style.button_title}>Log out</div>
        {withIcon && <LogoutIcon />}
      </Button>
    </>
  );
};
