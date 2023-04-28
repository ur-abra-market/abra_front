import React, { FC } from 'react';

import { Input, Label } from '../ui-kit';

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
    <div className={style.double_inputs}>
      <Label label={mainTitle as string}>
        <Input
          {...register(mainName, {
            required: {
              value: isRequire,
              message: 'Field is required',
            },
          })}
          type={mainType}
          placeholder={mainPlaceholder}
        />
      </Label>

      <Label label={optTitle as string}>
        <Input
          {...register(optName, {
            required: {
              value: isRequire,
              message: 'Field is required',
            },
          })}
          type={optType}
          placeholder={optPlaceholder}
        />
      </Label>
    </div>
  );
};

export default RelatedInputs;
