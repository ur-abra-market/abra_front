import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../../common/Search";
import imgBtnHeader from "../../../assets/img/icons/icon-img.png";
import { ButtonLink, Button } from "../../common/buttons";
import style from "./navBar.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";

const navbarBtnClasses = {
  wrepperBtnImg: `${style.wrepperBtnImg}`,
  btnImg: `${style.btnImg}`,
  btnName: `${style.btnName}`,
};

const NavBar = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  return (
    <nav className="header__basic">
      <Link className="header__basic_logo" to="/">
        Abra
      </Link>
      <Search />

      <div className="header__basic_buttons">
        {!isAuth ? (
          <>
            <Link className={style.wrepperButtonLink} to="/auth">
              <Button
                value="Log in"
                className={`${styleBtn.commonButton} ${styleBtn.tab}`}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/auth">
              <Button
                value="Sign up"
                className={`${styleBtn.commonButton} ${styleBtn.tab}`}
              />
            </Link>
          </>
        ) : (
          <>
            <Link className={style.wrepperButtonLink} to="/personalAccount">
              <ButtonLink
                name="My Profile"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Notifications"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Favorites"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Cart"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
