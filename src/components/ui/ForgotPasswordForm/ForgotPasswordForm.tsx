import React, { FC } from 'react';

import { useForm } from 'react-hook-form';


import styleBtn from '../../buttons/Buttons.module.css';
import TextField from '../../TextField';

import style from './ForgotPasswordForm.module.css';
import * as yup from "yup";
import { FormDataValuesType } from "../../../pages/AuthPage/AuthType";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "../../ui-kit";

interface ForgotPasswordFormProps {
  togglePageType: any;
}
const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
  })
  .required();
const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: any): void => {
    console.log(data);
    // eslint-disable-next-line no-useless-return
    if (!isValid) return;
  };

  return (
    <form
      action="/src/pages"
      target="_self"
      onSubmit={handleSubmit(onSubmit)}
      className={style.forgotPasswordForm}
    >
      <Input
        {...register('email')}
        placeholder="Email"
        error={errors.email?.message}
        classNameWrapper={style.input_wrapper} />
      <Button
        label="Reset password"
        className={style.button}
        type="submit"
        disabled={!isValid}
        onClick={togglePageType}
      />
    </form>
  );
};

ForgotPasswordForm.propTypes = {};
export default ForgotPasswordForm;
