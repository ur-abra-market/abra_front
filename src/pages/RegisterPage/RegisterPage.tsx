import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'components/common/buttons';
import styleBtn from 'components/common/buttons/buttons.module.css';
import RegisterForm from 'components/ui/RegisterForm';
import style from 'pages/RegisterPage/RegisterPage.module.css';

const RegisterPage = ({ togglePageType }) => {
  return (
    <div className={style.authPage__wrap}>
      <Button
        value="Log in"
        className={`${styleBtn.commonButton} ${styleBtn.tab}`}
        onClick={togglePageType}
      />
      <Button value="Sign up" className={`${styleBtn.activeButton} ${styleBtn.tab}`} />
      <div className={style.form__wrap}>
        <RegisterForm />
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  togglePageType: PropTypes.func,
};
export default RegisterPage;
