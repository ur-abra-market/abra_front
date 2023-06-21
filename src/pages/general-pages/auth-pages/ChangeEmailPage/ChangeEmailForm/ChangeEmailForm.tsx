import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { changeEmail } from '../../../../../store/reducers/authSlice/thunks';
import { Button, Input } from '../../../../../ui-kit';

import style from './ChangeEmailForm.module.scss';

import { emailValidationSchema } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatus } from 'common/types';
import { ChangeEmailPayloadType } from 'services/auth/auth.serviceTypes';

interface ChangeEmailFormProps {
  setModalActive: (val: boolean) => void;
}
const schema = yup
  .object({
    new_email: emailValidationSchema,
    confirm_email: yup.string().oneOf([yup.ref('new_email')], 'Emails must match'),
  })
  .required();

export const ChangeEmailForm: FC<ChangeEmailFormProps> = ({ setModalActive }) => {
  const {
    register,
    watch,
    trigger,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ChangeEmailPayloadType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.app.loading);

  useEffect(() => {
    if (watch('confirm_email')) trigger('confirm_email');
  }, [watch('new_email')]);

  const onSubmit = async (data: ChangeEmailPayloadType): Promise<void> => {
    const actionResult = await dispatch(changeEmail(data));

    if (changeEmail.fulfilled.match(actionResult)) {
      setModalActive(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('new_email')}
        classNameWrapper={style.input_wrapper}
        placeholder="New email"
        error={errors.new_email?.message}
      />
      <Input
        {...register('confirm_email')}
        placeholder="Confirm email"
        classNameWrapper={style.input_wrapper}
        error={errors.confirm_email?.message}
      />
      <Button
        label="Continue"
        type="submit"
        disabled={!isValid || loading === LoadingStatus.Loading}
        className={style.button}
      />
    </form>
  );
};
