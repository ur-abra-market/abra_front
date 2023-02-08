import React, { FC, ReactNode } from 'react';

import style from './NavBarUniversal.module.css';

interface NavBarUniversalProps {
  logo: any;
  children: ReactNode;
}
const NavBarUniversal: FC<NavBarUniversalProps> = ({ logo, children }) => {
  return (
    <nav className={style.navBarWrapper}>
      <h1 className={style.logoSection}>{logo}</h1>
      <div className={style.linksSection}>{children}</div>
    </nav>
  );
};

export default NavBarUniversal;
