import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginService } from '../../../store/reducers/loginSlice';
import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import Form from '../../Form';
import Loader from '../../Loader';
import PasswordComplexity from '../../PasswordComplexity';
import style from '../RegisterForm/RegisterForm.module.css';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Label } from "../../ui-kit";
import { FormDataValuesType } from "../../../layouts/Auth/AuthType";

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8).max(32).required(),
})
  .required()
const LoginForm = (): JSX.Element => {
  const [userStatus, setUserStatus] = useState('suppliers');
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode:'all'
  });
  const navigate = useNavigate();
  const watchPasword = watch('password');

  const toggleUserStatus = () => {
    setUserStatus(prevState => (prevState === 'suppliers' ? 'sellers' : 'suppliers'));
  };

  const isLoading = useAppSelector(state => state.login.loading);
  const errMessage = useAppSelector(state => state.login.errMessage);
  const resMessage = useAppSelector(state => state.login.resMessage);

  useEffect(() => {
    if (resMessage === 'LOGIN_SUCCESSFUL') navigate('/');
  }, [resMessage]);

  const onSubmit = (data: FormDataValuesType) => {
    if (!isValid) return;
    dispatch(loginService(data));
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
        <Label label={'Email'}>
          <Input
            {...register('email')}
            placeholder="Email"
            error={errors.email?.message}/>
        </Label>
        <Label label={"Password"}>
          <Input
            {...register('password')}
            placeholder="Password"
            type='password'
            error={errors.password?.message}/>
        </Label>
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
