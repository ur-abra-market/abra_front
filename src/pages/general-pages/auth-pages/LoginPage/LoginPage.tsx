import { LoginForm } from '.';

import { IAuthFooterData } from 'common/types';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { FORGOT_PASSWORD, REGISTER } from 'routes';

export const LoginPage = (): JSX.Element => {
  const loginFooterData: IAuthFooterData[] = [
    { link: FORGOT_PASSWORD, title: 'Forgot password' },
    { link: REGISTER, title: 'Create account' },
  ];

  return (
    <AuthPageLayout isMainLogoShow footerData={loginFooterData}>
      <LoginForm />
    </AuthPageLayout>
  );
};
