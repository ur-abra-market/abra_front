import React from "react";
import PropTypes from "prop-types";

const PhoneNumFieldWithoutCountryCode = (props) => {
  const { label, id,  name, placeholder, classes } = props;

  const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, '');
  }

  const onPhoneInput = (e) => {
    let input = e.target
    let inputNumbersValue = getInputNumbersValue(input)
    let formatedInputValue = ""

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (inputNumbersValue.length > 0) {
      formatedInputValue += "(" + inputNumbersValue.slice(0, 3)
    }
    if (inputNumbersValue.length >= 3) {
      formatedInputValue += ') ' + inputNumbersValue.slice(3, 6);
    }
    if (inputNumbersValue.length >= 6) {
        formatedInputValue += '-' + inputNumbersValue.substring(6, 8);
    }
    if (inputNumbersValue.length >= 8) {
        formatedInputValue += '-' + inputNumbersValue.substring(8, 10);
    }
    // Phone formatting is supported for numbers with ten digits( Russia Turkey)
    // If the user has a lager phone number, the number is not formatted
    if (inputNumbersValue.length >= 11) {
      formatedInputValue = ""
      formatedInputValue = inputNumbersValue
    }



    input.value = formatedInputValue
    console.log(formatedInputValue)
    
  }

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
          onInput ={(e)=>onPhoneInput(e)}
          maxLength="25"
        />
      </div>
    </>
  );
};

PhoneNumFieldWithoutCountryCode.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  classes: PropTypes.object,
};

export default PhoneNumFieldWithoutCountryCode;
