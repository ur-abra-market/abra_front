import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { passwordValidationSchema } from 'common/utils';
import { PasswordComplexity } from 'pages/general-pages/auth-pages/assets';
import { IChangePasswordRequest } from 'services/auth/auth.serviceTypes';
import { loadingSelector } from 'store/reducers/appSlice';
import { changePassword } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

import style from './ChangePasswordForm.module.scss';

const TRIGGER_FIELD = 'new_password';

const formValidationSchema = yup
  .object()
  .shape({
    old_password: passwordValidationSchema,
    new_password: passwordValidationSchema.notOneOf(
      [yup.ref('old_password'), null],
      'Passwords must not match',
    ),
  })
  .required();

interface IChangePasswordForm {
  setOpenModal: (value: boolean) => void;
}

export const ChangePasswordForm: FC<IChangePasswordForm> = ({ setOpenModal }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const isLoading = loading === LoadingStatusEnum.Loading;

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
    trigger,
  } = useForm<IChangePasswordRequest>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onChange',
  });

  const watchPassword = watch('new_password' || 'old_password');
  const watchOldPassword = watch('old_password');

  useEffect(() => {
    if (watch(TRIGGER_FIELD)) trigger(TRIGGER_FIELD);
  }, [watchOldPassword]);

  const onSubmit = async (data: IChangePasswordRequest): Promise<void> => {
    const actionResult = await dispatch(changePassword(data));

    if (changePassword.fulfilled.match(actionResult)) {
      setOpenModal(true);
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
        disabled={isLoading}
      />

      <Input
        {...register('new_password')}
        classNameWrapper={style.input_wrapper}
        placeholder="New password"
        type="password"
        variant="password"
        error={errors.new_password?.message}
        disabled={isLoading}
      />

      <PasswordComplexity password={watchPassword} />

      <Button
        label="Continue"
        type="submit"
        className={style.button_submit}
        disabled={!isValid || isLoading}
      />
    </form>
  );
};
