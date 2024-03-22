import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useDatabase } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/hooks/useDatabase';
import { SelectField } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Properties/SelectField/SelectField';
import {
  FIELDS_NEW_PRODUCT_INFO,
  IProductProperties,
  updateFieldInDataBase,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { selectedCategoryId } from 'store/reducers/commonSlice';
import { getPropertiesService, productProperties } from 'store/reducers/supplier/other';

import style from './Properties.module.scss';

export const Properties = (): JSX.Element => {
  const {
    db,
    register,
    getValues,
    selectedCategoryIdOfDatabase,
    propertiesOfDataBase,
    setPropertiesOfDataBase,
  } = useDatabase();
  const dispatch = useAppDispatch();
  const [showAdditional, setShowAdditional] = useState(0);
  const properties = useAppSelector(productProperties);
  const categoryId = useAppSelector(selectedCategoryId);
  const onChangeFormHandler = async (
    productProperties: IProductProperties,
  ): Promise<void> => {
    const { property_type_id } = productProperties;

    if (!db) return;
    const updatedProperties = propertiesOfDataBase.map(el => {
      if (el.property_type_id === property_type_id) {
        return productProperties;
      }

      return el;
    });
    const isExistValue = propertiesOfDataBase.some(
      el => el.property_type_id === property_type_id,
    );

    const databaseValue = isExistValue
      ? updatedProperties
      : [...propertiesOfDataBase, productProperties];

    setPropertiesOfDataBase(databaseValue);
    await updateFieldInDataBase(
      db,
      FIELDS_NEW_PRODUCT_INFO.ProductProperties,
      databaseValue,
    );
  };

  useEffect(() => {
    if (selectedCategoryIdOfDatabase) {
      dispatch(getPropertiesService(selectedCategoryIdOfDatabase));
    } else if (categoryId) {
      dispatch(getPropertiesService(categoryId));
    }
  }, [selectedCategoryIdOfDatabase, categoryId]);

  useEffect(() => {
    if (categoryId !== selectedCategoryIdOfDatabase && db) {
      setPropertiesOfDataBase([]);
      updateFieldInDataBase(db, FIELDS_NEW_PRODUCT_INFO.ProductProperties, []);
    }
  }, [categoryId, db, selectedCategoryIdOfDatabase]);

  return (
    <form>
      <div className={style.container}>
        {properties &&
          properties.map((el, i) => {
            const defaultValue =
              propertiesOfDataBase.length > 0 ? propertiesOfDataBase[i]?.value : 'Select';

            const defaultOptionValue = (
              propertiesOfDataBase.length > 0
                ? propertiesOfDataBase[i]?.optionalValue
                : 'Enter percentage of material'
            ) as string | number;

            return (
              <SelectField
                defaultValue={defaultValue}
                defaultOptionValue={defaultOptionValue}
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
            );
          })}
        <button
          type="button"
          className={style.button}
          onClick={() => setShowAdditional(prev => Math.min(prev + 1, 10))}
          disabled={showAdditional === 10}
        >
          + Add material
        </button>
      </div>
    </form>
  );
};
