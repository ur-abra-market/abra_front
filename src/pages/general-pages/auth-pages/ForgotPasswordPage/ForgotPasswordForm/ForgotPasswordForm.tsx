import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from './ForgotPasswordForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { getEmailValidationSchema } from 'common/utils';
import { loadingSelector } from 'store/reducers/appSlice';
import { forgotPassword } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

export interface IForgotChangePasswordFormData {
  email: string;
}

interface IForgotPasswordForm {
  togglePageType: () => void;
}
const schema = yup
  .object({
    email: getEmailValidationSchema(true),
  })
  .required();

export const ForgotPasswordForm: FC<IForgotPasswordForm> = ({ togglePageType }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const isLoading = loading === LoadingStatusEnum.Loading;

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<IForgotChangePasswordFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: IForgotChangePasswordFormData): Promise<void> => {
    const actionResult = await dispatch(forgotPassword(data.email));

    if (forgotPassword.fulfilled.match(actionResult)) {
      togglePageType();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('email')}
        placeholder="Email"
        error={errors.email?.message}
        classNameWrapper={style.input_wrapper}
        disabled={isLoading}
      />
      <Button
        label="Reset password"
        className={style.button_submit}
        type="submit"
        disabled={!isValid || isLoading}
      />
    </form>
  );
};
