import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../../ui/LoginForm'
import { Link } from 'react-router-dom'
import { Button } from '../../common/buttons'
import style from './LoginPage.module.css'
import styleBtn from '../../common/buttons/buttons.module.css'

const LoginPage = ({ togglePageType }) => {
  return (
    <>
      <div className={style.authPage__wrap}>
        <Button
          value="Log in"
          className={`${styleBtn.activeButton} ${styleBtn.tab}`}
        />
        <Button
          value="Sign up"
          className={`${styleBtn.commonButton} ${styleBtn.tab}`}
          onClick={togglePageType}
        />
        <div className={style.form__wrap}>{<LoginForm />}</div>
      </div>
      <Link className={style.forgotPasswordlink} to="/forgotPassword">
        Forgot password?
      </Link>
    </>
  )
}

LoginPage.propTypes = {
  togglePageType: PropTypes.func
}

export default LoginPage
