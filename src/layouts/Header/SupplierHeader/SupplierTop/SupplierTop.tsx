import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './SupplierTop.module.scss';

import { ArrowIcon, HeaderNotificationsIcon, LogoCompanyPlaceholder } from 'assets/icons';
import { useOnClickOutside, useAppDispatch, useAppSelector } from 'common/hooks';
import { HeaderMenu } from 'elements';
import { HOME } from 'routes';
import {
  getCompanyLogo,
  supplierCompanyLogoSelector,
} from 'store/reducers/supplier/profile';
import { ButtonIcon, MainLogo } from 'ui-kit';

export const SupplierTop = (): JSX.Element => {
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);
  const triggerRef = useOnClickOutside(setIsShowPopupMenu);
  const companyLogo = useAppSelector(supplierCompanyLogoSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanyLogo());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <MainLogo className={style.logo_font_size} />

          <span className={style.vertical_line} />

          <Link className={style.supplier_link} to={HOME}>
            SUPPLIER
          </Link>
        </div>

        <div className={style.inner_buttons}>
          <Link to={HOME}>
            <HeaderNotificationsIcon />
          </Link>

          <div className={style.btn_menu} ref={triggerRef}>
            <div className={style.company_logo_wrapper}>
              {companyLogo ? (
                <img
                  className={style.company_logo_img}
                  src={companyLogo}
                  alt="company logo"
                />
              ) : (
                <LogoCompanyPlaceholder className={style.company_logo_img} />
              )}
            </div>

            <ButtonIcon
              className={style.menu_icons}
              onClick={() => setIsShowPopupMenu(!isShowPopupMenu)}
              type="button"
            >
              <span className={style.business_name}>Business Name</span>

              <ArrowIcon className={cn({ [style.arrow]: isShowPopupMenu })} />
            </ButtonIcon>

            <HeaderMenu
              active={isShowPopupMenu}
              setActive={() => setIsShowPopupMenu(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
