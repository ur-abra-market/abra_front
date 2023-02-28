import React, { FC, useState } from 'react';

import cn from 'classnames';

import { Input } from '../Input/Input';

import style from './EditableInputWrapper.module.css';
import { EditableInputWrapperProps } from './EditableInputWrapper.props';

const EditableInputWrapper: FC<EditableInputWrapperProps> = (props): JSX.Element => {
  const { className, onChangeValue, value, type, name, onSave } = props;

  const [disabled, setDisabled] = useState<boolean>(true);

  const handleOnClick = (): void => {
    setDisabled(!disabled);
    if (!disabled) {
      onSave?.(value, name);
    }
  };

  return (
    <div className={cn(style.wrapper, className)}>
      <Input
        type={type}
        classNameWrapper={style.input}
        disabled={disabled}
        value={value}
        onChange={event => onChangeValue(event.currentTarget.value)}
      />
      <button type="button" className={style.button} onClick={handleOnClick}>
        {disabled ? 'Change' : 'Add'}
      </button>
    </div>
  );
};

export default EditableInputWrapper;
