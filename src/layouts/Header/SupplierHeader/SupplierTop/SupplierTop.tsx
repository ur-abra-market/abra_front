import React, { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ArrowIcon, HeaderNotificationsIcon, LogoCompanyPlaceholder } from 'assets/icons';
import { useOnClickOutside, useAppDispatch, useAppSelector } from 'common/hooks';
import { HeaderMenu } from 'layouts/Header/components';
import { HOME } from 'routes';
import {
  getCompanyLogo,
  supplierCompanyLogoSelector,
} from 'store/reducers/supplier/profile';
import { ButtonIcon, MainLogo, Paragraph } from 'ui-kit';

import style from './SupplierTop.module.scss';

interface ISupplierTop {
  isMobileView?: boolean;
}
export const SupplierTop: FC<ISupplierTop> = ({ isMobileView }): JSX.Element => {
  const dispatch = useAppDispatch();
  const companyLogo = useAppSelector(supplierCompanyLogoSelector);
  const [isShowPopupMenu, setShowPopupMenu] = useState(false);
  const triggerRef = useOnClickOutside(setShowPopupMenu, isShowPopupMenu);

  useEffect(() => {
    dispatch(getCompanyLogo());
  }, [dispatch]);

  const wrapperClasses = cn(style.wrapper, {
    [style.mobile_container]: isMobileView,
  });

  return (
    <div className={wrapperClasses}>
      <div className={style.container}>
        <div className={style.logo}>
          <MainLogo />

          <span className={style.vertical_line} />

          <Link className={style.supplier_link} to={HOME} tabIndex={-1}>
            SUPPLIER
          </Link>
        </div>

        <div className={style.inner_buttons}>
          <Link to={HOME}>
            <HeaderNotificationsIcon />
          </Link>

          <div className={style.menu_button} ref={triggerRef}>
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
              onClick={() => setShowPopupMenu(!isShowPopupMenu)}
              type="button"
            >
              {!isMobileView && (
                <Paragraph size="s" className={style.business_name}>
                  Business Name
                </Paragraph>
              )}

              <ArrowIcon className={cn({ [style.arrow]: isShowPopupMenu })} />
            </ButtonIcon>

            <HeaderMenu
              isMenuOpen={isShowPopupMenu}
              setMenuOpen={() => setShowPopupMenu(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
