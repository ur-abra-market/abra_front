
import React from "react";
import NavBar from "../../ui/navBar/navBar";
import HeaderNavMenu from "../HeaderNavMemu";
import SelectCurrency from "../SelectCurrency/SelectCurrency";
import SelectShip from "../SelectShip/SelectShip";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <NavBar />
      <div className="header__menu">
        <div className="header__menu_categories">
          <div>All categories</div>
          <div className="dividing-line-1">|</div>
        </div>
        <HeaderNavMenu />
        <div className="heder__selects">
          <div className="dividing-line-2">|</div>
          <SelectCurrency />
          <SelectShip />
        </div>
      </div>
    </header>
  );
};

export default Header;
