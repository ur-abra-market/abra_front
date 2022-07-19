import React from "react";

import PropTypes from "prop-types";
import RegisterForm from "../../ui/registerForm";
import Button from "../../common/buttons";
import style from "./registerPage.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";

const RegisterPage = ({ togglePageType }) => {
  return (
    <>
      <div className={style.authPage__wrap}>
        <Button
          value="Log in"
          className={`${styleBtn.commonButton} ${styleBtn.tab}`}
          onClick={togglePageType}
        />
        <Button
          value="Sign up"
          className={`${styleBtn.activeButton} ${styleBtn.tab}`}
        />
        <div className={style.form__wrap}>{<RegisterForm />}</div>
      </div>
    </>
  );
};
RegisterPage.propTypes = {
  togglePageType: PropTypes.func,
};
export default RegisterPage;
