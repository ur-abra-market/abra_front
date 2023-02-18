import React, { FC } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import Form from '../../Form';
import PasswordComplexity from '../../PasswordComplexity';
import TextField from '../../TextField';

import style from './ResetPasswordForm.module.css';
import * as yup from "yup";
import { FormDataValuesType } from "../../../layouts/Auth/AuthType";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../ui-kit";

interface ResetPasswordFormProps {
  handleChangeModalActive: any;
}

const schema = yup.object({
  password: yup.string().matches(
    /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ).required('Password is required'),})
const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ handleChangeModalActive }) => {
  const {
    register,
    watch,
    formState: { isValid, errors},
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode:'all'
  });
  const watchPasword = watch('password');
  const onSubmit = () => {
    if (!isValid) return;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={style.resetPasswordForm}>
      <Input
        {...register('password')}
        placeholder="Password"
        type='password'
        error={errors.password?.message}
      />
      <PasswordComplexity valueOfNewPassword={watchPasword} />
      <Button
        value="Save"
        className={
          !isValid
            ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
            : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
        }
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </Form>
  );
};

export default ResetPasswordForm;
