import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

import ProductListRegistrationForm from 'old-components/ui/ProductListRegistrationForm';
import { categoryService, getCategories, getChilds } from 'store/reducers/categorySlice';
import { getPropertiesService, getVariationsService } from 'store/reducers/supplierSlice';

export const ProductListRegistrationPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [firstCategory, setFirstCategory] = useState('');
  const [secondCategory, setSecondCategory] = useState('');
  const [thirdCategory, setThirdCategory] = useState('');

  const allCategories = useAppSelector(state => state.category.dateCategories);
  const productProperties = useAppSelector(state => state.supplier.productProperties);
  const productVariations = useAppSelector(state => state.supplier.productVariations);

  const secondsChilds = useAppSelector(getChilds(firstCategory, allCategories));
  const thirdChilds = useAppSelector(getChilds(secondCategory, secondsChilds));

  const getFirstCategories = useAppSelector(getCategories(allCategories)) || [];
  const getSecondCategories = useAppSelector(getCategories(secondsChilds)) || [];
  const getThirdCategories = useAppSelector(getCategories(thirdChilds)) || [];

  const getId = (date: any, value: any): any => {
    if (date && value) {
      const objCategory = date.find((el: any) => el.name === value);

      return objCategory?.id;
    }
  };

  const categoryId =
    thirdChilds && thirdChilds.length
      ? getId(thirdChilds, thirdCategory)
      : getId(secondsChilds, secondCategory);

  useEffect(() => {
    setSecondCategory('');
    setThirdCategory('');
  }, [firstCategory]);

  useEffect(() => {
    setThirdCategory('');
  }, [secondCategory]);

  useEffect(() => {
    dispatch(categoryService());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      // The 'id' value in 'dispatch' will need to be changed to 'categoryId'
      dispatch(getPropertiesService({ id: categoryId }));
      dispatch(getVariationsService({ id: categoryId }));
    }
  }, [dispatch, categoryId]);

  return (
    <div>
      <ProductListRegistrationForm
        setFirstCategory={setFirstCategory}
        setSecondCategory={setSecondCategory}
        setThirdCategory={setThirdCategory}
        firstStageCategories={getFirstCategories}
        secondStageCategories={getSecondCategories}
        thirdStageCategories={getThirdCategories}
        productProperties={productProperties}
        productVariations={productVariations}
        categoryId={categoryId}
      />
    </div>
  );
};
