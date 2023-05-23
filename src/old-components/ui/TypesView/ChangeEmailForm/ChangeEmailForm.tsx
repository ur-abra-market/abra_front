import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input } from '../../../../ui-kit';
import Form from '../../../Form';

import style from './ChangeEmailForm.module.css';

export type FormDataValuesType = {
  email: string;
  password: string;
};

interface ChangeEmailFormProps {
  handleChangeModalActive: () => void;
}
const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
  })
  .required();
const ChangeEmailForm: FC<ChangeEmailFormProps> = ({ handleChangeModalActive }) => {
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
    <Form onSubmit={handleSubmit(onSubmit)} className={style.reset_password_form}>
      <Input
        {...register('email')}
        classNameWrapper={style.input_wrapper}
        placeholder="Current email"
        error={errors.email?.message}
      />
      <Input
        {...register('email')}
        placeholder="New email"
        classNameWrapper={style.input_wrapper}
        error={errors.email?.message}
      />
      <Button
        label="Continue"
        disabled={!isValid}
        className={style.button}
        onClick={handleChangeModalActive}
      />
    </Form>
  );
};

export default ChangeEmailForm;
