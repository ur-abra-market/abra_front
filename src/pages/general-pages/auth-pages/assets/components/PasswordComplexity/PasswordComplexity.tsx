import { FC, useEffect, useState } from 'react';

import { ReliabilityIndicator } from '.';

import style from './PasswordComplexity.module.scss';

interface IPasswordComplexity {
  password: string;
}

interface IPassword {
  passwordLength: boolean;
  digitSymbol: boolean;
  capitalSymbol: boolean;
  containsSpecSymbols: boolean;
}

const MIN_PASSWORD_LENGTH = 8;

export const PasswordComplexity: FC<IPasswordComplexity> = ({ password }) => {
  const [passwordValidity, setPasswordValidity] = useState<IPassword>();

  useEffect(() => {
    const digitRegExp = /\d/g;
    const capitalRegExp = /[A-Z]/g;
    const specSymbolRegExp = /[!#+*]/g;
    const lowerCaseRegExp = /[a-z]/g;
    const successPassword = password?.length >= MIN_PASSWORD_LENGTH;

    setPasswordValidity({
      passwordLength: successPassword,
      digitSymbol: digitRegExp.test(password),
      capitalSymbol: capitalRegExp.test(password) && lowerCaseRegExp.test(password),
      containsSpecSymbols: specSymbolRegExp.test(password),
    });
  }, [password]);

  return (
    <div className={style.wrapper}>
      <ReliabilityIndicator
        text={`1 lowercase and\n1 capital letter`}
        isValid={passwordValidity?.capitalSymbol}
      />
      <ReliabilityIndicator text="1 number" isValid={passwordValidity?.digitSymbol} />
      <ReliabilityIndicator
        text="min 8 symbols"
        isValid={passwordValidity?.passwordLength}
      />
      <ReliabilityIndicator
        text="!/#/+/*"
        isValid={passwordValidity?.containsSpecSymbols}
      />
    </div>
  );
};
