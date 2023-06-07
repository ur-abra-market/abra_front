import { AuthPageLayout } from '../assets';

import { LoginForm } from './index';

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
