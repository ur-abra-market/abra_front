import { LoginForm } from '.';

import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { FORGOT_PASSWORD } from 'routes';

export const LoginPage = (): JSX.Element => {
  return (
    <AuthPageLayout
      isMainLogoShow
      footerLink={FORGOT_PASSWORD}
      footerTitle="Forgot password"
    >
      <LoginForm />
    </AuthPageLayout>
  );
};
