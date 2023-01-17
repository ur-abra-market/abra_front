import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './LoginPage.module.css';

import { Button } from 'components/common/buttons';
import styleBtn from 'components/common/buttons/buttons.module.css';
import LoginForm from 'components/ui/LoginForm';

const LoginPage = ({ togglePageType }: any) => {
  return (
    <>
      <div className={style.authPage__wrap}>
        <Button value="Log in" className={`${styleBtn.activeButton} ${styleBtn.tab}`} />
        <Button
          value="Sign up"
          className={`${styleBtn.commonButton} ${styleBtn.tab}`}
          onClick={togglePageType}
        />
        <div className={style.form__wrap}>
          <LoginForm />
        </div>
      </div>
      <Link className={style.forgotPasswordlink} to="/forgotPassword">
        Forgot password?
      </Link>
    </>
  );
};

LoginPage.propTypes = {
  togglePageType: PropTypes.func,
};

export default LoginPage;
