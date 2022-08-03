import React from "react";
import Search from "../Search";
import style from './navBarUniversal.module.css'

const NavBarUniversal = ({logo, links}) => {
    return (
        <navBar className={style.navBarWrapper}>
            <h1 className={style.logoSection}>
                {logo}
            </h1>
                <Search/>
            <div className={style.linksSection}>
                {links}
            </div>
        </navBar>
    )
}

export default NavBarUniversal;