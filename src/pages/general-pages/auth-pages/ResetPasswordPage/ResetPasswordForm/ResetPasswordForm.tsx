import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { passwordValidationSchema } from '../../../../../common/constants';
import { useAppDispatch } from '../../../../../common/hooks';
import { PasswordComplexity } from '../../assets';

import style from './ResetPasswordForm.module.scss';

import { ResetPasswordPayloadType } from 'services/auth/auth.serviceTypes';
import { resetPassword } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

interface ResetPasswordFormProps {
  handleChangeModalActive: () => void;
}
const schema = yup
  .object({
    new_password: passwordValidationSchema,
    confirm_password: yup
      .string()
      .oneOf([yup.ref('new_password')], 'Passwords must match'),
  })
  .required();

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  handleChangeModalActive,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { isValid, errors },
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
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('new_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="New password"
        type="password"
        variant="password"
        error={errors.new_password?.message}
      />
      <Input
        {...register('confirm_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="Confirm password"
        type="password"
        variant="password"
        error={errors.confirm_password?.message}
      />
      <PasswordComplexity password={watchPassword} />
      <Button
        label="Save"
        className={style.button_save}
        type="submit"
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </form>
  );
};

export default ResetPasswordForm;
