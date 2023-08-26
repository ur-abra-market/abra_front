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
<<<<<<< Updated upstream
import { loginUser, isAuthSelector } from 'store/reducers/authSlice';
=======
import { isAuthorizedSelector, loginUser } from 'store/reducers/authSlice';
>>>>>>> Stashed changes
import { Button, Input } from 'ui-kit';

const MAX_COUNT = 32;

const formValidationSchema = yup
  .object()
  .shape({
    email: getEmailValidationSchema(true),
    password: yup.string().min(8).max(MAX_COUNT).required(),
  })
  .required();

export interface IFormValues {
  email: string;
  password: string;
}

export const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const isAuthorized = useAppSelector(isAuthSelector);
  const loading = useAppSelector(loadingSelector);
  const isLoading = loading === LoadingStatusEnum.Loading;
=======
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const isLoading = useAppSelector(loadingSelector) === LoadingStatusEnum.Loading;
>>>>>>> Stashed changes

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
    if (isAuthorized) navigate(HOME);
  }, [isAuthorized, navigate]);

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
