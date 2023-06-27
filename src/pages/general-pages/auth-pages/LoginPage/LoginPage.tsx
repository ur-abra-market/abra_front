import { FORGOT_PASSWORD } from '../../../../routes';
import { AuthPageLayout } from '../assets';

import { LoginForm } from '.';

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
