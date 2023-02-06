import React, { ChangeEvent, FC } from 'react';

import style from './TextFieldLabelAbove.module.css';

interface TextFieldLabelAboveProps {
  title?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  name?: string;
  register?: any;
}

const TextFieldLabelAbove: FC<TextFieldLabelAboveProps> = ({
  title,
  type,
  placeholder,
  error,
  name,
  register,
}): JSX.Element => {
  // TODO - переделать
  const textareaScroll = (e: ChangeEvent<HTMLTextAreaElement>) =>
    (e.target.style.height = `${e.target.scrollHeight}px`);

  if (type === 'tel') {
    document.getElementById('tel')?.addEventListener('input', e => {
      const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

      e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? ` - ${x[3]}` : ''}`;
    });
  }

  return (
    <div className={style.inputWrapper}>
      <p className={style.inputTitle}>{title}</p>

      {name === 'textarea' ? (
        <textarea
          {...register}
          name={name}
          placeholder={placeholder}
          className={style.textarea}
          rows={1}
          onInput={e => textareaScroll(e)}
        />
      ) : (
        <input
          type={type}
          {...register}
          name={name}
          id={type === 'tel' ? 'tel' : ''}
          placeholder={placeholder}
          className={style.inputTextField}
        />
      )}
      {error && <p className={style.inputError}>&#9888; {error}</p>}
    </div>
  );
};

export default TextFieldLabelAbove;
