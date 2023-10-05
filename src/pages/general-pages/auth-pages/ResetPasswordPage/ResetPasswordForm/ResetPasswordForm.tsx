import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { passwordValidationSchema } from 'common/utils';
import { PasswordComplexity } from 'pages/general-pages/auth-pages/assets';
import { IResetPasswordRequest } from 'services/auth/auth.serviceTypes';
import { loadingSelector } from 'store/reducers/appSlice';
import {
  isAuthorizedSelector,
  logoutUser,
  resetPassword,
} from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

import style from './ResetPasswordForm.module.scss';

const TRIGGER_FIELD = 'confirm_password';

interface IResetPasswordForm {
  setModalOpen: (value: boolean) => void;
  token: string;
}

export interface IResetPasswordFormData {
  new_password: string;
  confirm_password: string;
}

const schema = yup
  .object({
    new_password: passwordValidationSchema,
    confirm_password: yup
      .string()
      .oneOf([yup.ref('new_password')], 'Passwords must match'),
  })
  .required();

export const ResetPasswordForm: FC<IResetPasswordForm> = ({
  setModalOpen,
  token,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const loading = useAppSelector(loadingSelector);
  const isLoading = loading === LoadingStatusEnum.Loading;

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
    trigger,
  } = useForm<IResetPasswordRequest>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const watchPassword = watch('new_password' || 'confirm_password');
  const watchNewPassword = watch('new_password');

  useEffect(() => {
    if (watch(TRIGGER_FIELD)) trigger(TRIGGER_FIELD);
  }, [watchNewPassword]);

  const onSubmit = async (data: IResetPasswordFormData): Promise<void> => {
    const actionResult = await dispatch(resetPassword({ ...data, token }));

    if (resetPassword.fulfilled.match(actionResult)) {
      if (isAuthorized) {
        await dispatch(logoutUser());
      }
      setModalOpen(true);
    }
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
        disabled={isLoading}
      />
      <Input
        {...register('confirm_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="Confirm password"
        type="password"
        variant="password"
        error={errors.confirm_password?.message}
        disabled={isLoading}
      />
      <PasswordComplexity password={watchPassword} />
      <Button
        label="Save"
        className={style.button_save}
        type="submit"
        disabled={!isValid || isLoading}
      />
    </form>
  );
};
