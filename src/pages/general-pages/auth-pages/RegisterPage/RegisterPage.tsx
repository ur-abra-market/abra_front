import React from 'react';

import { RegisterForm } from '.';

import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { LOGIN } from 'routes';

export const RegisterPage = (): JSX.Element => {
  return (
    <AuthPageLayout isMainLogoShow footerLink={LOGIN} footerTitle="Log in">
      <RegisterForm />
    </AuthPageLayout>
  );
};
