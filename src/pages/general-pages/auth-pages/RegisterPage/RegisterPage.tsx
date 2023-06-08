import React from 'react';

import { AuthPageLayout } from '../assets';

import { RegisterForm } from '.';

export const RegisterPage = (): JSX.Element => {
  return (
    <AuthPageLayout isMainLogoShow footerLink="/login" footerTitle="Log in">
      <RegisterForm />
    </AuthPageLayout>
  );
};
