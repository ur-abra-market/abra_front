import React, { FC, useEffect, useState } from 'react';

import PasswordStrengthIndicatorItem from '../PasswordStrengthIndicatorItem';

import style from './PasswordComplexity.module.css';

interface PasswordComplexityProps {
  valueOfNewPassword: string;
}
const PasswordComplexity: FC<PasswordComplexityProps> = ({ valueOfNewPassword }) => {
  const [passwordValidyty, setPasswordValidyty] = useState<any>({
    minLength: null,
    digitSymbol: null,
    capitalSymbol: null,
    containsSpecSymbols: null,
  });

  useEffect(() => {
    const digitRegExp = /\d/g;
    const capitalRegExp = /[A-Z]/g;
    const specSymbolRegExp = /[!#+*]/g;

    setPasswordValidyty({
      minLength: valueOfNewPassword?.length >= 8,
      digitSymbol: !!digitRegExp.test(valueOfNewPassword),
      capitalSymbol: !!capitalRegExp.test(valueOfNewPassword),
      containsSpecSymbols: !!specSymbolRegExp.test(valueOfNewPassword),
    });
  }, [valueOfNewPassword]);

  return (
    <div className={style.requirementsWrapper}>
      <PasswordStrengthIndicatorItem
        text="1 capital letter"
        isValid={passwordValidyty?.capitalSymbol}
      />
      <PasswordStrengthIndicatorItem
        text="1 number"
        isValid={passwordValidyty?.digitSymbol}
      />
      <PasswordStrengthIndicatorItem
        text="8 symbols"
        isValid={passwordValidyty?.minLength}
      />
      <PasswordStrengthIndicatorItem
        text="!/#/+/*"
        isValid={passwordValidyty?.containsSpecSymbols}
      />
    </div>
  );
};

export default PasswordComplexity;
