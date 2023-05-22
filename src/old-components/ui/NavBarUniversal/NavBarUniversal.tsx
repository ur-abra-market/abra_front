import React, { FC, ReactNode } from 'react';

import style from './NavBarUniversal.module.css';

interface NavBarUniversalProps {
  logo: JSX.Element;
  children: ReactNode;
}
const NavBarUniversal: FC<NavBarUniversalProps> = ({ logo, children }): JSX.Element => {
  return (
    <nav className={style.nav_bar_wrapper}>
      <h1 className={style.logo_section}>{logo}</h1>
      <div className={style.links_section}>{children}</div>
    </nav>
  );
};

export default NavBarUniversal;
