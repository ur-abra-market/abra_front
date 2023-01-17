import React from 'react';

import PropTypes from 'prop-types';

const PhoneNumFieldWithoutCountryCode = props => {
  const { label, id, name, placeholder, classes } = props;

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
      <div className={classes.inputWrapper}>
        <input
          type="tel"
          id={id}
          className={classes.input}
          placeholder={placeholder}
          onInput={e => onPhoneInput(e)}
          onKeyDown={e => onPhoneKeyDown(e)}
        />
      </div>
    </>
  );
};

PhoneNumFieldWithoutCountryCode.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
};

export default PhoneNumFieldWithoutCountryCode;
