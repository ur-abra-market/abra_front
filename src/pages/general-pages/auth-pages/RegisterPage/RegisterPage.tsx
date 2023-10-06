import { RegisterForm } from '.';

import { IAuthFooterData } from 'common/types';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { LOGIN } from 'routes';

const RegisterPage = (): JSX.Element => {
  const registerFooterData: IAuthFooterData[] = [{ link: LOGIN, title: 'Log in' }];

  return (
    <AuthPageLayout isMainLogoShow footerData={registerFooterData}>
      <RegisterForm />
    </AuthPageLayout>
  );
};

export default RegisterPage;
