import { Link } from "react-router-dom";
import style from "./navBar.module.css";

const NavBar = () => {
  return (
    <nav>
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
