import { ChangeEvent, FC } from 'react';

import { FieldValues, UseFormRegister } from 'react-hook-form';

import { ImageContainer } from './components/ImageContainer/ImageContainer';

import { ConfirmModal } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/ConfirmModal/ConfirmModal';
import {
  FIELDS_NEW_PRODUCT_INFO,
  IImages,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { IBrandsInfo } from 'store/reducers/supplier/product/types';
import { Input, Label, Select } from 'ui-kit';

import style from './MainProductInfo.module.scss';

interface IMainProductInfo {
  register: UseFormRegister<FieldValues>;
  brandsNames: IBrandsInfo[];
  defaultValueSelect: string;
  isModalOpen: boolean;
  storeImages: IImages[];
  setModalOpen: (flag: boolean) => void;
  deleteImage: () => Promise<void>;
  onChangeFormHandler: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | string | number,
    formName: FIELDS_NEW_PRODUCT_INFO,
  ) => Promise<void>;
  uploadImageHandler: (imageId: string, image: File) => Promise<void>;
  deleteImageHandler: (imageId: string) => void;
}

export const MainProductInfo: FC<IMainProductInfo> = ({
  register,
  brandsNames,
  defaultValueSelect,
  isModalOpen,
  storeImages,
  setModalOpen,
  deleteImage,
  onChangeFormHandler,
  uploadImageHandler,
  deleteImageHandler,
}): JSX.Element => {
  return (
    <form>
      <ConfirmModal
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
              placeholder="Select brand name"
              className={style.main_select}
              defaultValue={defaultValueSelect}
              options={brandsNames.map(el => ({
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
