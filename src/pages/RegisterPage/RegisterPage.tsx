import React, { FC } from 'react';

import styleBtn from 'components/buttons/Buttons.module.css';
import RegisterForm from 'components/ui/RegisterForm';
import style from 'pages/RegisterPage/RegisterPage.module.css';
import { Button } from 'components/ui-kit';

interface RegisterPageProps {
  togglePageType: ()=>void;
}
const RegisterPage: FC<RegisterPageProps> = ({ togglePageType }): JSX.Element => {
  return (
    <div className={style.authPage__wrap}>
      <Button
        label="Log in"
        className={`${styleBtn.commonButton} ${styleBtn.tab}`}
        onClick={togglePageType}
      />
      <Button label="Sign up" className={`${styleBtn.activeButton} ${styleBtn.tab}`} />
      <div className={style.form__wrap}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
