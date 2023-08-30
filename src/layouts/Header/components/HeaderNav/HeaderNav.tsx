import React, { FC, JSX, useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './HeaderNav.module.scss';

import { useBodyOverflowHidden } from 'common/hooks';
import { HEADER_NAV_CONTENT } from 'layouts/Header/components/HeaderNav/HeaderNavContent';

interface IHeaderNav {
  userRole: 'seller' | 'supplier';
  className?: string;
  wrapperClassName?: string;
  isMobileView?: boolean;
}

export const HeaderNav: FC<IHeaderNav> = ({
  userRole,
  className,
  wrapperClassName,
  isMobileView,
}): JSX.Element => {
  const navItems = HEADER_NAV_CONTENT[userRole];
  const [isOpenOnMobile, setOpenOnMobile] = useState(false);

  const refUl = useRef<HTMLUListElement>(null);

  const menuListClasses = cn(style.container, className, {
    [style.mobile]: isMobileView,
    [style.show]: isMobileView && isOpenOnMobile,
  });

  const { top, height } = refUl.current?.getBoundingClientRect() ?? { top: 0, height: 0 };
  const padding = 20;

  useBodyOverflowHidden(isOpenOnMobile, top + height + padding);

  return (
    <>
      <div className={cn(style.wrapper, wrapperClassName)}>
        {isMobileView && (
          <button
            type="button"
            onClick={() => setOpenOnMobile(prev => !prev)}
            className={cn(style.burger, { [style.close_button]: isOpenOnMobile })}
          >
            <span />
          </button>
        )}

        <ul ref={refUl} className={menuListClasses}>
          {navItems.map((el, index) => (
            <li className={style.menu_item} key={index}>
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  isActive ? `${style.active_item}` : `${style.item}`
                }
              >
                {el.label}
              </NavLink>
            </li>
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
