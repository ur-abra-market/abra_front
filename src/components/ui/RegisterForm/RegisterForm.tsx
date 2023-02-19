import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerService } from '../../../store/reducers/registerSlice';
import styleBtn from '../../buttons/Buttons.module.css';
import Form from '../../Form';
import Loader from '../../Loader';
import PasswordComplexity from '../../PasswordComplexity';
import style from './RegisterForm.module.css';
import { Button, Input, Label } from "../../ui-kit";
import { FormDataValuesType } from "../../../layouts/Auth/AuthType";

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().matches(
    /^.*(?=.{8,})((?=.*[!#+*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ).required('Password is required'),
})
  .required()
const RegisterForm = (): JSX.Element => {
  const [userStatus, setUserStatus] = useState('suppliers');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormDataValuesType>({
    resolver: yupResolver(schema),
    mode:'all'
  });

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

  const onSubmit = (data: FormDataValuesType) => {
    if (!isValid) return;
    dispatch(registerService({ ...data, route: userStatus }))
  };

  return (
    <>
      <div className={style.buySellBtnWrappeer}>
        <div className={style.flexContainer}>
          <Button
            label="I'm here to buy"
            className={
              userStatus === 'sellers'
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
          <Button
            label="I'm here to sell"
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
          <Input
            {...register('email')}
            placeholder="Email"
            error={errors.email?.message}/>
          <Input
            {...register('password')}
            placeholder="Password"
            type='password'
            error={errors.password?.message}/>
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
