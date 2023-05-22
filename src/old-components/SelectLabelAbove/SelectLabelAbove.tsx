import React, { ChangeEvent, DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';

import style from './SelectLabelAbove.module.css';

interface SelectLabelAboveProps {
  onChange?: Function;
  onChangeOption?: Function;
  title: string;
  name?: string;
  placeholder?: string;
  options?: any[];
  error?: string;

  restProps?: any;
  // FIXme - не будет работать!!!!
  register?: any;

  // FIXme - не правильно!!!
  selectProps?: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
}
const SelectLabelAbove: FC<SelectLabelAboveProps> = ({
  onChange,
  onChangeOption,
  title,
  name,
  placeholder,
  options,
  error,
  selectProps,
}): JSX.Element => {
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(e);
    onChangeOption?.(e.currentTarget.value);
  };

  return (
    <>
      <p className={style.select_title}>{title}</p>
      <div className={style.select_container}>
        <select
          name={name}
          className={style.select_field}
          onChange={onChangeCallback}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((el, i) => {
                return (
                  <option value={el} className={style.select_option} key={i}>
                    {el}
                  </option>
                );
              })
            : []}
        </select>
        <span className={style.select_arrow}>&#9660;</span>
      </div>

      {error && <p className={style.select_error}>&#9888; {error}</p>}
    </>
  );
};

export default SelectLabelAbove;
