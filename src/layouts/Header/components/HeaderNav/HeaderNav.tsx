import React, { FC, JSX, MouseEvent, useEffect, useState } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './HeaderNav.module.scss';

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

  const ulClassName = cn(style.container, className, {
    [style.mobile]: isMobileView,
    [style.show]: isMobileView && isOpenOnMobile,
  });

  useEffect(() => {
    document.body.style.overflow = isOpenOnMobile ? 'hidden' : '';
  }, [isOpenOnMobile]);

  return (
    <>
      <div className={cn(style.wrapper, wrapperClassName)}>
        {isMobileView && (
          <button
            type="button"
            onClick={() => setOpenOnMobile(prev => !prev)}
            className={cn(style.burger, { [style.close_btn]: isOpenOnMobile })}
          >
            <span />
          </button>
        )}
        <ul className={ulClassName}>
          {navItems.map((el, index) => (
            <li className={style.item} key={index}>
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
