import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { passwordValidationSchema } from '../../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { LoadingStatusEnum } from '../../../../../common/types';
import { ChangePasswordPayloadType } from '../../../../../services/auth/auth.serviceTypes';
import { loadingSelector } from '../../../../../store/reducers/appSlice';
import { changePassword } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';
import { PasswordComplexity } from '../../assets';

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
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
    trigger,
  } = useForm<ChangePasswordPayloadType>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onChange',
  });

  const watchPassword = watch('new_password' || 'old_password');

  useEffect(() => {
    if (watch(TRIGGER_FIELD)) trigger(TRIGGER_FIELD);
  }, [watch('old_password')]);

  const onSubmit = async (data: ChangePasswordPayloadType): Promise<void> => {
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
        className={style.button_submit}
        disabled={!isValid || loading === LoadingStatusEnum.Loading}
      />
    </form>
  );
};
