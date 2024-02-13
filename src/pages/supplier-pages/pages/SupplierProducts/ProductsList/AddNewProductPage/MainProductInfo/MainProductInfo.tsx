import { ChangeEvent, FC, useEffect, useState } from 'react';

import { IDBPDatabase } from 'idb';
import { useForm } from 'react-hook-form';

import { ImageContainer } from './components/ImageContainer/ImageContainer';

import { useAppSelector } from 'common/hooks';
import { convertImageToBase64 } from 'common/utils';
import { ConfirmModalWindow } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/ConfirmModalWindow/ConfirmModalWindow';
import {
  FIELDS_NEW_PRODUCT_INFO,
  IImages,
  initDatabase,
  updateFieldInDataBase,
  UserDB,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { Input, Label, Select } from 'ui-kit';

import style from './MainProductInfo.module.scss';

export const MainProductInfo: FC = (): JSX.Element => {
  const { register, setValue } = useForm();

  const [db, setDb] = useState<IDBPDatabase<UserDB> | null>(null);

  const categories = useAppSelector(state => state.common.categories);
  const brandNameData = categories ? categories.filter(c => c.level === 1) : [];

  const [storeImages, setStoreImages] = useState<IImages[]>([]);
  const [defaultValueSelect, setDefaultValueSelect] = useState('');
  const [deleteImageByID, setDeleteImageByID] = useState<string>();
  const [isModalOpen, setModalOpen] = useState(false);

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
    const fetchDB = async (): Promise<void> => {
      const database = await initDatabase();

      const requestToDataBase = database.get('productDescription', 1);

      try {
        const result = await requestToDataBase;

        if (result?.mainProductInfo) {
          setStoreImages(result.mainProductInfo.images);
          setValue('productName', result.mainProductInfo.productName);
          setValue('description', result.mainProductInfo.description);
          setDefaultValueSelect(result.mainProductInfo.brandName);
        }
      } catch {
        return;
      }

      setDb(database);
    };

    fetchDB();
  }, []);

  return (
    <form>
      <ConfirmModalWindow
        title="Do you sure you want to delete this photo?"
        isModalOpen={isModalOpen}
        closeModalHandle={setModalOpen}
        confirmModalHandle={deleteImage}
      />

      <div className={style.main_info}>
        <Label label="Product name" htmlFor="productName">
          <Input
            {...register('productName')}
            onChange={event =>
              onChangeFormHandler(event, FIELDS_NEW_PRODUCT_INFO.ProductName)
            }
            placeholder="Enter the product name"
            className={style.main_product}
          />
        </Label>

        <Label label="Description" htmlFor="description">
          <textarea
            className={style.description}
            {...register('description')}
            onChange={event =>
              onChangeFormHandler(event, FIELDS_NEW_PRODUCT_INFO.Description)
            }
            placeholder="Enter description"
            rows={10}
            cols={10}
          />
        </Label>

        <Label label="Brand name" htmlFor="brandName">
          <div className={style.select_container}>
            <Select
              {...register('brandName')}
              placeholder="Select or enter brand name"
              className={style.main_select}
              defaultValue={defaultValueSelect}
              options={brandNameData.map(el => ({
                value: el.name,
                label: { text: el.name },
              }))}
              onChange={value =>
                onChangeFormHandler(value.value, FIELDS_NEW_PRODUCT_INFO.BrandName)
              }
            />
          </div>
        </Label>

        <Label label="General photos of the product" htmlFor="photos" />
        <div className={style.container}>
          {storeImages
            .filter(el => el.image.length > 0)
            .map(el => (
              <ImageContainer
                key={el.id}
                id={el.id}
                image={el.image}
                uploadImage={uploadImageHandler}
                deleteImage={deleteImageHandler}
              />
            ))}

          {storeImages
            .filter(el => el.image.length === 0)
            .map(el => (
              <ImageContainer
                key={el.id}
                id={el.id}
                image={el.image}
                uploadImage={uploadImageHandler}
                deleteImage={deleteImageHandler}
              />
            ))}
        </div>
      </div>
    </form>
  );
};
