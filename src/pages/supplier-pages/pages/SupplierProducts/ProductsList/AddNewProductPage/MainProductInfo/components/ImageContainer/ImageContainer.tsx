import { FC } from 'react';

import { UploadImage } from 'elements';

import style from './ImageContainer.module.scss';

interface IImage {
  id?: string;
  image?: string;
  uploadImage: (id: string, image: File) => void;
  deleteImage?: (id: string) => void;
}

export const ImageContainer: FC<IImage> = ({
  id,
  image,
  uploadImage,
  deleteImage,
}): JSX.Element => {
  const uploadImageHandler = (image: File): void => {
    if (id && image) {
      uploadImage(id, image);
    }
  };

  const deleteImageHandler = (): void => {
    if (id && deleteImage) {
      deleteImage(id);
    }
  };

  return (
    <div className={style.image_container}>
      <UploadImage
        image={image || ''}
        uploadImage={uploadImageHandler}
        deleteImage={deleteImageHandler}
        className={style.image}
        type="product_image_supplier"
        label="General photos of the product"
        description="Product image"
      />
      {!image && <span className={style.upload}>Upload</span>}
    </div>
  );
};
