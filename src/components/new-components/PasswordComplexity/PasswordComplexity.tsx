import React, { FC, useEffect, useState } from 'react';

import style from './PasswordComplexity.module.css';
import PasswordStrengthIndicatorItem from './PasswordStrengthIndicatorItem';

interface PasswordComplexityProps {
  valueOfNewPassword: string;
}

interface IPassword {
  minLength: boolean;
  digitSymbol: boolean;
  capitalSymbol: boolean;
  containsSpecSymbols: boolean;
}
const PasswordComplexity: FC<PasswordComplexityProps> = ({ valueOfNewPassword }) => {
  const [passwordValidity, setPasswordValidity] = useState<IPassword>();

  useEffect(() => {
    const digitRegExp = /\d/g;
    const capitalRegExp = /[A-Z]/g;
    const specSymbolRegExp = /[!#+*]/g;

    setPasswordValidity({
      minLength: valueOfNewPassword?.length >= 8,
      digitSymbol: digitRegExp.test(valueOfNewPassword),
      capitalSymbol: capitalRegExp.test(valueOfNewPassword),
      containsSpecSymbols: specSymbolRegExp.test(valueOfNewPassword),
    });
  }, [valueOfNewPassword]);

  return (
    <div className={style.wrapper}>
      <PasswordStrengthIndicatorItem
        text="1 capital letter"
        isValid={passwordValidity?.capitalSymbol}
      />
      <PasswordStrengthIndicatorItem
        text="1 number"
        isValid={passwordValidity?.digitSymbol}
      />
      <PasswordStrengthIndicatorItem
        text="8 symbols"
        isValid={passwordValidity?.minLength}
      />
      <PasswordStrengthIndicatorItem
        text="!/#/+/*"
        isValid={passwordValidity?.containsSpecSymbols}
      />
    </div>
  );
};

export default PasswordComplexity;
