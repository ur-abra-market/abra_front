import { LoginForm } from '.';

import { IAuthFooterData } from 'common/types';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { FORGOT_PASSWORD, REGISTER } from 'routes';

const loginFooterData: IAuthFooterData[] = [
  { link: FORGOT_PASSWORD, title: 'Forgot password' },
  { link: REGISTER, title: 'Create account' },
];

const LoginPage = (): JSX.Element => (
  <AuthPageLayout isMainLogoShow footerData={loginFooterData}>
    <LoginForm />
  </AuthPageLayout>
);

export default LoginPage;
