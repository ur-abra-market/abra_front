import { AuthPageLayout } from '../assets';

import { LoginForm } from './index';

export const LoginPage = (): JSX.Element => {
  return (
    <AuthPageLayout footerLink="/forgotPassword" footerTitle="Forgot password">
      <LoginForm />
    </AuthPageLayout>
  );
};
