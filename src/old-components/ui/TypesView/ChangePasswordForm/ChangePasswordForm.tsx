import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { PasswordComplexity } from '../../../../pages/commonPages/auth-pages/assets';
import { ChangePasswordPayloadType } from '../../../../services/auth/auth.serviceTypes';
import { changePassword } from '../../../../store/reducers/passwordSlice';
import { Button, Input } from '../../../../ui-kit';
import Form from '../../../Form';

import style from './ChangePasswordForm.module.css';

interface ChangePasswordFormProps {
  handleChangeModalActive: () => void;
}

const schema = yup
  .object({
    old_password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      ),
    new_password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      ),
  })
  .required();
const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ handleChangeModalActive }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<ChangePasswordPayloadType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const watchPasword = watch('old_password' || 'new_password');

  const onSubmit = (data: ChangePasswordPayloadType): void => {
    dispatch(changePassword(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={style.reset_password_form}>
      <Input
        {...register('old_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="Current password"
        type="password"
        variant="password"
      />
      <Input
        {...register('new_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="New password"
        type="password"
        variant="password"
      />
      <PasswordComplexity password={watchPasword} />
      <Button
        label="Continue"
        type="submit"
        className={style.button}
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </Form>
  );
};

export default ChangePasswordForm;
