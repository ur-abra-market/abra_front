import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useOnClickOutside } from '../../../common/hooks';
import { logout } from '../../../store/reducers/authSlice';

import { ArrowIcon, HeaderNotificationsIcon, LogoCompanyPlaceholder } from 'assets/icons';
import { BuildProfileMenu } from 'layouts/Header/Top/BuildProfileMenu/BuildProfileMenu'; // 5 10px for ArrowRightIcon
import style from 'layouts/SupplierHeader/SupplierTop/SupplierTop.module.scss';
import { isAuthSelector } from 'store/reducers/authSlice/selectors';
import { MainLogo } from 'ui-kit';

const SupplierTop = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const [active, setActive] = useState(false);
  const triggerRef = useOnClickOutside(setActive);
  const handleClickLogout = (): void => {
    dispatch(logout());
  };

  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <MainLogo className={style.logo_font_size} />
        <span className={style.vertical_line} />
        <span>
          <Link className={style.supplier_link} to="/">
            SUPPLIER
          </Link>
        </span>
      </div>
      <div className={style.inner_buttons}>
        <Link to="/">
          <HeaderNotificationsIcon />
        </Link>
        <div role="presentation" className={style.btn_menu} ref={triggerRef}>
          <LogoCompanyPlaceholder />
          <button
            className={style.menu_icons}
            onClick={() => setActive(!active)}
            type="button"
          >
            <span className={style.business_name}>Business Name</span>

            <ArrowIcon className={cn(style.arrow_down, { [style.arrow_up]: active })} />
          </button>
          <BuildProfileMenu
            isAuth={isAuth}
            userRole="supplier"
            handleClickLogout={handleClickLogout}
            active={active}
            setActive={() => setActive(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierTop;
