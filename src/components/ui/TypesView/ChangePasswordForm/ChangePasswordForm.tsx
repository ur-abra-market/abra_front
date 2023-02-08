import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../../../buttons';
import styleBtn from '../../../buttons/Buttons.module.css';
import Form from '../../../Form';
import PasswordComplexity from '../../../PasswordComplexity';
import TextField from '../../../TextField';

import style from './ChangePasswordForm.module.css';

interface ChangePasswordFormProps {
  handleChangeModalActive: Function;
}
const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ handleChangeModalActive }) => {
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
        placeholder="Current password"
        label="Password"
        type="password"
        id="password"
        name="password"
        classes={textFieldClasses}
      />
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
        placeholder="New password"
        label="Password"
        type="password"
        id="new-password"
        name="password"
        classes={textFieldClasses}
      />
      <PasswordComplexity valueOfNewPassword={watchPasword} />
      <Button
        value="Continue"
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

export default ChangePasswordForm;
