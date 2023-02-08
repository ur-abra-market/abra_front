import React, { FC } from 'react';

import PropTypes from 'prop-types';

import TextFieldLabelAbove from '../TextFieldLabelAbove';

import style from './RelatedInputs.module.css';

interface RelatedInputsProps {
  register?: any;
  optType?: string;
  mainType?: string;
  mainName?: string;
  optName?: string;
  mainTitle?: string;
  mainPlaceholder?: string;
  optPlaceholder?: string;
  optTitle?: string;
  isRequire?: boolean;
}
const RelatedInputs: FC<RelatedInputsProps> = ({
  register,
  optType,
  mainType,
  mainName,
  optName,
  mainTitle,
  mainPlaceholder,
  optPlaceholder,
  optTitle,
  isRequire,
}): JSX.Element => {
  return (
    <div className={style.doubleInputs}>
      <TextFieldLabelAbove
        register={register(mainName, {
          required: {
            value: isRequire,
            message: 'Field is required',
          },
        })}
        title={mainTitle}
        name={mainName}
        type={mainType}
        placeholder={mainPlaceholder}
      />

      <TextFieldLabelAbove
        register={register(optName, {
          required: {
            value: isRequire,
            message: 'Field is required',
          },
        })}
        title={optTitle}
        name={optName}
        type={optType}
        placeholder={optPlaceholder}
      />
    </div>
  );
};

export default RelatedInputs;
