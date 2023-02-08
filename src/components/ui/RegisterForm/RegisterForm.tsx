import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerService } from '../../../store/reducers/registerSlice';
import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import Form from '../../Form';
import Loader from '../../Loader';
import PasswordComplexity from '../../PasswordComplexity';
import TextField from '../../TextField';

import style from './RegisterForm.module.css';

const RegisterForm = (): JSX.Element => {
  const [userStatus, setUserStatus] = useState('suppliers');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const watchPasword = watch('password');

  const isLoading = useAppSelector(state => state.register.loading);
  const errMessage = useAppSelector(state => state.register.errMessage);
  const resMessage = useAppSelector(state => state.register.resMessage);

  const toggleUserStatus = () => {
    setUserStatus(prevState => (prevState === 'suppliers' ? 'sellers' : 'suppliers'));
  };

  useEffect(() => {
    if (resMessage === 'MESSAGE_HAS_BEEN_SENT') navigate('/');
  }, [resMessage]);

  const onSubmit = (data: any) => {
    if (!isValid) return;
    dispatch(registerService({ ...data, route: userStatus }));
  };

  const textFieldClasses = {
    label: `${style.textFieldLabel}`,
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.textFieldInput}`,
  };

  return (
    <>
      <div className={style.buySellBtnWrappeer}>
        <div className={style.flexContainer}>
          <Button
            value="I'm here to buy"
            className={
              userStatus === 'sellers'
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
          <Button
            value="I'm here to sell"
            className={
              userStatus === 'suppliers'
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
        </div>
      </div>

      <Form
        action="src/components/ui/RegisterForm/RegisterForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          register={register('email', {
            required: 'Email is required!',
            pattern: {
              value: /^\w+\S+@\w+\S+\.[\w+\S+]{2,}$/g,
              message: 'Email is incorrect!',
            },
          })}
          label="Email"
          name="email"
          placeholder="Email"
          classes={textFieldClasses}
          error={errors.email}
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
              spaceSymbol: s => !/\s/g.test(s),
            },
          })}
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          classes={textFieldClasses}
        />
        <PasswordComplexity valueOfNewPassword={watchPasword} />
        {isLoading && <Loader />}
        {errMessage && <p>{errMessage}</p>}
        <Button
          value="Sign up"
          className={
            !isValid
              ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
              : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
          }
          disabled={!isValid}
        />
      </Form>
    </>
  );
};

export default RegisterForm;
