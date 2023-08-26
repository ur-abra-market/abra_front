import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import style from './RegisterForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum, ResponseUserRoleType } from 'common/types';
import { getEmailValidationSchema, passwordValidationSchema } from 'common/utils';
import { PasswordComplexity } from 'pages/general-pages/auth-pages/assets';
import { CHECK_EMAIL } from 'routes';
import { IRegisterRequest } from 'services/auth/auth.serviceTypes';
import { loadingSelector } from 'store/reducers/appSlice';
import { isAuthorizedSelector, registerUser } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

export interface IRegisterFormData extends Omit<IRegisterRequest, 'role'> {}

const formValidationSchema = yup
  .object()
  .shape({
    email: getEmailValidationSchema(true),
    password: passwordValidationSchema,
  })
  .required();

export const RegisterForm = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const isLoading = useAppSelector(loadingSelector) === LoadingStatusEnum.Loading;
  const [userRole, setUserRole] = useState<ResponseUserRoleType>('seller');

  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(formValidationSchema),
    mode: 'all',
  });

  const handleButtonUserRoleOnClick = (userStatus: ResponseUserRoleType): void => {
    setUserRole(userStatus);
  };

  const onSubmit = async (data: IRegisterFormData): Promise<void> => {
    const actionResult = await dispatch(registerUser({ ...data, role: userRole }));

    if (registerUser.fulfilled.match(actionResult)) {
      navigate(CHECK_EMAIL);
    }
  };

  useEffect(() => {
    if (isAuthorized) navigate(-1);
  }, [isAuthorized, navigate]);

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

      <Input
        {...register('email')}
        placeholder="Email"
        error={errors.email?.message}
        disabled={isLoading}
      />

      <Input
        {...register('password')}
        classNameWrapper={style.input_wrapper}
        type="password"
        variant="password"
        placeholder="Password"
        error={errors.password?.message}
        disabled={isLoading}
      />
      <PasswordComplexity password={watch('password')} />

      <Button
        className={style.button_submit}
        label="Create Account"
        type="submit"
        disabled={!isValid || isLoading}
      />
    </form>
  );
};
