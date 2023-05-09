import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { FormDataValuesType } from '../../../pages/AuthPage/AuthType';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerService } from '../../../store/reducers/registerSlice';
import { Button, Input } from '../../ui-kit';
import PasswordComplexity from '../PasswordComplexity';

import style from './RegisterForm.module.css';

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      ),
  })
  .required();

const RegisterForm = (): JSX.Element => {
  const [userStatus, setUserStatus] = useState<'seller' | 'supplier'>('supplier');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
    setError,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const watchPasword = watch('password');

  const { errMessage } = useAppSelector(state => state.register);

  const handleClick = (userStatus: 'seller' | 'supplier'): void => {
    setUserStatus(userStatus);
  };

  useEffect(() => {
    if (errMessage === 'Try another email') {
      setError('email', { message: errMessage });
    } else {
      setError('password', { message: errMessage });
      setError('email', { message: errMessage });
    }
  }, [errMessage, setError]);

  const onSubmit = (data: FormDataValuesType): void => {
    if (!isValid) return;
    dispatch(registerService({ ...data, route: userStatus })).then(
      ({ meta: { requestStatus } }) => {
        if (requestStatus === 'fulfilled') navigate('/register/checkEmail');
      },
    );
  };

  return (
    <>
      <div className={style.buttons_status}>
        <Button
          color={userStatus === 'seller' ? 'red' : 'light-red'}
          label="I'm here to buy"
          onClick={() => handleClick('seller')}
        />
        <Button
          color={userStatus === 'supplier' ? 'red' : 'light-red'}
          label="I'm here to sell"
          onClick={() => handleClick('supplier')}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <Input {...register('email')} placeholder="Email" error={errors.email?.message} />
        <div>
          <Input
            {...register('password')}
            classNameWrapper={style.input_password}
            placeholder="Password"
            type="password"
            variant="password"
            error={errors.password?.message}
          />
          <PasswordComplexity valueOfNewPassword={watchPasword} />
        </div>

        <Button
          className={style.button}
          label="Continue"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export default RegisterForm;
