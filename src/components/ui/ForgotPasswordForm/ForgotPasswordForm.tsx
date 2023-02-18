import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import TextField from '../../TextField';

import style from './ForgotPasswordForm.module.css';
import * as yup from "yup";
import { FormDataValuesType } from "../../../layouts/Auth/AuthType";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Input } from "../../ui-kit";


const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
})
interface ForgotPasswordFormProps {
  togglePageType: any;
}
const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all'
  })
  const onSubmit = (data: any): void => {
    console.log(data);
    // eslint-disable-next-line no-useless-return
    if (!isValid) return;
  };

  const textFieldClasses = {
    label: `${style.textFieldLabel}`,
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.textFieldInput}`,
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
      />
      <Button
        value="Reset password"
        className={
          !isValid
            ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
            : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
        }
        disabled={!isValid}
        onClick={togglePageType}
      />
    </form>
  );
};

ForgotPasswordForm.propTypes = {};
export default ForgotPasswordForm;
