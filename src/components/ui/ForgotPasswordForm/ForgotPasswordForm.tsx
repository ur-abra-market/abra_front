import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ForgotPasswordFormType } from '../../../pages/AuthPage/AuthType';
import { useAppDispatch } from '../../../store/hooks';
import { forgotPassword } from '../../../store/reducers/passwordSlice';
import { Button, Input } from '../../ui-kit';

import style from './ForgotPasswordForm.module.css';

interface ForgotPasswordFormProps {
  togglePageType: () => void;
}
const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
  })
  .required();
const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: ForgotPasswordFormType): void => {
    dispatch(forgotPassword(data));
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

ForgotPasswordForm.propTypes = {};
export default ForgotPasswordForm;
