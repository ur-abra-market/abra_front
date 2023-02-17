import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerService } from '../../../store/reducers/registerSlice';
import { Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import Form from '../../Form';
import Loader from '../../Loader';
import PasswordComplexity from '../../PasswordComplexity';
import TextField from '../../TextField';

import style from './RegisterForm.module.css';
import { Input, Label } from "../../ui-kit";



type ValidateType={
  email:string
  password:string
}
const schema = yup.object({
  email: yup.string().email('Ivalid email').required('Email is required'),
  password: yup.string().min(8).max(32).required(),
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
  } = useForm<ValidateType>({
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

  const onSubmit = (data: any) => {
    if (!isValid) return;
    dispatch(registerService({ ...data, route: userStatus }))
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
        <Label label={'Email'}>
          <Input
            {...register('email')}
            placeholder="Email"
            error={errors.email?.message}/>
        </Label>
        <Label label={"Password"}>
          <Input
            {...register('password')}
            placeholder="Password"
            type='password'
            error={errors.email?.message}/>
        </Label>
        {/*<TextField*/}
        {/*  {...register('email')}*/}
        {/*  label="Email"*/}
        {/*  name="email"*/}
        {/*  placeholder="Email"*/}
        {/*  classes={textFieldClasses}*/}
        {/*  error={errors.email?.message}*/}
        {/*/>*/}
        {/*<TextField*/}
        {/*  {...register('password')}*/}
        {/*  label="Password"*/}
        {/*  type="password"*/}
        {/*  name="password"*/}
        {/*  placeholder="Password"*/}
        {/*  classes={textFieldClasses}*/}
        {/*  error={errors.password?.message}*/}
        {/*/>*/}
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
