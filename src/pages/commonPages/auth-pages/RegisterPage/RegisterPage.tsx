import React from 'react';

import { AuthPageLayout } from '../assets';

import { RegisterForm } from './index';

export const RegisterPage = (): JSX.Element => {
  return (
    <AuthPageLayout footerLink="/auth">
      <RegisterForm />
    </AuthPageLayout>
  );
};
