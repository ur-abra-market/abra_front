import { KeyboardEvent, useEffect, useState } from 'react';

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
import { registerUser } from 'store/reducers/authSlice';
import { Button, Input } from 'ui-kit';

export interface IRegisterFormData extends Omit<IRegisterRequest, 'role'> {}

const formValidationSchema = yup.object().shape({
  email: getEmailValidationSchema(),
  password: passwordValidationSchema,
});

export const RegisterForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<ResponseUserRoleType>('seller');
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const isLoading = useAppSelector(loadingSelector) === LoadingStatusEnum.Loading;
  const {
    register,
    watch,
    formState: { isValid, errors },
    setFocus,
    clearErrors,
    handleSubmit,
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(formValidationSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleButtonUserRoleOnClick = (userStatus: ResponseUserRoleType): void => {
    clearErrors();
    setUserRole(userStatus);
    setFocus('email');
  };

  const onSubmit = async (data: IRegisterFormData): Promise<void> => {
    const actionResult = await dispatch(registerUser({ ...data, role: userRole }));

    if (registerUser.fulfilled.match(actionResult)) {
      navigate(CHECK_EMAIL);
    }
  };

  useEffect(() => {
    if (isAuthorized) navigate(-1);
  }, [isAuthorized]);

  useEffect(() => {
    setFocus('email');
  }, []);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === ' ') {
      event.preventDefault();
    }
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

      <Input
        {...register('email')}
        placeholder="Email"
        error={errors.email?.message}
        disabled={isLoading}
        autoComplete="off"
      />

      <Input
        {...register('password')}
        classNameWrapper={style.input_wrapper}
        type="password"
        variant="password"
        placeholder="Password"
        error={errors.password?.message}
        disabled={isLoading}
        onKeyDown={handleKeyPress}
        autoComplete="new-password"
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
