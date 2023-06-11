import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { passwordValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { LoadingStatus } from '../../../../../common/types/enums';
import { ChangePasswordPayloadType } from '../../../../../services/auth/auth.serviceTypes';
import { changePassword } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';
import { PasswordComplexity } from '../../assets';

import style from './ChangePasswordForm.module.scss';

const formValidationSchema = yup
  .object()
  .shape({
    old_password: passwordValidationSchema,
    new_password: passwordValidationSchema.notOneOf(
      [yup.ref('old_password')],
      'Passwords must not match.',
    ),
  })
  .required();

interface ChangePasswordFormProps {
  setModalActive: (value: boolean) => void;
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ setModalActive }) => {
  const loading = useAppSelector(state => state.app.loading);
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

  const watchPassword = watch('new_password' || 'old_password');

  const onSubmit = async (data: ChangePasswordPayloadType): Promise<void> => {
    const actionResult = await dispatch(changePassword(data));

    if (changePassword.fulfilled.match(actionResult)) {
      setModalActive(true);
    }
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
        disabled={!isValid || loading === LoadingStatus.Loading}
      />
    </form>
  );
};
