import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { FormDataValuesType } from '../../../pages/AuthPage/AuthType';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginService } from '../../../store/reducers/loginSlice';
import { Button, Input } from '../../ui-kit';

import style from './LoginForm.module.css';

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8).max(32).required(),
  })
  .required();
const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const navigate = useNavigate();

  const { errMessage, loading, resMessage } = useAppSelector(state => state.login);

  console.log(errMessage, loading);

  useEffect(() => {
    if (resMessage === 'LOGIN_SUCCESSFUL') navigate('/');
  }, [resMessage]);

  const onSubmit = (data: FormDataValuesType): void => {
    if (!isValid) return;
    dispatch(loginService(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input {...register('email')} placeholder="Email" error={errors.email?.message} />
      <Input
        {...register('password')}
        placeholder="Password"
        type="password"
        error={errors.password?.message}
      />
      <Button
        className={style.button}
        label="Continue"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default LoginForm;
