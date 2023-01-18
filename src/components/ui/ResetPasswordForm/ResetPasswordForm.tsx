import React from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button } from '../../common/buttons';
import styleBtn from '../../common/buttons/buttons.module.css';
import Form from '../../common/Form';
import PasswordComplexity from '../../common/PasswordComplexity';
import TextField from '../../common/TextField';

import style from './ResetPasswordForm.module.css';

const ResetPasswordForm = ({ handleChangeModalActive }) => {
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const watchPasword = watch('password');
  const onSubmit = () => {
    if (!isValid) return;
  };
  const textFieldClasses = {
    label: `${style.textFieldLabel}`,
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.textFieldInput}`,
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={style.resetPasswordForm}>
      <TextField
        register={register('password', {
          required: 'Password is required!',
          minLength: {
            value: 8,
            message: 'Password must contain at least 8 characters!',
          },
          validate: {
            capitalSymbol: s => /[A-Z]+/g.test(s),
            digitSymbol: s => /\d+/g.test(s),
            specialSymbol: s => /[!#+*]/g.test(s),
          },
        })}
        label="Password"
        type="password"
        id="password"
        name="password"
        classes={textFieldClasses}
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

ResetPasswordForm.propTypes = {
  handleChangeModalActive: PropTypes.func,
};
export default ResetPasswordForm;
