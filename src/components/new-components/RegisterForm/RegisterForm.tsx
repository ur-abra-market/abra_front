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
    password: yup.string().min(8).max(32).required(),
  })
  .required();
const RegisterForm = (): JSX.Element => {
  const [userStatus, setUserStatus] = useState<'sellers' | 'suppliers'>('suppliers');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const watchPasword = watch('password');

  const { loading, errMessage, resMessage } = useAppSelector(state => state.register);

  console.log(loading, errMessage);
  const handleClick = (userStatus: 'sellers' | 'suppliers'): void => {
    setUserStatus(userStatus);
  };

  useEffect(() => {
    if (resMessage === 'MESSAGE_HAS_BEEN_SENT') navigate('/');
  }, [resMessage]);

  const onSubmit = (data: FormDataValuesType): void => {
    if (!isValid) return;
    dispatch(registerService({ ...data, route: userStatus }));
  };

  return (
    <>
      <div className={style.buttons_status}>
        <Button
          color={userStatus === 'sellers' ? 'red' : 'light-red'}
          label="I'm here to buy"
          onClick={() => handleClick('sellers')}
        />
        <Button
          color={userStatus === 'suppliers' ? 'red' : 'light-red'}
          label="I'm here to sell"
          onClick={() => handleClick('suppliers')}
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
