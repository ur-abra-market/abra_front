import React, { FC } from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../../../buttons';
import styleBtn from '../../../buttons/Buttons.module.css';
import Form from '../../../Form';
import TextField from '../../../TextField';

import style from './ChangeEmailForm.module.css';

interface ChangeEmailFormProps {
  handleChangeModalActive: Function;
}
const ChangeEmailForm: FC<ChangeEmailFormProps> = ({ handleChangeModalActive }) => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const validatePattern = {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Please enter a valid email',
  };
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
        register={register('currentEmail', {
          required: 'Current email is required!',
          pattern: validatePattern,
        })}
        placeholder="Current email"
        label="currentEmail"
        type="text"
        id="currentEmail"
        name="currentEmail"
        classes={textFieldClasses}
        error={errors?.currentEmail}
      />
      <TextField
        register={register('newEmail', {
          required: 'New email is required!',
          pattern: validatePattern,
        })}
        placeholder="New email"
        label="newEmail"
        type="text"
        id="newEmail"
        name="newEmail"
        classes={textFieldClasses}
        error={errors?.newEmail}
      />
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

export default ChangeEmailForm;
