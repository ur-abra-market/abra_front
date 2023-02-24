import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ForgotPasFormType } from "../../../pages/AuthPage/AuthType";
import { Button, Input } from '../../ui-kit';

import style from './ForgotPasswordForm.module.css';
import { useAppDispatch } from "../../../store/hooks";
import { forgotPassword } from "../../../store/reducers/passwordSlice";

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
  } = useForm<ForgotPasFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch= useAppDispatch()

  const onSubmit = (data: ForgotPasFormType): void => {
    dispatch(forgotPassword(data))
    togglePageType()
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
