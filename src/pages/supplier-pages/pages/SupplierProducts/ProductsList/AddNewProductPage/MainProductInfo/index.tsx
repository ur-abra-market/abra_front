import { ChangeEvent, FC, useEffect, useState } from 'react';

import { MainProductInfo } from './MainProductInfo';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { convertImageToBase64 } from 'common/utils';
import { useDatabase } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/hooks/useDatabase';
import {
  FIELDS_NEW_PRODUCT_INFO,
  updateFieldInDataBase,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { brandsInfoSelector } from 'store/reducers/supplier/product';
import { getBrandsInfo } from 'store/reducers/supplier/product/thunks';

export const MainProductInfoContainer: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    db,
    storeImagesOfDatabase,
    setStoreImagesOfDatabase,
    register,
    defaultValueSelectOfDatabase,
  } = useDatabase();
  const brandsNames = useAppSelector(brandsInfoSelector);
  const [isModalOpen, setModalOpen] = useState(false);
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
    if (!db) return;

    const imageBase64 = await convertImageToBase64(image);
    const images = storeImagesOfDatabase.map(el =>
      el.id === imageId ? { ...el, image: imageBase64 } : el,
    );

    setStoreImagesOfDatabase(images);

    await updateFieldInDataBase(db, FIELDS_NEW_PRODUCT_INFO.Images, images);
  };

  const deleteImage = async (): Promise<void> => {
    if (!db) return;

    const newImages = storeImagesOfDatabase.map(el =>
      el.id === deleteImageByID ? { ...el, image: '' } : el,
    );

    setStoreImagesOfDatabase(newImages);

    await updateFieldInDataBase(db, FIELDS_NEW_PRODUCT_INFO.Images, newImages);

    setModalOpen(false);
  };

  const deleteImageHandler = (imageId: string): void => {
    setModalOpen(true);
    setDeleteImageByID(imageId);
  };

  useEffect(() => {
    dispatch(getBrandsInfo([]));
  }, [db]);

  return (
    <MainProductInfo
      brandsNames={brandsNames}
      deleteImage={deleteImage}
      deleteImageHandler={deleteImageHandler}
      register={register}
      uploadImageHandler={uploadImageHandler}
      defaultValueSelect={defaultValueSelectOfDatabase}
      storeImages={storeImagesOfDatabase}
      setModalOpen={setModalOpen}
      isModalOpen={isModalOpen}
      onChangeFormHandler={onChangeFormHandler}
    />
  );
};
