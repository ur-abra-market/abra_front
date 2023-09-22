import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import style from './LoginForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { getEmailValidationSchema } from 'common/utils';
import { HOME } from 'routes';
import { loadingSelector } from 'store/reducers/appSlice';
import { loginUser, isAuthorizedSelector } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

const MAX_COUNT = 32;

const formValidationSchema = yup.object().shape({
  email: getEmailValidationSchema(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(MAX_COUNT, 'Password must be at most 32 characters')
    .required(),
});

export interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const isLoading = useAppSelector(loadingSelector) === LoadingStatusEnum.Loading;
  const {
    register,
    formState: { isValid, errors },
    setFocus,
    clearErrors,
    handleSubmit,
  } = useForm<ILoginFormData>({
    resolver: yupResolver(formValidationSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: ILoginFormData): void => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthorized) navigate(HOME);
  }, [isAuthorized]);

  useEffect(() => {
    setFocus('email');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('email')}
        placeholder="Email"
        error={errors.email?.message}
        disabled={isLoading}
      />

      <Input
        {...register('password')}
        classNameWrapper={style.input_wrapper}
        variant="password"
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        disabled={isLoading}
      />

      <Button
        className={style.button_submit}
        label="Log in"
        type="submit"
        disabled={!isValid || isLoading}
      />
    </form>
  );
};
