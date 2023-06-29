import React, { FC } from 'react';

import { ProductVariations } from 'old-components/ui/ProductListRegistrationForm/ProductListRegistrationForm';
import TypeBar from 'old-components/ui/TypeBar/TypeBar';
import TypeList from 'old-components/ui/TypeList/TypeList';

interface TypesPageProps {
  variations: ProductVariations;
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
