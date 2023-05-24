import React from 'react';

import LoginForm from '../../../../components/LoginForm';
import { AuthPageLayout } from '../assets';

export const LoginPage = (): JSX.Element => {
  return (
    <AuthPageLayout footerLink="/forgotPassword">
      <LoginForm />
    </AuthPageLayout>
  );
};
