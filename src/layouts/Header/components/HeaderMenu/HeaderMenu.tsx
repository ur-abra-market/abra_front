import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';

import cn from 'classnames';
import { NavLink, useMatch } from 'react-router-dom';

import style from './HeaderMenu.module.scss';
import { HEADER_MENU_CONTENT } from './headerMenuContent';

import { useAppSelector } from 'common/hooks';
import { ButtonLogout } from 'elements';
import { PERSONAL_ACCOUNT } from 'routes';
import {
  isLogoutLoadingSelector,
  userRoleSelector,
} from 'store/reducers/authSlice/selectors';
import { LoaderLinear } from 'ui-kit';

export interface IHeaderMenu
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  isMenuOpen: boolean;
  setMenuOpen: () => void;
}

interface MenuItemBase {
  label: string;
  href: string;
}

interface MenuItemWithComponentType {
  component: React.ComponentType;
}

type MenuItemUnionType = MenuItemBase | MenuItemWithComponentType;

export const HeaderMenu: FC<IHeaderMenu> = ({ isMenuOpen, setMenuOpen }) => {
  const isLogoutLoading = useAppSelector(isLogoutLoadingSelector);
  const userRole = useAppSelector(userRoleSelector);
  const userMenu =
    userRole === 'supplier' ? HEADER_MENU_CONTENT.SUPPLIER : HEADER_MENU_CONTENT.SELLER;
  const location = useMatch(PERSONAL_ACCOUNT);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleClickOnMenuItem = (index: number): void => {
    setSelectedItem(index);
    setMenuOpen();
  };

  const menuContent: MenuItemUnionType[] = [
    ...userMenu,
    {
      component: ButtonLogout,
    },
  ];

  const menuCLasses = cn(style.menu, {
    [style.menu_active]: isMenuOpen,
    [style.menu_inactive]: !isMenuOpen,
    [style.menu_main]: location?.pathname !== `${PERSONAL_ACCOUNT}/*`,
    [style.menu_profile]: location?.pathname === PERSONAL_ACCOUNT,
    [style.menu_supplier]: userRole === 'supplier',
  });

  useEffect(() => {
    const handleOnScroll = (): void => {
      setMenuOpen();
    };

    document.addEventListener('scroll', handleOnScroll);

    return () => document.removeEventListener('scroll', handleOnScroll);
  }, [setMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      const select = document.getElementById('header-popup') as HTMLUListElement;
      const selectOptions = Array.from(
        select.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('a, button'),
      );

      if (selectOptions[selectedItem]) {
        selectOptions[selectedItem].focus();
        selectOptions[selectedItem].setAttribute('tabindex', '0');
      }
    }
  }, [selectedItem, isMenuOpen]);

  const handleKeyDown = (e: Event): void => {
    const keyboardEvent = e as unknown as KeyboardEvent;

    if (keyboardEvent.key === 'ArrowDown' || keyboardEvent.key === 'ArrowUp') {
      keyboardEvent.preventDefault();
      const increment = keyboardEvent.key === 'ArrowDown' ? 1 : -1;

      setSelectedItem(
        prev => (prev + increment + menuContent.length) % menuContent.length,
      );
    } else if (keyboardEvent.key === 'Escape') {
      keyboardEvent.preventDefault();
      setMenuOpen();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {isLogoutLoading && <LoaderLinear />}
      <ul id="header-popup" className={menuCLasses}>
        {menuContent.map((menuItem, index) => (
          <li className={style.item} key={index}>
            {'component' in menuItem && menuItem.component ? (
              React.createElement(menuItem.component)
            ) : (
              <NavLink
                to={(menuItem as MenuItemBase).href}
                state={(menuItem as MenuItemBase).label}
                onClick={() => handleClickOnMenuItem(index)}
              >
                {(menuItem as MenuItemBase).label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
