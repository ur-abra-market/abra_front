import React, { ChangeEvent, DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import style from './SelectLabelAbove.module.css';

interface SelectLabelAboveProps {
  onChange?: Function;
  onChangeOption?: Function;
  title: string;
  name?: string;
  placeholder?: string;
  options: any[];
  error?: string;
  restProps?: any;
  register?: any;
  selectProps?: DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
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
  register,
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(e);
    onChangeOption?.(e.currentTarget.value);
  };

  return (
    <>
      <p className={style.selectTitle}>{title}</p>
      <div className={style.selectContainer}>
        <select
          name={name}
          onChange={onChangeCallback}
          className={style.selectField}
          {...selectProps}
          {...register}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((el, i) => {
                return (
                  <option value={el} className={style.selectOption} key={i}>
                    {el}
                  </option>
                );
              })
            : []}
        </select>
        <span className={style.selectArrow}>&#9660;</span>
      </div>

      {error && <p className={style.selectError}>&#9888; {error}</p>}
    </>
  );
};

export default SelectLabelAbove;
