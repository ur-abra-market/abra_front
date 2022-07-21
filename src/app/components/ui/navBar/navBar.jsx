import { Link } from "react-router-dom";
import Search from "../../common/Search";

// import imgBtnHeader from "../../../assets/img/icons/icon-img.png";
// import { ButtonHeader } from "../../common/buttons";

import "./navBar.module.css";

const NavBar = () => {
  return (
    <nav className="header__basic">
      <Link className="header__basic_logo" to="/">
        Abra
      </Link>
      <Search />
      <Link className="header__basic_buttons" to="/auth">
        Sig in | Sig up
      </Link>
      {/* <div className="header__basic_buttons">
        <ButtonHeader name="My Profile" imgSrc={imgBtnHeader} />
        <ButtonHeader name="Notifications" imgSrc={imgBtnHeader} />
        <ButtonHeader name="Favorites" imgSrc={imgBtnHeader} />
        <ButtonHeader name="Cart" imgSrc={imgBtnHeader} />
      </div> */}

      {/* <ul className={style.navbar}>
        <li className={style.nav_item}>
          <Link className={style.nav_link} to="/">
            Main
          </Link>
        </li>
        <li className={style.nav_item}>
          <Link className={style.nav_link} to="/login">
            Login
          </Link>
        </li>
      </ul> */}
    </nav>
  );
};
export default NavBar;
