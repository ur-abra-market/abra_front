import { useNavigate } from 'react-router-dom';

import { HeaderProfileIcon, Home } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { HOME, PERSONAL_ACCOUNT } from 'routes';
import { isAuthorizedSelector, userRoleSelector } from 'store/reducers/authSlice';
import { ButtonIcon, MainLogo } from 'ui-kit';

import style from './AdditionalHeaderBlock.module.scss';

export const AdditionalHeaderBlock = (): JSX.Element => {
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const userRole = useAppSelector(userRoleSelector);
  const navigate = useNavigate();

  const handleProfileTransition = (): void => {
    if (userRole === 'seller') {
      navigate(PERSONAL_ACCOUNT);
    } else {
      navigate(HOME);
    }
  };

  const handleHomeTransition = (): void => {
    navigate(HOME);
  };

  return (
    <nav className={style.header_wrapper}>
      <div className={style.header_container}>
        <div className={style.header_block}>
          <MainLogo />

          {isAuthorized ? (
            <ButtonIcon onClick={handleProfileTransition}>
              <HeaderProfileIcon />
            </ButtonIcon>
          ) : (
            <ButtonIcon onClick={handleHomeTransition}>
              <Home />
            </ButtonIcon>
          )}
        </div>
      </div>
    </nav>
  );
};
