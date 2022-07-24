import { Link } from "react-router-dom";
import Search from "../../common/Search";
import imgBtnHeader from "../../../assets/img/icons/icon-img.png";
import { ButtonLink } from "../../common/buttons";
import style from "./navBar.module.css";



const navbarBtnClasses = {
  wrepperButtonLink: `${style.wrepperButtonLink}`, 
  wrepperBtnImg: `${style.wrepperBtnImg}`,
  btnImg: `${style.btnImg}`,
  btnName: `${style.btnName}`
}

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
      <div className="header__basic_buttons">
        <ButtonLink name="My Profile" src={imgBtnHeader} classes = {navbarBtnClasses} href="/personalAccount"/>
        <ButtonLink name="Notifications" src={imgBtnHeader} classes = {navbarBtnClasses} href="*"/>
        <ButtonLink name="Favorites" src={imgBtnHeader} classes = {navbarBtnClasses} href="*"/>
        <ButtonLink name="Cart" src={imgBtnHeader} classes = {navbarBtnClasses} href="*"/>
      </div>

      <ul className={style.navbar}>
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
      </ul>
    </nav>
  );
};
export default NavBar;
