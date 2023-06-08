import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../../common/hooks';
import { forgotPassword } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';

import style from './ForgotPasswordForm.module.scss';

import { emailValidationSchema } from 'common/constants';

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

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ForgotChangePasswordFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: ForgotChangePasswordFormType): void => {
    dispatch(forgotPassword(data.email));
    togglePageType();
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
        disabled={!isValid}
      />
    </form>
  );
};

export default ForgotPasswordForm;
