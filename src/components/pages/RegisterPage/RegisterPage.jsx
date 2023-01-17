import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '../../common/buttons';
import styleBtn from '../../common/buttons/buttons.module.css';
import RegisterForm from '../../ui/RegisterForm';

import style from './RegisterPage.module.css';

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
