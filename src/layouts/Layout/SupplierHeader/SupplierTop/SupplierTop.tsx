import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useOnClickOutside } from '../../../../common/hooks';
import { HeaderMenu } from '../../../../components';
import { MainLogo } from '../../../../ui-kit';

import style from './SupplierTop.module.scss';

import { ArrowIcon, HeaderNotificationsIcon, LogoCompanyPlaceholder } from 'assets/icons';

export const SupplierTop = (): JSX.Element => {
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);
  const triggerRef = useOnClickOutside(setIsShowPopupMenu);

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
            onClick={() => setIsShowPopupMenu(!isShowPopupMenu)}
            type="button"
          >
            <span className={style.business_name}>Business Name</span>

            <ArrowIcon className={cn({ [style.arrow]: isShowPopupMenu })} />
          </button>
          <HeaderMenu
            active={isShowPopupMenu}
            setActive={() => setIsShowPopupMenu(false)}
          />
        </div>
      </div>
    </div>
  );
};
