import { AuthPageLayout } from '../assets';

import { LoginForm } from '.';

export const LoginPage = (): JSX.Element => {
  return (
    <AuthPageLayout
      isMainLogoShow
      footerLink="/forgotPassword"
      footerTitle="Forgot password"
    >
      <LoginForm />
    </AuthPageLayout>
  );
};
