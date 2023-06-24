import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { forgotPassword } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';

import style from './ForgotPasswordForm.module.scss';

import { emailValidationSchema } from 'common/constants';
import { LoadingStatusEnum } from 'common/types';
import { loadingSelector } from 'store/reducers/appSlice';

export interface IForgotChangePasswordFormData {
  email: string;
}

interface IForgotPasswordForm {
  togglePageType: () => void;
}
const schema = yup
  .object({
    email: emailValidationSchema,
  })
  .required();

export const ForgotPasswordForm: FC<IForgotPasswordForm> = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<IForgotChangePasswordFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();

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
      />
      <Button
        label="Reset password"
        className={style.button_submit}
        type="submit"
        disabled={!isValid || loading === LoadingStatusEnum.Loading}
      />
    </form>
  );
};
