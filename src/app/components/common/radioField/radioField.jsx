import React from "react";
import PropTypes from "prop-types";
import style from "../radioField/radioField.module.css";

const RadioField = ({ options, name, onChange, value, label }) => {
  return (
    <div className={style.labelWrapper}>
      {options.map((option) => (
        <div key={option.name + "_" + option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            id={option.name + "_" + option.value}
            checked={option.value === value}
            onChange={onChange}
          />
          <label htmlFor={option.name + "_" + option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioField;
