import React from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import TextField from '../../TextField';

import style from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = ({ togglePageType }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => {
    console.log(data);
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
      <TextField
        register={register('email', {
          required: 'Email is required!',
          pattern: {
            value: /^\S+@\S+\.\S+$/g,
            message: 'Email is incorrect!',
          },
        })}
        label="Email"
        name="email"
        placeholder="Email"
        classes={textFieldClasses}
        error={errors.email}
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

ForgotPasswordForm.propTypes = {
  togglePageType: PropTypes.func,
};
export default ForgotPasswordForm;
