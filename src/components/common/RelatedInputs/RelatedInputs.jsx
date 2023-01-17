import React from 'react';

import PropTypes from 'prop-types';

import TextFieldLabelAbove from '../TextFieldLabelAbove';

import style from './RelatedInputs.module.css';

const RelatedInputs = ({
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
}) => {
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

RelatedInputs.propTypes = {
  register: PropTypes.func,
  optType: PropTypes.string,
  mainType: PropTypes.string,
  mainName: PropTypes.string,
  optName: PropTypes.string,
  mainTitle: PropTypes.string,
  mainPlaceholder: PropTypes.string,
  optPlaceholder: PropTypes.string,
  optTitle: PropTypes.string,
  isRequire: PropTypes.bool,
};
export default RelatedInputs;
