import React from 'react';

import { LOGIN } from '../../../../routes';
import { AuthPageLayout } from '../assets';

import { RegisterForm } from '.';

export const RegisterPage = (): JSX.Element => {
  return (
    <AuthPageLayout isMainLogoShow footerLink={LOGIN} footerTitle="Log in">
      <RegisterForm />
    </AuthPageLayout>
  );
};
