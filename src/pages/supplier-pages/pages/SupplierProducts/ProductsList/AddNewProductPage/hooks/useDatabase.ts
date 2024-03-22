import { useEffect, useState } from 'react';

import { IDBPDatabase } from 'idb';
import { FieldValues, useForm, UseFormGetValues } from 'react-hook-form';

import { useAppDispatch } from 'common/hooks';
import {
  IImages,
  initDataBase,
  IProductProperties,
  UserDB,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { setSelectedCategoryId } from 'store/reducers/commonSlice/slice';

interface DatabaseHookResult {
  db: IDBPDatabase<UserDB> | null;
  register: ReturnType<typeof useForm>['register'];
  getValues: UseFormGetValues<FieldValues>;
  setValue: ReturnType<typeof useForm>['setValue'];
  storeImagesOfDatabase: IImages[];
  setStoreImagesOfDatabase: (images: IImages[]) => void;
  defaultValueSelectOfDatabase: string;
  setDefaultValueSelectOfDatabase: (value: string) => void;
  selectedCategoryIdOfDatabase: number | null;
  setSelectedCategoryIdOfDatabase: (categoryId: number | null) => void;
  pathCategoriesOfDatabase: ICategoryResponse[];
  setPathCategoriesOfDatabase: (categoryPath: ICategoryResponse[]) => void;
  propertiesOfDataBase: IProductProperties[];
  setPropertiesOfDataBase: (properties: IProductProperties[]) => void;
}

export const useDatabase = (): DatabaseHookResult => {
  const [db, setDb] = useState<IDBPDatabase<UserDB> | null>(null);
  const { register, setValue, getValues } = useForm();
  const [storeImagesOfDatabase, setStoreImagesOfDatabase] = useState<IImages[]>([]);
  const [defaultValueSelectOfDatabase, setDefaultValueSelectOfDatabase] = useState('');
  const [selectedCategoryIdOfDatabase, setSelectedCategoryIdOfDatabase] = useState<
    number | null
  >(null);
  const [pathCategoriesOfDatabase, setPathCategoriesOfDatabase] = useState<
    ICategoryResponse[]
  >([]);
  const [propertiesOfDataBase, setPropertiesOfDataBase] = useState<IProductProperties[]>(
    [],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDataBase = async (): Promise<void> => {
      const dataBase = await initDataBase();

      const requestToDataBase = dataBase.get('productDescription', 1);

      try {
        const result = await requestToDataBase;

        if (result?.mainProductInfo) {
          setValue('productName', result.mainProductInfo.productName);
          setValue('description', result.mainProductInfo.description);
          setValue('brandName', result.mainProductInfo.brandName);
          setStoreImagesOfDatabase(result.mainProductInfo.images);
          setDefaultValueSelectOfDatabase(result.mainProductInfo.brandName);
          setSelectedCategoryIdOfDatabase(
            result.mainProductInfo.productInfo.selectedCategory,
          );
          setPathCategoriesOfDatabase(result.mainProductInfo.productInfo.categoryPath);
          setPropertiesOfDataBase(result.mainProductInfo.productProperties);
          dispatch(
            setSelectedCategoryId(result.mainProductInfo.productInfo.selectedCategory),
          );
        }
      } catch {
        return;
      }

      setDb(dataBase);
    };

    fetchDataBase();
  }, [setValue]);

  return {
    db,
    register,
    getValues,
    setValue,
    storeImagesOfDatabase,
    setStoreImagesOfDatabase,
    defaultValueSelectOfDatabase,
    setDefaultValueSelectOfDatabase,
    selectedCategoryIdOfDatabase,
    setSelectedCategoryIdOfDatabase,
    pathCategoriesOfDatabase,
    setPathCategoriesOfDatabase,
    propertiesOfDataBase,
    setPropertiesOfDataBase,
  };
};
