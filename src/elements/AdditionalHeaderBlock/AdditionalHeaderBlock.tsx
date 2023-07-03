import { useNavigate } from 'react-router-dom';

import style from './AdditionalHeaderBlock.module.scss';

import { HeaderProfileIcon, Home } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { HOME, PERSONAL_ACCOUNT } from 'routes';
import { isAuthSelector } from 'store/reducers/authSlice';
import { ButtonIcon, MainLogo } from 'ui-kit';

export const AdditionalHeaderBlock = (): JSX.Element => {
  const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate();

  const handleProfileTransition = (): void => {
    navigate(PERSONAL_ACCOUNT);
  };
  const handleHomeTransition = (): void => {
    navigate(HOME);
  };

  return (
    <nav className={style.header_wrapper}>
      <div className={style.header_block}>
        <MainLogo className={style.header_logo} />
        {isAuth ? (
          <ButtonIcon onClick={handleProfileTransition}>
            <HeaderProfileIcon />
          </ButtonIcon>
        ) : (
          <ButtonIcon onClick={handleHomeTransition}>
            <Home />
          </ButtonIcon>
        )}
      </div>
    </nav>
  );
};
