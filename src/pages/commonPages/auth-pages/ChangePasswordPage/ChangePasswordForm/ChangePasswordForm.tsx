import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { passwordValidationSchema } from '../../../../../common/constants';
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';
import { ChangePasswordPayloadType } from '../../../../../services/auth/auth.serviceTypes';
import { changePassword } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';
import { PasswordComplexity } from '../../assets';

import style from './ChangePasswordForm.module.scss';

const formValidationSchema = yup
  .object()
  .shape({
    old_password: passwordValidationSchema,
    new_password: passwordValidationSchema,
  })
  .required();

interface ChangePasswordFormProps {
  handleChangeModalActive: () => void;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ handleChangeModalActive }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ChangePasswordPayloadType>({
    resolver: yupResolver(formValidationSchema),
    mode: 'all',
  });

  const watchPassword = watch('old_password' || 'new_password');

  const onSubmit = (data: ChangePasswordPayloadType): void => {
    dispatch(changePassword(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('old_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="Current password"
        type="password"
        variant="password"
        error={errors.old_password?.message}
      />
      <Input
        {...register('new_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="New password"
        type="password"
        variant="password"
        error={errors.new_password?.message}
      />
      <PasswordComplexity password={watchPassword} />
      <Button
        label="Continue"
        type="submit"
        className={style.button}
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </form>
  );
};

export default ChangePasswordForm;
