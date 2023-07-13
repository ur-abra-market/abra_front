import React, { FC } from 'react';

import style from './SupplierRegisterFormStep.module.scss';

interface ISupplierRegisterFormStep {
  step: 1 | 2;
}
const STEP_1 = {
  title: 'Account Info',
  description:
    'This information will not be published. The data will only be used to create your account',
};
const STEP_2 = {
  title: 'Business profile',
  description: 'Enter the information you want to show on your store profile',
};

export const SupplierRegisterFormStep: FC<ISupplierRegisterFormStep> = ({ step }) => {
  return (
    <div className={style.text_wrapper}>
      <p className={style.title}>{step === 1 ? STEP_1.title : STEP_2.title}</p>
      <p className={style.description}>
        {step === 1 ? STEP_1.description : STEP_2.description}
      </p>
      <div className={style.step_wrapper}>
        <p className={style.step}>{`Step ${step}/2`}</p>
      </div>
    </div>
  );
};
