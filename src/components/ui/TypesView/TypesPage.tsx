import React, { FC } from 'react';

import TypeBar from '../TypeBar/TypeBar';
import TypeList from '../TypeList/TypeList';

interface TypesPageProps {
  variations: {
    Color: string[];
    Size: string[];
  };
  getValues: any;
  register: any;
  setTypes: any;
  types: any[];
}
const TypesPage: FC<TypesPageProps> = ({
  variations,
  getValues,
  register,
  setTypes,
  types,
}) => {
  const [sizes, colors] = [variations.Size, variations.Color];

  return (
    <>
      <TypeBar types={types} setTypes={setTypes} />

      <TypeList
        types={types}
        sizes={sizes}
        colors={colors}
        getValues={getValues}
        register={register}
      />
    </>
  );
};

export default TypesPage;
