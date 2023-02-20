import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import Form from '../../Form';
import PasswordComplexity from '../../new-components/PasswordComplexity';
import TextField from '../../TextField';

import style from './ResetPasswordForm.module.css';

interface ResetPasswordFormProps {
  handleChangeModalActive: any;
}
const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ handleChangeModalActive }) => {
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const watchPasword = watch('password');
  const onSubmit = (): void => {
    // eslint-disable-next-line no-useless-return
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

export default ResetPasswordForm;
