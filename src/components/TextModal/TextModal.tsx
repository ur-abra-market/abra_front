import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  firstname,
  lastname,
  street,
  apartment,
  city,
  region,
  state,
  zipcode,
} from '../../store/reducers/modalSlice';
import { Input } from '../ui-kit';

import style from './TextModal.module.css';

interface TextModalProps {
  title: string;
  placeholder: string;
}
const TextModal: FC<TextModalProps> = ({ title, placeholder }): JSX.Element => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handlerText = (value: any): void => {
    switch (title) {
      case 'First name':
        dispatch(firstname(value));
        break;
      case 'Last name':
        dispatch(lastname(value));
        break;
      case 'State / Province (optional)':
        dispatch(state(value));
        break;
      case 'City / Town':
        dispatch(city(value));
        break;
      case 'Region (optional)':
        dispatch(region(value));
        break;
      case 'Street address':
        dispatch(street(value));
        break;
      case 'Apt, suite, office (optional)':
        dispatch(apartment(value));
        break;
      case 'Zip Code':
        dispatch(zipcode(value));
        break;
      default:
        break;
    }
    setInput(value);
  };

  return (
    <div className={style.text_modal}>
      <div className={style.text_modal_title}>{title}</div>
      <Input
        classNameWrapper={style.text_modal_input}
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={e => handlerText(e.target.value)}
      />
    </div>
  );
};

export default TextModal;
