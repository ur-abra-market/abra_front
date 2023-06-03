import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { PasswordComplexity } from '../../../pages/general-pages/auth-pages/assets';
import { ResetPasswordPayloadType } from '../../../services/auth/auth.serviceTypes';
import { resetPassword } from '../../../store/reducers/passwordSlice';
import { Button, Input } from '../../../ui-kit';
import Form from '../../Form';

import style from './ResetPasswordForm.module.css';

interface ResetPasswordFormProps {
  handleChangeModalActive: () => void;
}
const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    new_password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      ),
    confirm_password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      ),
  })
  .required();
const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  handleChangeModalActive,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<ResetPasswordPayloadType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const watchPassword = watch('new_password' || 'confirm_password');
  const onSubmit = (data: ResetPasswordPayloadType): void => {
    dispatch(resetPassword(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={style.reset_password_form}>
      <Input
        {...register('email')}
        classNameWrapper={style.input_wrapper}
        placeholder="Email"
        variant="password"
      />
      <Input
        {...register('new_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="New password"
        type="password"
        variant="password"
      />
      <Input
        {...register('confirm_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="Confirm password"
        type="password"
        variant="password"
      />
      <PasswordComplexity password={watchPassword} />
      <Button
        label="Save"
        className={style.button_save}
        type="submit"
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </Form>
  );
};

export default ResetPasswordForm;
