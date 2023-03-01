import React, { FC, useState } from 'react';

import cn from 'classnames';

import { Input } from '../Input/Input';

import style from './EditableInputWrapper.module.css';
import { EditableInputWrapperProps } from './EditableInputWrapper.props';

const EditableInputWrapper: FC<EditableInputWrapperProps> = (props): JSX.Element => {
  const { className, onChangeValue, value, type, name, onSave } = props;

  const [isSaved, setIsSaved] = useState<boolean>(true);

  const handleOnClick = (): void => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      onSave?.(value, name);
    }
  };

  return (
    <div className={cn(style.wrapper, className)}>
      <Input
        type={type}
        classNameWrapper={style.input}
        disabled={isSaved}
        value={value}
        onChange={event => onChangeValue(event.currentTarget.value)}
        autoFocus
      />
      <button type="button" className={style.button} onClick={handleOnClick}>
        {isSaved ? 'Change' : 'Add'}
      </button>
    </div>
  );
};

export default EditableInputWrapper;
