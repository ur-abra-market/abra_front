import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input } from '../../../../../ui-kit';

import style from './ChangeEmailForm.module.scss';

import { emailValidationSchema } from 'common/constants';

export type FormDataValuesType = {
  old_email: string;
  new_email: string;
};

interface ChangeEmailFormProps {
  handleChangeModalActive: () => void;
}
const schema = yup
  .object({
    old_email: emailValidationSchema,
    new_email: emailValidationSchema,
  })
  .required();

export const ChangeEmailForm: FC<ChangeEmailFormProps> = ({
  handleChangeModalActive,
}) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = (): void => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Input
        {...register('old_email')}
        classNameWrapper={style.input_wrapper}
        placeholder="Current email"
        error={errors.old_email?.message}
      />
      <Input
        {...register('new_email')}
        placeholder="New email"
        classNameWrapper={style.input_wrapper}
        error={errors.new_email?.message}
      />
      <Button
        label="Continue"
        disabled={!isValid}
        className={style.button}
        onClick={handleChangeModalActive}
      />
    </form>
  );
};
