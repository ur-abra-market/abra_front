import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  HTMLInputTypeAttribute,
} from 'react';

import style from './PhoneNumFieldWithoutCountryCode.module.css';

interface PhoneNumFieldWithoutCountryCodeProps {
  label?: string;
  name?: string;
  id?: string | number;
  defaultValue?: string;
  placeholder?: string;
  error: any;
  classes: any;
  inputProps?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
const PhoneNumFieldWithoutCountryCode: FC<PhoneNumFieldWithoutCountryCodeProps> = (
  props,
): JSX.Element => {
  const {
    label,
    error,
    name,
    placeholder,
    classes,
    inputProps,
    defaultValue = '',
  } = props;

  const formatedValue = defaultValue.replace(
    /^(\d{3})(\d{3})(\d{2})(\d{2})$/,
    '($1) $2-$3-$4',
  );

  const getInputNumbersValue = input => {
    return input.value.replace(/\D/g, '');
  };

  const onPhoneInput = e => {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);
    let formatedInputValue = '';
    const { selectionStart } = input;

    if (!inputNumbersValue) return (input.value = '');

    // В ЭТО УСЛОВИЕ МЫ НИКОГДА НЕ ПОПАДАЕМ, внутри корректное редактирование номера
    if (input.value.length !== selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data))
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;

      return;
    }

    if (inputNumbersValue.length > 0)
      formatedInputValue += `(${inputNumbersValue.slice(0, 3)}`;

    if (inputNumbersValue.length >= 3)
      formatedInputValue += `) ${inputNumbersValue.slice(3, 6)}`;

    if (inputNumbersValue.length >= 6)
      formatedInputValue += `-${inputNumbersValue.substring(6, 8)}`;

    if (inputNumbersValue.length >= 8)
      formatedInputValue += `-${inputNumbersValue.substring(8, 10)}`;

    // Phone formatting is supported for numbers with ten digits( Russia Turkey)
    // If the user has a lager phone number, the number is not formatted
    if (inputNumbersValue.length >= 11) {
      formatedInputValue = '';
      formatedInputValue = inputNumbersValue;
    }
    input.value = formatedInputValue;
  };

  const onPhoneKeyDown = e => {
    const input = e.target;

    if (e.keyCode === 8) e.target.value = getInputNumbersValue(input).trim();
  };

  return (
    <>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <div className={style.wrapper}>
        {error && <div className={classes.error}>{error.message}</div>}
        <div className={classes.inputWrapper}>
          <input
            type="tel"
            className={classes.input}
            placeholder={placeholder}
            onInput={e => onPhoneInput(e)}
            onKeyDown={e => onPhoneKeyDown(e)}
            defaultValue={formatedValue}
            {...inputProps}
          />
        </div>
      </div>
    </>
  );
};

export default PhoneNumFieldWithoutCountryCode;
