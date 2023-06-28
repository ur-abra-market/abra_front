import React, { FC, useCallback } from 'react';

import style from './CheckboxFor.module.scss';

import CheckboxStyledElem from 'old-components/CheckboxStyledElem';

interface CheckboxForProps {
  register: any;
  array: any[];
  title: string;
  getValues: any;
  typeId: number;
}
const CheckboxFor: FC<CheckboxForProps> = ({
  register,
  array,
  title,
  getValues,
  typeId,
}): JSX.Element => {
  const validate = useCallback(() => {
    const values = getValues(array.map(el => `${typeId}-${el}`));

    return values.some((el: any) => el);
  }, [typeId, array, getValues]);

  return (
    <div>
      <p className={style.title}>{title}</p>

      <div className={style.checkbox_wrapper}>
        {array &&
          array.map(el => {
            return (
              <CheckboxStyledElem
                key={el}
                typeId={typeId}
                size={el}
                register={register(`${typeId}-${el}`, {
                  validate,
                })}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CheckboxFor;
