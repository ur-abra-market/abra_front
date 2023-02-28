import React, { DetailedHTMLProps, FC, HTMLAttributes, useRef, useState } from 'react';

import cn from 'classnames';
import InputMask from 'react-input-mask';

import style from './ImmutableInputWithChangeButton.module.css';

interface ImmutableTextFieldWithChangeButtonProps {
  label?: string;
  name?: string;
  id?: string;
  type?: 'email' | 'text' | 'password' | 'tel';
  placeholder?: string;
  defaultValue?: string;
  inputProps?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
const ImmutableInputWithChangeButton: FC<ImmutableTextFieldWithChangeButtonProps> = (
  props,
): JSX.Element => {
  const { label, id, type = 'text', name, placeholder, inputProps, defaultValue } = props;

  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null) as any;

  return (
    <>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <div className={style.input_wrapper}>
        {type === 'tel' ? (
          <InputMask
            type={type}
            id={id}
            value={defaultValue}
            ref={inputRef}
            className={cn(style.input, { [style.active]: edit })}
            placeholder={placeholder}
            disabled={!edit}
            mask="+7 (999) 999-9999"
            {...inputProps}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={defaultValue}
            ref={inputRef}
            className={cn(style.input, { [style.active]: edit })}
            placeholder={placeholder}
            disabled={!edit}
            {...inputProps}
          />
        )}
        <div className={style.change_btn_wrapper}>
          <button
            type="button"
            className={style.change_btn}
            onClick={() => setEdit(!edit)}
          >
            {inputRef?.current?.value.length ? 'Change' : 'Add'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ImmutableInputWithChangeButton;
