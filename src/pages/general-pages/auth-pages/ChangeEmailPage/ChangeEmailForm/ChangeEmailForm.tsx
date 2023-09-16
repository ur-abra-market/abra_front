import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from './ChangeEmailForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { getEmailValidationSchema } from 'common/utils';
import { IChangeEmailRequest } from 'services/auth/auth.serviceTypes';
import { loadingSelector } from 'store/reducers/appSlice';
import { changeEmail } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

const TRIGGER_FIELD = 'confirm_email';

interface IChangeEmailForm {
  setOpenModal: (value: boolean) => void;
}
const schema = yup
  .object({
    new_email: getEmailValidationSchema(),
    confirm_email: yup.string().oneOf([yup.ref('new_email')], 'Emails must match'),
  })
  .required();

export const ChangeEmailForm: FC<IChangeEmailForm> = ({ setOpenModal }) => {
  const {
    register,
    watch,
    trigger,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<IChangeEmailRequest>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const isLoading = loading === LoadingStatusEnum.Loading;
  const watchNewEmail = watch('new_email');

  useEffect(() => {
    if (watch(TRIGGER_FIELD)) trigger(TRIGGER_FIELD);
  }, [watchNewEmail]);

  const onSubmit = async (data: IChangeEmailRequest): Promise<void> => {
    const actionResult = await dispatch(changeEmail(data));

    if (changeEmail.fulfilled.match(actionResult)) {
      setOpenModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('new_email')}
        classNameWrapper={style.input_wrapper}
        placeholder="New email"
        error={errors.new_email?.message}
        disabled={isLoading}
      />

      <Input
        {...register('confirm_email')}
        placeholder="Confirm email"
        classNameWrapper={style.input_wrapper}
        error={errors.confirm_email?.message}
        disabled={isLoading}
      />

      <Button
        label="Continue"
        type="submit"
        disabled={!isValid || isLoading}
        className={style.button_submit}
      />
    </form>
  );
};
