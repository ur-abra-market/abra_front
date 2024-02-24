import { ChangeEvent, FC, useEffect, useState } from 'react';

import { IDBPDatabase } from 'idb';
import { useForm } from 'react-hook-form';

import { MainProductInfo } from './MainProductInfo';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { convertImageToBase64 } from 'common/utils';
import {
  FIELDS_NEW_PRODUCT_INFO,
  IImages,
  initDataBase,
  updateFieldInDataBase,
  UserDB,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { brandsInfoSelector } from 'store/reducers/supplier/product';
import { getBrandsInfo } from 'store/reducers/supplier/product/thunks';

export const MainProductInfoContainer: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, setValue } = useForm();
  const [db, setDb] = useState<IDBPDatabase<UserDB> | null>(null);
  const brandsNames = useAppSelector(brandsInfoSelector);
  const [defaultValueSelect, setDefaultValueSelect] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [storeImages, setStoreImages] = useState<IImages[]>([]);
  const [deleteImageByID, setDeleteImageByID] = useState<string>();

  const onChangeFormHandler = async (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | string | number,
    formName: FIELDS_NEW_PRODUCT_INFO,
  ): Promise<void> => {
    if (db && typeof event !== 'string' && typeof event !== 'number') {
      await updateFieldInDataBase(db, formName, event.target.value);
    } else if (db) {
      await updateFieldInDataBase(db, formName, String(event));
    }
  };

  const uploadImageHandler = async (imageId: string, image: File): Promise<void> => {
    const imageBase64 = await convertImageToBase64(image);
    const images = storeImages.map(el =>
      el.id === imageId ? { ...el, image: imageBase64 } : el,
    );

    setStoreImages(images);

    if (db) {
      await updateFieldInDataBase(db, FIELDS_NEW_PRODUCT_INFO.Images, images);
    }
  };

  const deleteImage = async (): Promise<void> => {
    const newImages = storeImages.map(el =>
      el.id === deleteImageByID ? { ...el, image: '' } : el,
    );

    setStoreImages(newImages);

    if (db) {
      await updateFieldInDataBase(db, FIELDS_NEW_PRODUCT_INFO.Images, newImages);
    }
    setModalOpen(false);
  };

  const deleteImageHandler = (imageId: string): void => {
    setModalOpen(true);
    setDeleteImageByID(imageId);
  };

  useEffect(() => {
    dispatch(getBrandsInfo([]));

    const fetchDataBase = async (): Promise<void> => {
      const dataBase = await initDataBase();

      const requestToDataBase = dataBase.get('productDescription', 1);

      try {
        const result = await requestToDataBase;

        if (result?.mainProductInfo) {
          setStoreImages(result.mainProductInfo.images);
          setValue('productName', result.mainProductInfo.productName);
          setValue('description', result.mainProductInfo.description);
          setValue('brandName', result.mainProductInfo.brandName);
          setDefaultValueSelect(result.mainProductInfo.brandName);
        }
      } catch {
        return;
      }

      setDb(dataBase);
    };

    fetchDataBase();
  }, []);

  return (
    <MainProductInfo
      brandsNames={brandsNames}
      deleteImage={deleteImage}
      deleteImageHandler={deleteImageHandler}
      register={register}
      uploadImageHandler={uploadImageHandler}
      defaultValueSelect={defaultValueSelect}
      storeImages={storeImages}
      setModalOpen={setModalOpen}
      isModalOpen={isModalOpen}
      onChangeFormHandler={onChangeFormHandler}
    />
  );
};
