import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { emailValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { loginService } from '../../../../../store/reducers/loginSlice';
import { Button, Input } from '../../../../../ui-kit';

import style from './LoginForm.module.scss';

const MAX_COUNT = 32;

const formValidationSchema = yup
  .object()
  .shape({
    email: emailValidationSchema,
    password: yup.string().min(8).max(MAX_COUNT).required(),
  })
  .required();

export interface IFormValues {
  email: string;
  password: string;
}

export const LoginForm = (): JSX.Element => {
  const { errMessage, loading, resMessage } = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { isValid, errors },
    setError,
    handleSubmit,
  } = useForm<IFormValues>({
    resolver: yupResolver(formValidationSchema),
    mode: 'all',
  });

  useEffect(() => {
    // TODO - удаляем проверку по resMessage = добавляем вместо loading -> status (idle, success, failed, loading)
    if (resMessage === 'LOGIN_SUCCESSFUL') navigate('/');
    if (errMessage) {
      setError('password', { message: errMessage });
      setError('email', { message: errMessage });
    }
  }, [errMessage, navigate, setError, resMessage]);

  const onSubmit = (data: IFormValues): void => {
    dispatch(loginService(data)).then(res => {
      // @ts-ignore
      if (res.payload.ok) navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input {...register('email')} placeholder="Email" error={errors.email?.message} />

      <Input
        {...register('password')}
        variant="password"
        type="password"
        placeholder="Password"
        error={errors.password?.message}
      />

      <Button
        className={style.button}
        label="Log in"
        type="submit"
        disabled={!isValid || loading}
      />
    </form>
  );
};
