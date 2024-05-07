import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { AppleButton, GoogleButton } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { getEmailValidationSchema, MAX_COUNT_PASSWORD } from 'common/utils';
import { HOME } from 'routes';
import { getUserRole, loadingSelector } from 'store/reducers/appSlice';
import { loginUser, isAuthorizedSelector } from 'store/reducers/authSlice';
import { loginGoogle } from 'store/reducers/authSlice/thunks';
import { Button, ButtonIcon, Input } from 'ui-kit';

import style from './LoginForm.module.scss';

const formValidationSchema = yup.object().shape({
  email: getEmailValidationSchema(),
  password: yup
    .string()
    .required('Field is required')
    .min(8, 'Password must be at least 8 characters')
    .max(MAX_COUNT_PASSWORD, `Password must be at most ${MAX_COUNT_PASSWORD} characters`)
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

  const handleGoogleRegister = async (token: string): Promise<void> => {
    const actionResult = await dispatch(loginGoogle({ token }));

    if (loginGoogle.fulfilled.match(actionResult)) {
      dispatch(getUserRole());
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleRegister(tokenResponse.access_token),
  });

  return (
    <>
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
      <div className={style.buttons_container_alternate_signin}>
        <ButtonIcon onClick={() => handleGoogleAuth()}>
          <GoogleButton />
        </ButtonIcon>
        <ButtonIcon disabled>
          <AppleButton />
        </ButtonIcon>
      </div>
    </>
  );
};
