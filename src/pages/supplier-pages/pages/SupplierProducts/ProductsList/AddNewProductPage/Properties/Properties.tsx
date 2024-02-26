import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useDatabase } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/hooks/useDatabase';
import { SelectField } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Properties/SelectField/SelectField';
import {
  FIELDS_NEW_PRODUCT_INFO,
  updateFieldInDataBase,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { getPropertiesService } from 'store/reducers/supplier/other';

import style from './Properties.module.scss';

export const Properties = (): JSX.Element => {
  const { db, register, getValues, selectedCategoryIdOfDatabase, propertiesOfDataBase } =
    useDatabase();
  const dispatch = useAppDispatch();
  const [showAdditional, setShowAdditional] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const properties = useAppSelector(state => state.supplierOther.productProperties);

  const onChangeFormHandler = async (
    formName: FIELDS_NEW_PRODUCT_INFO,
    name: string,
    idField: number,
    idMaterial: number,
    percentage?: number,
  ): Promise<void> => {
    if (!db) return;

    await updateFieldInDataBase(db, formName, {
      name,
      propertyTypeId: idField,
      propertyValueId: idMaterial,
      optionalValue: (percentage && percentage / 100) || 0,
    });
  };

  useEffect(() => {
    if (selectedCategoryIdOfDatabase) {
      dispatch(getPropertiesService(selectedCategoryIdOfDatabase));
    }
  }, [db]);

  return (
    <form>
      <div className={style.container}>
        {properties.map(el => (
          <SelectField
            key={el.id}
            register={register}
            fieldId={el.id}
            name={el.name}
            label={el.name}
            placeholder={el.name}
            options={el.values}
            hasOptional={el.has_optional_value}
            onChangeFormHandler={onChangeFormHandler}
            getValues={getValues}
          />
        ))}

        <button
          type="button"
          className={style.button}
          onClick={() => setShowAdditional(prev => Math.min(prev + 1, 10))}
          disabled={!selectedMaterial || showAdditional === 10}
        >
          + Add material
        </button>
      </div>
    </form>
  );
};
