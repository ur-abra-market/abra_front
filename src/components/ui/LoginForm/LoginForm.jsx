import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginService } from '../../../store/reducers/loginSlice';
import { Button } from '../../common/buttons';
import styleBtn from '../../common/buttons/buttons.module.css';
import Form from '../../common/Form';
import Loader from '../../common/Loader';
import PasswordComplexity from '../../common/PasswordComplexity';
import TextField from '../../common/TextField';
import style from '../RegisterForm/RegisterForm.module.css';

const LoginForm = () => {
  const [userStatus, setUserStatus] = useState('suppliers');
  const dispatch = useDispatch();
  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();
  const watchPasword = watch('password');

  const toggleUserStatus = () => {
    setUserStatus(prevState => (prevState === 'suppliers' ? 'sellers' : 'suppliers'));
  };

  const isLoading = useSelector(state => state.login.loading);
  const errMessage = useSelector(state => state.login.errMessage);
  const resMessage = useSelector(state => state.login.resMessage);

  useEffect(() => {
    if (resMessage === 'LOGIN_SUCCESSFUL') navigate('/');
  }, [resMessage]);

  const onSubmit = data => {
    if (!isValid) return;
    dispatch(loginService(data));
  };

  const textFieldClasses = {
    label: `${style.textFieldLabel}`,
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.textFieldInput}`,
  };

  return (
    <>
      <div className={style.buySellBtnWrappeer}>
        <div className={style.flexContainer}>
          <Button
            value="I'm here to buy"
            className={
              userStatus === 'sellers'
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
          <Button
            value="I'm here to sell"
            className={
              userStatus === 'suppliers'
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          register={register('email', {
            required: 'Email is required!',
            pattern: {
              value: /^\w+\S+@\w+\S+\.[\w+\S+]{2,}$/g,
              message: 'Email is incorrect!',
            },
          })}
          label="Email"
          name="email"
          placeholder="Email"
          classes={textFieldClasses}
          error={errors.email}
        />
        <TextField
          register={register('password', {
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'Password must contain at least 8 characters!',
            },
            validate: {
              capitalSymbol: s => /[A-Z]+/g.test(s),
              digitSymbol: s => /\d+/g.test(s),
              specialSymbol: s => /[!#+*]/g.test(s),
              spaceSymbol: s => !/\s/g.test(s),
            },
          })}
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          classes={textFieldClasses}
        />
        <PasswordComplexity valueOfNewPassword={watchPasword} />
        {isLoading && <Loader />}
        {errMessage && <p>{errMessage}</p>}
        <Button
          value="Log in"
          className={
            !isValid
              ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
              : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
          }
          disabled={!isValid}
        />
      </Form>
    </>
  );
};

export default LoginForm;
