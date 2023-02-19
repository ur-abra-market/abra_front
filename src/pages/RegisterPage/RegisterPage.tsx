import React, { FC } from 'react';

import { Button } from 'components/buttons';
import styleBtn from 'components/buttons/Buttons.module.css';
import RegisterForm from 'components/ui/RegisterForm';
import style from 'pages/RegisterPage/RegisterPage.module.css';

interface RegisterPageProps {
  togglePageType: ()=>void;
}
const RegisterPage: FC<RegisterPageProps> = ({ togglePageType }): JSX.Element => {
  return (
    <div className={style.authPage__wrap}>
      <Button
        value="Log in"
        className={`${styleBtn.commonButton} ${styleBtn.tab}`}
        onClick={togglePageType}
      />
      <Button value="Sign up" className={`${styleBtn.activeButton} ${styleBtn.tab}`} />
      <div className={style.form__wrap}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
