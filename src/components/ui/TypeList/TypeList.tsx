import React, { FC } from 'react';

import PropTypes from 'prop-types';

import CheckboxFor from '../CheckboxFor';
import RadiosFor from '../RadiosFor';

interface TypeListProps {
  colors: any[];
  sizes: any[];
  getValues: any;
  register: any;
  types: any[];
}
const TypeList: FC<TypeListProps> = ({ colors, sizes, getValues, register, types }) => {
  return (
    <div>
      {types.map(el => (
        <div key={el.id} style={{ display: el.selected ? 'inline' : 'none' }}>
          <RadiosFor
            typeId={el.id}
            register={register}
            title={`Select color ${el.id}`}
            state="no color"
            array={colors}
            name="color"
          />

          <CheckboxFor
            typeId={el.id}
            getValues={getValues}
            register={register}
            title={`Size and Quantity ${el.id}`}
            array={sizes}
          />
        </div>
      ))}
    </div>
  );
};

TypeList.propTypes = {};
export default TypeList;
