import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { forgotPassword } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';

import style from './ForgotPasswordForm.module.scss';

import { emailValidationSchema } from 'common/constants';
import { LoadingStatus } from 'common/types';

export type ForgotChangePasswordFormType = {
  email: string;
};

interface ForgotPasswordFormProps {
  togglePageType: () => void;
}
const schema = yup
  .object({
    email: emailValidationSchema,
  })
  .required();

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ForgotChangePasswordFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const loading = useAppSelector(state => state.app.loading);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: ForgotChangePasswordFormType): Promise<void> => {
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
        classNameWrapper={style.input}
      />
      <Button
        label="Reset password"
        className={style.button}
        type="submit"
        disabled={!isValid || loading === LoadingStatus.Loading}
      />
    </form>
  );
};
