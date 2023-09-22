import React, { FC, useEffect, useState } from 'react';

import { maxPasswordLength, minPasswordLength } from './constants';
import style from './PasswordComplexity.module.scss';

import { ReliabilityIndicator } from '.';

interface IPasswordComplexity {
  password: string;
}

interface IPassword {
  passwordLength: boolean;
  digitSymbol: boolean;
  capitalSymbol: boolean;
  containsSpecSymbols: boolean;
  spaceSymbols: boolean;
  lowerCaseSymbols: boolean;
}

export const PasswordComplexity: FC<IPasswordComplexity> = ({ password }) => {
  const [passwordValidity, setPasswordValidity] = useState<IPassword>();

  useEffect(() => {
    const digitRegExp = /\d/g;
    const capitalRegExp = /[A-Z]/g;
    const specSymbolRegExp = /[!#+*]/g;
    const withoutSpaceRegExp = /^[^]*\s[^]*$/;
    const lowerCaseRegExp = /[a-z]/g;
    const successPassword =
      password?.length >= minPasswordLength && password?.length <= maxPasswordLength;

    setPasswordValidity({
      passwordLength: successPassword,
      digitSymbol: digitRegExp.test(password),
      capitalSymbol: capitalRegExp.test(password),
      containsSpecSymbols: specSymbolRegExp.test(password),
      spaceSymbols: withoutSpaceRegExp.test(password),
      lowerCaseSymbols: lowerCaseRegExp.test(password),
    });
  }, [password]);

  return (
    <div className={style.wrapper}>
      <ReliabilityIndicator
        text="1 capital letter"
        isValid={passwordValidity?.capitalSymbol}
      />
      <ReliabilityIndicator
        text="1 lowercase letter"
        isValid={passwordValidity?.lowerCaseSymbols}
      />
      <ReliabilityIndicator text="1 number" isValid={passwordValidity?.digitSymbol} />
      <ReliabilityIndicator
        text="from 8 to 30 characters"
        isValid={passwordValidity?.passwordLength}
      />
      <ReliabilityIndicator
        text="!/#/+/*"
        isValid={passwordValidity?.containsSpecSymbols}
      />
      <ReliabilityIndicator text="no space" isValid={!passwordValidity?.spaceSymbols} />
    </div>
  );
};
