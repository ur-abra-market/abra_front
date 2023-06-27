import React, { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { changeEmail } from '../../../../../store/reducers/authSlice';
import { Button, Input } from '../../../../../ui-kit';

import style from './ChangeEmailForm.module.scss';

import { emailValidationSchema } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { IChangeEmailRequest } from 'services/auth/auth.serviceTypes';
import { loadingSelector } from 'store/reducers/appSlice';

const TRIGGER_FIELD = 'confirm_email';

interface IChangeEmailForm {
  setOpenModal: (value: boolean) => void;
}
const schema = yup
  .object({
    new_email: emailValidationSchema,
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

  useEffect(() => {
    if (watch(TRIGGER_FIELD)) trigger(TRIGGER_FIELD);
  }, [watch('new_email')]);

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
        disabled={!isValid || loading === LoadingStatusEnum.Loading}
        className={style.button_submit}
      />
    </form>
  );
};
