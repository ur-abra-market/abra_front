import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import Form from '../../Form';
import PasswordComplexity from '../../new-components/PasswordComplexity';

import style from './ResetPasswordForm.module.css';
import * as yup from "yup";
import { FormDataValuesType } from "../../../pages/AuthPage/AuthType";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Input } from "../../ui-kit";

interface ResetPasswordFormProps {
  handleChangeModalActive: ()=>void;
}
const schema = yup
  .object({
    password: yup.string().matches(
      /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    )
  })
  .required();
const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ handleChangeModalActive }) => {
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } =  useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const watchPasword = watch('password');
  const onSubmit = (): void => {
    // eslint-disable-next-line no-useless-return
    if (!isValid) return;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={style.resetPasswordForm}>
      <Input
        {...register('password')}
        classNameWrapper={style.input_wrapper}
        placeholder="Password"
        type="password"
        variant="password"
      />
      <PasswordComplexity valueOfNewPassword={watchPasword} />
      <Button
        label="Save"
        className={style.button_save}
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </Form>
  );
};

export default ResetPasswordForm;
