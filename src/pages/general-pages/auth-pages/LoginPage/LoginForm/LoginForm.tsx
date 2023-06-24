import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { emailValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { LoadingStatusEnum } from '../../../../../common/types';
import { loadingSelector } from '../../../../../store/reducers/appSlice';
import { loginUser, isAuthSelector } from '../../../../../store/reducers/authSlice';
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
  const loading = useAppSelector(loadingSelector);
  const isAuthorized = useAppSelector(isAuthSelector);
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

  useEffect(() => {
    if (isAuthorized) navigate('/');
  }, [isAuthorized, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input {...register('email')} placeholder="Email" error={errors.email?.message} />

      <Input
        {...register('password')}
        classNameWrapper={style.input_wrapper}
        variant="password"
        type="password"
        placeholder="Password"
        error={errors.password?.message}
      />

      <Button
        className={style.button_submit}
        label="Log in"
        type="submit"
        disabled={!isValid || loading === LoadingStatusEnum.Loading}
      />
    </form>
  );
};
