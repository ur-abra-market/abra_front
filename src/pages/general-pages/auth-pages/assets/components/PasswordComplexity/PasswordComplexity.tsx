import React, { FC, useEffect, useState } from 'react';

import style from './PasswordComplexity.module.scss';

import { ReliabilityIndicator } from './index';

interface IPasswordComplexity {
  password: string;
}

interface IPassword {
  minLength: boolean;
  digitSymbol: boolean;
  capitalSymbol: boolean;
  containsSpecSymbols: boolean;
}

export const PasswordComplexity: FC<IPasswordComplexity> = ({ password }) => {
  const [passwordValidity, setPasswordValidity] = useState<IPassword>();

  useEffect(() => {
    const digitRegExp = /\d/g;
    const capitalRegExp = /[A-Z]/g;
    const specSymbolRegExp = /[!#+*]/g;

    setPasswordValidity({
      minLength: password?.length >= 8,
      digitSymbol: digitRegExp.test(password),
      capitalSymbol: capitalRegExp.test(password),
      containsSpecSymbols: specSymbolRegExp.test(password),
    });
  }, [password]);

  return (
    <div className={style.wrapper}>
      <ReliabilityIndicator
        text="1 capital letter"
        isValid={passwordValidity?.capitalSymbol}
      />
      <ReliabilityIndicator text="1 number" isValid={passwordValidity?.digitSymbol} />
      <ReliabilityIndicator text="8 symbols" isValid={passwordValidity?.minLength} />
      <ReliabilityIndicator
        text="!/#/+/*"
        isValid={passwordValidity?.containsSpecSymbols}
      />
    </div>
  );
};
