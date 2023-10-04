import React, { FC, JSX, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { useBodyOverflowHidden } from 'common/hooks';
import { UserRoleEnum } from 'common/types';
import { HeaderMenuItem } from 'layouts/Header/components/HeaderMenu/HeaderMenuItem/HeaderMenuItem';
import { HEADER_NAV_CONTENT } from 'layouts/Header/components/HeaderNav/HeaderNavContent';
import { Paragraph } from 'ui-kit';

import style from './HeaderNav.module.scss';

interface IHeaderNav {
  userRole: UserRoleEnum;
  className?: string;
  wrapperClassName?: string;
  isMobileView?: boolean;
}
interface INavItem {
  id: number;
  label: string;
  path: string;
}

export const HeaderNav: FC<IHeaderNav> = ({
  userRole,
  className,
  wrapperClassName,
  isMobileView,
}): JSX.Element => {
  const navItems: INavItem[] = HEADER_NAV_CONTENT[userRole];
  const [isOpenOnMobile, setOpenOnMobile] = useState(false);
  const [currentItem, setCurrentItem] = useState<INavItem | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const { top, height } = menuRef.current?.getBoundingClientRect() ?? {
    top: 0,
    height: 0,
  };
  const padding = 20;

  useBodyOverflowHidden(isOpenOnMobile, top + height + padding);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const foundValue = navItems.find(el => el.path === currentUrl);

    if (foundValue) setCurrentItem(foundValue);
  }, []);

  const menuListClasses = cn(style.container, className, {
    [style.mobile]: isMobileView,
    [style.show]: isMobileView && isOpenOnMobile,
  });

  const closeButtonClasses = cn(style.burger_seller, {
    [style.close_button]: isOpenOnMobile,
  });

  return (
    <>
      <div className={cn(style.wrapper, wrapperClassName)}>
        {isMobileView && (
          <>
            {userRole === UserRoleEnum.SELLER && (
              <button
                type="button"
                onClick={() => setOpenOnMobile(prev => !prev)}
                className={closeButtonClasses}
              >
                <span />
              </button>
            )}

            {userRole === UserRoleEnum.SUPPLIER && (
              <button
                type="button"
                onClick={() => setOpenOnMobile(prev => !prev)}
                className={style.burger_supplier}
              >
                <Paragraph size="s2">{currentItem?.label}</Paragraph>
                <ArrowIcon className={cn({ [style.arrow]: isOpenOnMobile })} />
              </button>
            )}
          </>
        )}

        <ul ref={menuRef} className={menuListClasses}>
          {navItems.map((el, index) => (
            <HeaderMenuItem key={index} label={el.label} path={el.path} />
          ))}
        </ul>
      </div>

      {isMobileView && (
        <div
          onClickCapture={() => setOpenOnMobile(false)}
          className={cn(style.mobile_background, { [style.show]: isOpenOnMobile })}
        />
      )}
    </>
  );
};
