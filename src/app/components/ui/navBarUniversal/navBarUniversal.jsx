import React from "react";
import style from "./navBarUniversal.module.css";

const NavBarUniversal = ({ logo, children }) => {
  return (
    <nav className={style.navBarWrapper}>
      <h1 className={style.logoSection}>{logo}</h1>
      <div className={style.linksSection}>{children}</div>
    </nav>
  );
};

export default NavBarUniversal;
