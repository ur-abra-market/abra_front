import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { emailValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { LoadingStatus } from '../../../../../common/types';
import { loginUser } from '../../../../../store/reducers/authSlice';
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
  const loading = useAppSelector(state => state.app.loading);
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<IFormValues>({
    resolver: yupResolver(formValidationSchema),
    mode: 'all',
  });

  const onSubmit = (data: IFormValues): void => {
    dispatch(loginUser(data));
  };

  if (isAuthorized) navigate('/');

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
        disabled={!isValid || loading === LoadingStatus.Loading}
      />
    </form>
  );
};
