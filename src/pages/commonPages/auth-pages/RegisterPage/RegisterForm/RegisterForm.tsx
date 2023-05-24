import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../../../common/hooks/useAppSelector';
import { registerUser } from '../../../../../store/reducers/authSlice/asyncThunks';
import { Button, Input } from '../../../../../ui-kit';
import { PasswordComplexity } from '../../assets';

import style from './RegisterForm.module.scss';

import { errorMessageSelector } from 'store/reducers/authSlice/.index';

const MATCHED_ERROR_MESSAGE =
  'password must match the following: "/^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/"';

export type FormDataValuesType = {
  email: string;
  password: string;
};

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

export const RegisterForm = (): JSX.Element => {
  const [userRole, setUserRole] = useState<'seller' | 'supplier'>('seller');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const watchPassword = watch('password');

  const errorMessage = useAppSelector(errorMessageSelector);

  const handleButtonUserRoleOnClick = (userStatus: 'seller' | 'supplier'): void => {
    setUserRole(userStatus);
  };

  useEffect(() => {
    if (errorMessage === 'Try another email') {
      setError('email', { message: errorMessage });
    } else {
      setError('password', { message: errorMessage || undefined });
      setError('email', { message: errorMessage || undefined });
    }
  }, [errorMessage, setError]);

  const onSubmit = (data: FormDataValuesType): void => {
    // if (!isValid) return;
    dispatch(registerUser({ ...data, route: userRole })).then(
      ({ meta: { requestStatus } }) => {
        if (requestStatus === 'fulfilled') navigate('/register/checkEmail');
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <div className={style.buttons_container_user_role}>
        <Button
          className={style.button_user_role}
          color={userRole === 'seller' ? 'black' : 'white'}
          label="I'm here to buy"
          onClick={() => handleButtonUserRoleOnClick('seller')}
        />

        <Button
          className={style.button_user_role}
          color={userRole === 'supplier' ? 'black' : 'white'}
          label="I'm here to sell"
          onClick={() => handleButtonUserRoleOnClick('supplier')}
        />
      </div>

      <Input {...register('email')} placeholder="Email" error={errors.email?.message} />

      <div>
        <Input
          {...register('password')}
          classNameWrapper={style.input_password}
          placeholder="Password"
          type="password"
          variant="password"
          error={
            errors.password?.message !== MATCHED_ERROR_MESSAGE
              ? errors.password?.message
              : ''
          }
        />
        <PasswordComplexity password={watchPassword} />
      </div>

      <Button
        className={style.button_submit}
        label="Create Account"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};
